"use strict";

/*! explorer.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Explorer menu js file
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('.explorer-menu').length) {
    //Open explorer menu
    $('#explorer-trigger, #mobile-explorer-trigger').on('click', function () {
      $('.explorer-menu').toggleClass('is-active');
    });
  }
});