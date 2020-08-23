"use strict";

/*! videos.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Videos js file
========================================================================== */
$(document).ready(function () {
  "use strict"; //Sidebar

  if ($('.videos-sidebar').length) {
    var handleMobileSidebar = function handleMobileSidebar() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        $('.videos-sidebar').removeClass('is-active');
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        $('.videos-sidebar').removeClass('is-active');
      } else {
        $('.videos-sidebar').addClass('is-active');
      }
    };

    $('.mobile-sidebar-trigger').on('click', function () {
      $('.videos-sidebar').addClass('is-active');
    });
    $('.close-videos-sidebar').on('click', function () {
      $(this).closest('.videos-sidebar').removeClass('is-active');
    });
    handleMobileSidebar();
    $(window).on('resize', function () {
      handleMobileSidebar();
    });
  }

  if ($('.related-side').length) {
    $('.related-trigger').on('click', function () {
      $('.related-side').addClass('is-opened');
    });
    $('.close-related-videos').on('click', function () {
      $('.related-side').removeClass('is-opened');
    });
  } //Home page


  if ($('.videos-wrapper.is-home').length) {
    //Init header carousel
    $('.video-header-wrap').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 8000,
      fade: true,
      dots: true,
      pauseOnFocus: true,
      //centerMode: true,
      //centerPadding: '0',
      arrows: false,
      prevArrow: "<div class='slick-custom is-prev'><i class='fa fa-chevron-left'></i></div>",
      nextArrow: "<div class='slick-custom is-next'><i class='fa fa-chevron-right'></i></div>"
    });
  } //Player page


  if ($('.videos-wrapper.has-player').length) {
    //Expand video description
    $('#description-show-more').on('click', function () {
      $('.additional-description').slideToggle('fast');

      if ($(this).text() == 'Show More') {
        $(this).html('Show Less');
      } else {
        $(this).html('Show More');
      }
    }); //Expand comments

    $('.nested-replies .header').on('click', function () {
      $(this).toggleClass('is-active');
      $(this).siblings('.nested-comments').slideToggle('fast');
    });
  }
});