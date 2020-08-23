"use strict";

/*! news.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
News pages js file
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('#news-layout').length) {
    //Top Stories
    $('.stories .story').on('click', function () {
      var targetStory = $(this).attr('data-story');
      $(this).siblings('.story').removeClass('is-active');
      $(this).addClass('is-active');
      $('.news-hero-wrapper').addClass('is-hidden');
      $('#' + targetStory).removeClass('is-hidden');
    }); //Card actions

    $('.news-card .action.is-like').on('click', function () {
      if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
        $(this).find('svg').removeClass('gelatine');
      } else {
        $(this).addClass('is-active');
        $(this).find('svg').addClass('gelatine');
      }
    });
  }
});