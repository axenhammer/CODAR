"use strict";

/*! elements.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Elements page js file
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('#elements-page').length) {
    var scroll_if_anchor = function scroll_if_anchor(href) {
      href = typeof href == "string" ? href : $(this).attr("href"); // You could easily calculate this dynamically if you prefer

      var fromTop = 50; // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
      // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174

      if (href.indexOf("#") == 0) {
        var $target = $(href); // Older browser without pushState might flicker here, as they momentarily
        // jump to the wrong position (IE < 10)

        if ($target.length) {
          $('html, body').animate({
            scrollTop: $target.offset().top - fromTop - 20
          });

          if (history && "pushState" in history) {
            history.pushState({}, document.title, window.location.pathname + href);
            return false;
          }
        }
      }
    }; // When our page loads, check to see if it contains and anchor


    var albumsHelp = function albumsHelp() {
      $('#albums-help-modal .next-modal').one('click', function () {
        $(this).closest('.card-body').find('.content-block, .dot').toggleClass('is-active');
        $(this).text('got it').off();
        endAlbumHelp();
      });
    };

    var endAlbumHelp = function endAlbumHelp() {
      $('#albums-help-modal .next-modal').on('click', function () {
        var $this = $(this);
        var albumsModal = $this.attr('data-modal');
        $this.closest('.modal').removeClass('is-active');
        $('#' + albumsModal).addClass('is-active');
        setTimeout(function () {
          $this.closest('.card-body').find('.content-block, .dot').toggleClass('is-active');
          $this.text('Next').off();
          albumsHelp();
        }, 800);
      });
    }; //Help modal before live video


    var videosHelp = function videosHelp() {
      $('#videos-help-modal .next-modal').one('click', function () {
        $(this).closest('.card-body').find('.content-block, .dot').toggleClass('is-active');
        $(this).text('got it').off();
        endVideoHelp();
      });
    };

    var endVideoHelp = function endVideoHelp() {
      $('#videos-help-modal .next-modal').on('click', function () {
        var $this = $(this);
        var videosModal = $(this).attr('data-modal');
        $this.closest('.modal').removeClass('is-active');
        $('#' + videosModal).addClass('is-active');
        setTimeout(function () {
          $this.closest('.card-body').find('.content-block, .dot').toggleClass('is-active');
          $this.text('Next').off();
          videosHelp();
        }, 800);
      });
    }; //Lightbox


    scroll_if_anchor(window.location.hash); // Intercept all anchor clicks

    $("body").on("click", "a", scroll_if_anchor);
    $('.element-menu .menu-trigger').on('click', function () {
      $(this).closest('.element-menu').siblings('.element-menu').find('.menu-trigger').removeClass('is-active');
      $(this).closest('.element-menu').siblings('.element-menu').find('.submenu-wrap').slideUp();
      $(this).toggleClass('is-active');
      $(this).siblings('.submenu-wrap').slideToggle('fast');
    });
    $('.submenu-wrap li a').on('click', function () {
      $('.submenu-wrap li a').removeClass('is-active');
      $(this).addClass('is-active');
    }); //Help modal before albums management

    albumsHelp();
    videosHelp();
    $('.lightbox-trigger, .close-lightbox').on('click', function () {
      $('.custom-profile-lightbox').toggleClass('is-active');
      setTimeout(function () {
        $('.image-loader, .comments-loader').toggleClass('is-active');
      }, 1200);
    }); //Fancybox

    $(function () {
      /*Creative example - Customized layout
      ====================================*/
      $('[data-fancybox="cl-group-demo"]').fancybox({
        baseClass: "fancybox-custom-layout",
        infobar: false,
        touch: {
          vertical: false
        },
        buttons: ["close", "thumbs", "share"],
        animationEffect: "fade",
        transitionEffect: "fade",
        preventCaptionOverlap: false,
        idleTime: false,
        gutter: 0,
        // Customize caption area
        caption: function caption(instance) {
          return '<h3>home</h3><p>interiors, exteriors, and the humans that inhabit them.</p><p><a href="https://unsplash.com/collections/curated/162" target="_blank">unsplash.com</a></p>';
        }
      });
      /*Creative example - Product Quickview
      ====================================*/

      $(".quick_view").fancybox({
        baseClass: "quick-view-container",
        infobar: false,
        buttons: false,
        thumbs: false,
        margin: 0,
        touch: {
          vertical: false
        },
        animationEffect: false,
        transitionEffect: "slide",
        transitionDuration: 500,
        baseTpl: '<div class="fancybox-container" role="dialog">' + '<div class="quick-view-content">' + '<div class="quick-view-carousel">' + '<div class="fancybox-stage"></div>' + "</div>" + '<div class="quick-view-aside"></div>' + '<button data-fancybox-close class="quick-view-close">X</button>' + "</div>" + "</div>",
        onInit: function onInit(instance) {
          /*#1 Create bullet navigation links
          =================================*/
          var bullets = '<ul class="quick-view-bullets">';

          for (var i = 0; i < instance.group.length; i++) {
            bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + (i + 1) + "</span></a></li>";
          }

          bullets += "</ul>";
          $(bullets).on("click touchstart", "a", function () {
            var index = $(this).data("index");
            $.fancybox.getInstance(function () {
              this.jumpTo(index);
            });
          }).appendTo(instance.$refs.container.find(".quick-view-carousel"));
          /*#2 Add Product Form
          =================================*/

          var $element = instance.group[instance.currIndex].opts.$orig;
          var form_id = $element.data("qw-form");
          instance.$refs.container.find(".quick-view-aside").append( // In this example, this element contains the form
          $("#" + form_id).clone(true).removeClass("is-hidden"));
        },
        beforeShow: function beforeShow(instance) {
          /* Mark current bullet navigation link as active*/
          instance.$refs.container.find(".quick-view-bullets").children().removeClass("active").eq(instance.currIndex).addClass("active");
        }
      });
      /*Creative example - Confirm dialog*/
      // Step 1: Create reusable jQuery plugin
      // =====================================

      $.fancyConfirm = function (opts) {
        opts = $.extend(true, {
          title: "Are you sure?",
          message: "",
          okButton: "OK",
          noButton: "Cancel",
          callback: $.noop
        }, opts || {});
        $.fancybox.open({
          type: "html",
          src: '<div class="fc-content p-5 rounded">' + '<h2 class="title mb-10">' + opts.title + "</h2>" + "<p>" + opts.message + "</p>" + '<p class="text-right buttons mt-10">' + '<a data-value="0" data-fancybox-close href="javascript:;" class="button">' + opts.noButton + "</a>" + '<button data-value="1" data-fancybox-close class="button is-solid red-button raised">' + opts.okButton + "</button>" + "</p>" + "</div>",
          opts: {
            animationDuration: 350,
            animationEffect: "material",
            modal: true,
            baseTpl: '<div class="fancybox-container fc-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-stage"></div>' + "</div>" + "</div>",
            afterClose: function afterClose(instance, current, e) {
              var button = e ? e.target || e.currentTarget : null;
              var value = button ? $(button).data("value") : 0;
              opts.callback(value);
            }
          }
        });
      }; // Step 2: Start using it!
      // =======================


      $("#test_confirm").click(function () {
        // Open customized confirmation dialog window
        $.fancyConfirm({
          title: "Use Google's location service?",
          message: "Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running",
          okButton: "Agree",
          noButton: "Disagree",
          callback: function callback(value) {
            if (value) {
              $("#test_confirm_rez").html("Let's do this!");
            } else {
              $("#test_confirm_rez").html("Maybe later.");
            }
          }
        });
      });
      /*Creative example - Morphing modal window
      ==============================================================*/
      // Step 1: Create jQuery plugin
      // ============================

      $.fn.fancyMorph = function (opts) {
        var Morphing = function Morphing($btn, opts) {
          var self = this;
          self.opts = $.extend({
            animationEffect: false,
            infobar: false,
            buttons: ["close"],
            smallBtn: false,
            touch: false,
            baseClass: "fancybox-morphing",
            afterClose: function afterClose() {
              self.close();
            }
          }, opts);
          self.init($btn);
        };

        Morphing.prototype.init = function ($btn) {
          var self = this;
          self.$btn = $btn.addClass("morphing-btn");
          self.$clone = $('<div class="morphing-btn-clone" />').hide().insertAfter($btn); // Add wrapping element and set initial width used for positioning

          $btn.wrap('<span class="morphing-btn-wrap"></span>').on("click", function (e) {
            e.preventDefault();
            self.start();
          });
        };

        Morphing.prototype.start = function () {
          var self = this;

          if (self.$btn.hasClass("morphing-btn_circle")) {
            return;
          } // Set initial width, because it is not possible to start CSS transition from "auto"


          self.$btn.width(self.$btn.width()).parent().width(self.$btn.outerWidth());
          self.$btn.off(".fm").on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function (e) {
            if (e.originalEvent.propertyName === "width") {
              self.$btn.off(".fm");
              self.animateBg();
            }
          }).addClass("morphing-btn_circle");
        };

        Morphing.prototype.animateBg = function () {
          var self = this;
          self.scaleBg();
          self.$clone.show(); // Trigger repaint

          self.$clone[0].offsetHeight;
          self.$clone.off(".fm").on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function (e) {
            self.$clone.off(".fm");
            self.complete();
          }).addClass("morphing-btn-clone_visible");
        };

        Morphing.prototype.scaleBg = function () {
          var self = this;
          var $clone = self.$clone;
          var scale = self.getScale();
          var $btn = self.$btn;
          var pos = $btn.offset();
          $clone.css({
            top: pos.top + $btn.outerHeight() * 0.5 - $btn.outerHeight() * scale * 0.5 - $(window).scrollTop(),
            left: pos.left + $btn.outerWidth() * 0.5 - $btn.outerWidth() * scale * 0.5 - $(window).scrollLeft(),
            width: $btn.outerWidth() * scale,
            height: $btn.outerHeight() * scale,
            transform: "scale(" + 1 / scale + ")"
          });
        };

        Morphing.prototype.getScale = function () {
          var $btn = this.$btn,
              radius = $btn.outerWidth() * 0.5,
              left = $btn.offset().left + radius - $(window).scrollLeft(),
              top = $btn.offset().top + radius - $(window).scrollTop(),
              windowW = $(window).width(),
              windowH = $(window).height();
          var maxDistHor = left > windowW / 2 ? left : windowW - left,
              maxDistVert = top > windowH / 2 ? top : windowH - top;
          return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radius);
        };

        Morphing.prototype.complete = function () {
          var self = this;
          var $btn = self.$btn;
          $.fancybox.open({
            src: $btn.data("src") || $btn.attr("href")
          }, self.opts);
        };

        Morphing.prototype.close = function () {
          var self = this;
          var $clone = self.$clone;
          self.scaleBg();
          $clone.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (e) {
            $clone.hide();
            self.$btn.removeClass("morphing-btn_circle");
          });
          $clone.removeClass("morphing-btn-clone_visible");
          $(window).off("resize.fm");
        }; // Init


        this.each(function () {
          var $this = $(this);

          if (!$this.data("morphing")) {
            $this.data("morphing", new Morphing($this, opts));
          }
        });
        return this;
      }; // Step 2: Start using it!
      // =======================


      $("[data-morphing]").fancyMorph({
        hash: "morphing"
      });
    });
  }
});