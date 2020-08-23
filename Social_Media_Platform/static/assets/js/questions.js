"use strict";

/*! questions.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Questions js file
========================================================================== */
$(document).ready(function () {
  "use strict"; //Highlight current menu item

  if ($('.questions-menu, .questions-nav-menu').length) {
    // Get current page URL
    var url = window.location.href; // remove # from URL

    url = url.substring(0, url.indexOf("#") == -1 ? url.length : url.indexOf("#")); // remove parameters from URL

    url = url.substring(0, url.indexOf("?") == -1 ? url.length : url.indexOf("?")); // select file name

    url = url.substr(url.lastIndexOf("/") + 1); // If file name not available

    if (url == '') {
      url = 'index.html';
    } // Loop all menu items


    $('.questions-menu li a').each(function () {
      // select href
      var href = $(this).attr('href'); // Check filename

      if (url == href) {
        // Add active class
        $(this).closest('li').addClass('is-active');
      }
    });
    $('.questions-nav-menu .menu-item').each(function () {
      // select href
      var href = $(this).attr('href'); // Check filename

      if (url == href) {
        // Add active class
        $(this).addClass('is-active');
      }
    });
  } //Sliding fixed navbar


  if ($('.questions-nav').length) {
    $(window).scroll(function () {
      var height = $(window).scrollTop();

      if (height > 160) {
        $(".questions-nav").addClass('is-active');
      } else {
        $(".questions-nav").removeClass('is-active');
      }
    });
  } //Fixed menu


  if ($('.questions-menu').length) {
    $(window).scroll(function () {
      var height = $(window).scrollTop();

      if (height > 450) {
        $('.questions-menu-fixed').addClass('is-faded');
      } else {
        $('.questions-menu-fixed').removeClass('is-faded');
      }
    });
  } //Question home tabs


  if ($('.question-tabs').length) {
    $('.question-tabs ul li').on('click', function () {
      $(this).siblings('li').removeClass('is-active');
      $(this).addClass('is-active');
    });
  } //Hide achievements loader


  if ($('.achievements-loader').length) {
    setTimeout(function () {
      $('.achievements-loader').removeClass('is-active');
    }, 4000);
  } //Achievements


  if ($('.achievements-carousel').length) {
    //Init product carousel
    $('.achievements-carousel').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      centerMode: true,
      centerPadding: '0',
      arrows: false,
      prevArrow: "<div class='slick-custom is-prev'><i class='fa fa-chevron-left'></i></div>",
      nextArrow: "<div class='slick-custom is-next'><i class='fa fa-chevron-right'></i></div>",
      responsive: [{
        breakpoint: 1600,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 1130,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  } //Settings toasts


  if ($('.questions-settings').length) {
    $('.switch-block .f-switch input').on('change', function () {
      toasts.service.info('', 'mdi mdi-progress-check', 'Settings saved successfully', 'bottomRight', 2500);
    });
  }
});