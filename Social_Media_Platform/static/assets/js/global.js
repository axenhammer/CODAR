/*! global.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Project wide reusable functions
========================================================================== */
"use strict"; //The following functions help trigger the autocompletes dropdowns

function openFriendsDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#users-autocpl").focus();
  $("#users-autocpl").attr('value', '');
  $("#users-autocpl").triggerHandler(e);
}

;

function openActivitiesDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#activities-autocpl").focus();
  $("#activities-autocpl").attr('value', '');
  $("#activities-autocpl").triggerHandler(e);
}

;

function openMoodDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#mood-autocpl").focus();
  $("#mood-autocpl").attr('value', '');
  $("#mood-autocpl").triggerHandler(e);
}

;

function openDrinksDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#drinking-autocpl").focus();
  $("#drinking-autocpl").attr('value', '');
  $("#drinking-autocpl").triggerHandler(e);
}

;

function openEatsDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#eating-autocpl").focus();
  $("#eating-autocpl").attr('value', '');
  $("#eating-autocpl").triggerHandler(e);
}

;

function openReadsDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#reading-autocpl").focus();
  $("#reading-autocpl").attr('value', '');
  $("#reading-autocpl").triggerHandler(e);
}

;

function openWatchDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#watching-autocpl").focus();
  $("#watching-autocpl").attr('value', '');
  $("#watching-autocpl").triggerHandler(e);
}

;

function openTravelDrop() {
  var e = $.Event("keyup", {
    keyCode: 65,
    which: 65
  });
  $("#travel-autocpl").focus();
  $("#travel-autocpl").attr('value', '');
  $("#travel-autocpl").triggerHandler(e);
}

; //Init pageloader

function initPageloader() {
  if ($('.pageloader').length) {
    $('.pageloader').toggleClass('is-active');
    $(window).on('load', function () {
      var pageloaderTimeout = setTimeout(function () {
        $('.pageloader').toggleClass('is-active');
        $('.infraloader').toggleClass('is-active');
        clearTimeout(pageloaderTimeout);
      }, 700); //Placeloaders

      if ($('#main-feed').length) {
        var shadowDomTimeout = setTimeout(function () {
          $('#shadow-dom').remove();
          $('.true-dom').removeClass('is-hidden');
          clearTimeout(shadowDomTimeout);
        }, 2500);
      }

      if ($('.questions-wrap').length) {
        var shadowDomTimeout = setTimeout(function () {
          $('#questions-shadow-dom-settings, #questions-shadow-dom-single, #questions-shadow-dom-home, #questions-shadow-dom-stats, #questions-shadow-dom-categories').remove();
          $('.true-dom').removeClass('is-hidden');
          clearTimeout(shadowDomTimeout);
        }, 2500);
      }
    });
  }
}

; //Init navbar

function initNavbar() {
  $(window).on('scroll', function () {
    var height = $(window).scrollTop();

    if (height > 65) {
      if ($('.options-nav').length) {
        $(".navbar").addClass('no-shadow');
        $('.options-nav').removeClass('no-shadow');
      } else {
        $(".navbar").removeClass('no-shadow');

        if ($('.navbar.is-landing').length) {
          $(".navbar").removeClass('no-background');
        }
      }
    } else {
      if ($('.options-nav').length) {
        $(".navbar").addClass('no-shadow');
        $('.options-nav').addClass('no-shadow');
      } else {
        $(".navbar").addClass('no-shadow');

        if ($('.navbar.is-landing').length) {
          $(".navbar").addClass('no-background');
        }
      }
    }
  }); //Clear navbar search input

  $('#clear-search').on('click', function () {
    $(this).siblings('input').val('');
  }); //Show navbar search options

  $('.drop-icon').on('click', function () {
    $(this).toggleClass('is-active');
    $('.search-options').toggleClass('is-active');
  }); //Toggle selected state on click for search options

  $('.options-list li').on('click', function () {
    $('.options-list li.is-selected').removeClass('is-selected');
    $(this).addClass('is-selected');
  }); //Close search options

  $('#close-search-options').on('click', function () {
    $(this).closest('.search-options').toggleClass('is-active');
  });
}

; //Init navbar dropdowns

function initResponsiveMenu() {
  if ($('.navbar-burger').length) {
    $('.navbar-burger').on("click", function () {
      $(this).toggleClass('is-active');

      if ($('.navbar-menu').hasClass('is-active')) {
        $('.navbar-menu').removeClass('is-active');
      } else {
        $('.navbar-menu').addClass('is-active');
      }
    });
  }
}

; //Init navbar dropdowns

function initNavDropdowns() {
  $('.drop-trigger').click(function () {
    $('.nav-drop').removeClass('is-active');
    $(this).find('.nav-drop').addClass('is-active');

    if ($(this).hasClass('is-account')) {
      $(this).addClass('is-opened');
    }
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.nav-drop') && !$(target).parents().is('.drop-trigger')) {
      $('.nav-drop').removeClass('is-active');
      $('.is-account').removeClass('is-opened');
    }
  });
}

; //Init Cart dropdown

function initNavbarCart() {
  $('.is-cart .cart-button').on('click', function () {
    $(this).closest('.is-cart').find('.shopping-cart').addClass('is-active');
    setTimeout(function () {
      $('.navbar-cart-loader').removeClass('is-active');
    }, 800);
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.is-cart .cart-button') && !$(target).parents().is('.is-cart')) {
      $('.shopping-cart').removeClass('is-active');
      setTimeout(function () {
        $('.navbar-cart-loader').addClass('is-active');
      }, 300);
    }
  });
} //Init dropdowns


function initDropdowns() {
  $('.dropdown-trigger').click(function () {
    $('.dropdown-trigger').removeClass('is-active');
    $(this).addClass('is-active');
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.dropdown-trigger img') && !$(target).parents().is('.dropdown-trigger')) {
      $('.dropdown-trigger').removeClass('is-active');
    }
  });
}

; //Init tabs

function initTabs() {
  $('.nav-tabs-wrapper ul li').on('click', function () {
    var tab_id = $(this).attr('data-tab');
    $(this).siblings('li').removeClass('is-active');
    $(this).closest('.nav-tabs-wrapper').children('.tab-content').removeClass('is-active');
    $(this).addClass('is-active');
    $("#" + tab_id).addClass('is-active');
  });
} //Init modals


function initModals() {
  if ($('.modal-trigger').length) {
    $('.modal-trigger').on('click', function () {
      var modalID = $(this).attr('data-modal');
      $('#' + modalID).toggleClass('is-active');
    });
    $('.modal-close, .close-modal').on('click', function () {
      $('.modal.is-active').removeClass('is-active');
    });
  }
}

; //Init attribute background images

function initBgImages() {
  if ($('.has-background-image').length) {
    $(".has-background-image").each(function () {
      var bgImage = $(this).attr('data-background');

      if (bgImage !== undefined) {
        $(this).css('background-image', 'url(' + bgImage + ')');
      }
    });
  }
}

; //Simple popover

function initSimplePopover() {
  $('.has-tip').webuiPopover({
    trigger: 'hover',
    placement: 'auto',
    width: 300,
    padding: false,
    offsetLeft: 0,
    offsetTop: 0,
    animation: 'pop',
    cache: false
  });
}

; //Init Emojis

function initEmojis() {
  $(".comment-textarea").emojioneArea({
    pickerPosition: "bottom",
    filtersPosition: "top",
    tones: false,
    autocomplete: false,
    inline: false,
    hidePickerOnBlur: true,
    buttonTitle: "Use the TAB key to insert emoji faster" //container: $(".emoji-picker")

  });
}

; //Load more buttons

function initLoadMore() {
  var t;
  $('.load-more-button').on('click', function (e) {
    e.preventDefault();
    clearTimeout(t);
    $(this).toggleClass('loading');
    t = setTimeout(function () {
      $('.load-more-button').removeClass('loading');
    }, 2500);
  });
}

; //Post Comment sections toggling

function initPostComments() {
  //Toggle comments
  $('.fab-wrapper.is-comment, .close-comments').on('click', function (e) {
    $(this).addClass('is-active').closest('.card').find('.content-wrap, .comments-wrap').toggleClass('is-hidden');
    var jump = $(this).closest('.is-post');
    var new_position = $(jump).offset();
    console.log(new_position);
    $('html, body').stop().animate({
      scrollTop: new_position.top - 70
    }, 500);
    e.preventDefault();
    setTimeout(function () {
      $('.emojionearea-editor').val('');
    }, 400);
  });
}

; //Options nav subsearch

function initSubSearch() {
  //Toggle comments
  $('#show-subsearch, #hide-subsearch').on('click', function () {
    $('#show-subsearch, #hide-subsearch, #subsearch').toggleClass('is-hidden');
    $('#subsearch input').focus();
  });
}

; //Options nav subsearch

function initSidebar() {
  //Toggle comments
  $('#show-filters, #hide-filters').on('click', function () {
    $('#show-filters, #hide-filters').toggleClass('is-hidden');
    $('.filters-panel').toggleClass('is-active');
    $('.main-container').toggleClass('has-sidebar');
  });
}

; //Load more buttons

function initTooltips() {
  $('.has-tooltip').ggtooltip({
    html: true,
    textcolor: '#fff',
    backcolor: '#444',
    bordercolor: '#444'
  });
}

; //Init custom select

function initKSelect() {
  //Custom select
  $('.custom-select').on('click', function () {
    $(this).toggleClass('is-active');
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.custom-select') && !$(target).parents().is('.control')) {
      $('.custom-select').removeClass('is-active');
    }
  });
  $('.custom-select input').on('change', function () {
    var selectedValue = $(this).siblings('.option-meta').find('span').text();
    $(this).closest('.custom-select').find('.select-box span').html(selectedValue);
  });
}

; //Init Combo boxes

function initComboBox() {
  $('.is-combo .combo-box').on('click', function () {
    //$('.image-combo-box.is-active, .combo-box.is-active').removeClass('is-active');
    $(this).toggleClass('is-active');
  });
  $('.combo-box .box-dropdown li').on('click', function (e) {
    var target = e.target; //Get selected item data

    var itemIconClass = $(this).find('.item-icon i').attr('class');
    var itemIcon = $(this).find('.item-icon i');
    var itemIconClass = $(this).find('.item-icon i').attr('class');
    var itemSvgIcon = $(this).find('.item-icon').html();
    var itemName = $(this).find('.item-name').text();
    var iconTemplate = '<i class="' + itemIconClass + '"></i>';
    var template = '';
    console.log(itemSvgIcon);

    if (!$(target).is('.box-dropdown li, body') && !$(target).parents().is('.box-dropdown')) {
      $('.box-dropdown').removeClass('is-active');
    }

    if ($(target).is('body')) {
      $('.box-dropdown').removeClass('is-active');
    } //Handle dropdown item active state toggle


    $(this).siblings('li.is-active').removeClass('is-active');
    $(this).addClass('is-active'); //Update combo box selected value

    if (itemIcon.length) {
      $(this).closest('.combo-box').find('.combo-item i').remove();
      $(this).closest('.combo-box').find('.combo-item svg').remove();
      $(this).closest('.combo-box').find('.combo-item').prepend(iconTemplate);
      $(this).closest('.combo-box').find('.combo-item .selected-item').text(itemName);
    } else {
      $(this).closest('.combo-box').find('.combo-item i').remove();
      $(this).closest('.combo-box').find('.combo-item').prepend(itemSvgIcon);
      $(this).closest('.combo-box').find('.combo-item .selected-item').text(itemName);
    }
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.combo-box') && !$(target).parents().is('.is-combo')) {
      $('.combo-box').removeClass('is-active');
    }
  });
}

; //Init Combo boxes

function initImageComboBox() {
  $('.is-combo .image-combo-box').on('click', function () {
    //$('.image-combo-box.is-active, .combo-box.is-active').removeClass('is-active');
    $(this).toggleClass('is-active');
  });
  $('.image-combo-box .box-dropdown li').on('click', function (e) {
    var target = e.target; //Get selected item data

    var itemPic = $(this).find('.item-icon img').attr('src');
    var itemName = $(this).find('.item-name').text();

    if (!$(target).is('.box-dropdown li, body') && !$(target).parents().is('.box-dropdown')) {
      $('.box-dropdown').removeClass('is-active');
    }

    if ($(target).is('body')) {
      $('.box-dropdown').removeClass('is-active');
    } //Handle dropdown item active state toggle


    $(this).siblings('li.is-active').removeClass('is-active');
    $(this).addClass('is-active'); //Update combo box selected value

    $(this).closest('.image-combo-box').find('.combo-item img').attr('src', itemPic);
    $(this).closest('.image-combo-box').find('.combo-item .selected-item').text(itemName);
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('.image-combo-box') && !$(target).parents().is('.is-combo')) {
      $('.image-combo-box').removeClass('is-active');
    }
  });
}

; //Init Combo boxes

function initUserComboBox() {
  $('.is-combo .user-combo-box').on('click', function () {
    $(this).toggleClass('is-active');
  });
  $('.user-combo-box .box-dropdown li').on('click', function (e) {
    var target = e.target; //Get selected item data

    var itemPic = $(this).find('.item-icon .avatar').attr('src');
    var itemBadge = $(this).find('.item-icon .badge').attr('src');
    var itemName = $(this).find('.item-name').text();

    if (!$(target).is('.box-dropdown li, body') && !$(target).parents().is('.box-dropdown')) {
      $('.box-dropdown').removeClass('is-active');
    }

    if ($(target).is('body')) {
      $('.box-dropdown').removeClass('is-active');
    } //Handle dropdown item active state toggle


    $(this).siblings('li.is-active').removeClass('is-active');
    $(this).addClass('is-active'); //Update combo box selected value

    $(this).closest('.user-combo-box').find('.combo-item .avatar').attr('src', itemPic);
    $(this).closest('.user-combo-box').find('.combo-item .badge').attr('src', itemBadge);
    $(this).closest('.user-combo-box').find('.combo-item .selected-item').text(itemName);
  });
}

; //Init Combo boxes

function initStackedComboBox() {
  $('.is-combo .stacked-combo-box').on('click', function () {
    $(this).toggleClass('is-active');
  });
  $('.stacked-combo-box .box-dropdown li').on('click', function (e) {
    var target = e.target; //Get selected item data

    var itemPic = $(this).find('.item-icon img').attr('src');
    var itemName = $(this).find('.item-name').text();
    var itemRef = $(this).attr('data-skill');
    var initialText = 'Select one or more skills';
    var skillTemplate = "\n            <img id=\"" + itemRef + "\" class=\"is-stacked\" src=\"" + itemPic + "\">\n        ";

    if (!$(target).is('.box-dropdown li, body') && !$(target).parents().is('.box-dropdown')) {
      $('.box-dropdown').removeClass('is-active');
    }

    if ($(target).is('body')) {
      $('.box-dropdown').removeClass('is-active');
    } //Handle dropdown item active state toggle


    $(this).toggleClass('is-active');
    console.log(skillTemplate);

    if ($('.stacked-combo-box li.is-active').length == 0) {
      $('#' + itemRef).remove();
      $('#skill-placeholder').removeClass('is-hidden');
      $(this).closest('.stacked-combo-box').find('.selected-item').text(initialText);
    } else {
      $('#skill-placeholder').addClass('is-hidden');
      $(this).closest('.stacked-combo-box').find('.selected-item').text('');

      if ($('#' + itemRef).length) {
        $('#' + itemRef).remove();
      } else {
        $(this).closest('.stacked-combo-box').find('.combo-item').prepend(skillTemplate);
      }
    }
  });
}

; //Init Big Combo boxes

function initBigComboBox() {
  $('.big-combo-box').on('click', function () {
    $(this).toggleClass('is-active');
  });
  $('.big-combo-box .box-dropdown li').on('click', function (e) {
    var target = e.target; //Get selected item data

    var itemIcon = $(this).find('.item-icon i').attr('class');
    var itemName = $(this).find('.item-name span:first-child').text();
    var itemDesc = $(this).find('.item-name span:nth-child(2)').text();

    if (!$(target).is('.box-dropdown li, body') && !$(target).parents().is('.box-dropdown')) {
      $('.box-dropdown').removeClass('is-active');
    }

    if ($(target).is('body')) {
      $('.box-dropdown').removeClass('is-active');
    } //Handle dropdown item active state toggle


    $(this).siblings('li.is-active').removeClass('is-active');
    $(this).addClass('is-active'); //Update combo box selected value

    $(this).closest('.big-combo-box').find('.combo-item i').attr('class', itemIcon);
    $(this).closest('.big-combo-box').find('.combo-item .selected-item').text(itemName);
    $(this).closest('.big-combo-box').find('.combo-item .selected-desc').text(itemDesc);
  });
}

; //Init text filter

function initTextFilter() {
  (function () {
    var defaultText = $('.textFilter-input').val();
    $('.textFilter-input').focus(function (e) {
      if ($(this).val() === defaultText) $(this).val('');
    }).blur(function (e) {
      if ($(this).val() === '') $(this).val(defaultText);
    }).keyup(function (e) {
      var patterns = $(this).val().toLowerCase().split(' ');
      if (!patterns.length) return;
      $('.textFilter-target').hide().removeClass('is-match').addClass('is-not-match').filter(function () {
        var matchText = $(this).find('.textFilter-match').text().toLowerCase();

        for (var i = 0; i < patterns.length; i++) {
          if (matchText.indexOf(patterns[i]) === -1) return false;
        }

        return true;
      }).show().removeClass('is-not-match').addClass('is-match'); //Friends

      if ($('#friends-page').length) {
        var cardCount = $('.card-row-wrap.is-active').find('.friend-card.is-match').length;
        console.log(cardCount);

        if (cardCount == 0) {
          $('.card-row-wrap.is-active').find('.card-row').addClass('is-hidden');
          $('.card-row-wrap.is-active').find('.card-row-placeholder').removeClass('is-hidden');
        } else {
          $('.card-row-wrap.is-active').find('.card-row-placeholder').addClass('is-hidden');
          $('.card-row-wrap.is-active').find('.card-row').removeClass('is-hidden');
        }
      }
    });
  })();
}

; //Init Like button

function initLikeButton() {
  $('.like-button').on('click', function () {
    $(this).toggleClass('is-active');
  });
}

; //Init Plus Menu

function initPlusMenu() {
  $('#plus-menu').on('click', function () {
    $(this).closest('.navbar-item').toggleClass('is-active');
  });
  $(document).click(function (e) {
    var target = e.target;

    if (!$(target).is('#plus-menu') && !$(target).parents().is('.is-plus-menu')) {
      $('.is-plus-menu').removeClass('is-active');
    }
  });
}

; //Init share modal demo

function initShareModal() {
  $('.small-fab.share-fab').on('click', function () {
    var $this = $(this);
    var postImage = $this.closest('.is-post').find('.post-image img').attr('src');
    var postUser = $this.closest('.is-post').find('.user-block .image img').attr('src');
    var postText = $this.closest('.is-post').find('.post-text > p').html();

    if (postImage !== undefined) {
      $('#share-modal-image').attr('src', postImage).removeClass('is-hidden');
    } else {
      $('#share-modal-image').addClass('is-hidden');
    }

    $('#share-modal-avatar').attr('src', postUser);
    $('#share-modal-text').html(postText);
  });
}

; //Init About Page slider

function initAboutGlider() {
  $('.about-glider').each(function () {
    if ($(this).is(":visible")) {
      var element = $(this).attr('id');
      new Glider(document.querySelector('#' + element), {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: '#slider-dots-' + element,
        draggable: true,
        responsive: [{
          // screens greater than >= 775px
          breakpoint: 768,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 3,
            slidesToScroll: 3,
            itemWidth: 150,
            duration: 0.25
          }
        }, {
          // screens greater than >= 1024px
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            //itemWidth: 150,
            duration: 0.25
          }
        }]
      });
    }
  });
}

;