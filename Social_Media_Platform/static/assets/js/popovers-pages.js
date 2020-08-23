/*! popovers-pages.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Handles the pages popovers that appear when hovering a page avatar
========================================================================== */
"use strict";

function getPagesPopovers() {
  $('*[data-page-popover]').each(function () {
    var e = $(this);
    var pageRef = $(this).attr('data-page-popover');
    var messageIcon = feather.icons.mail.toSvg();
    var profileIcon = feather.icons['more-horizontal'].toSvg();
    var pinIcon = feather.icons['map-pin'].toSvg();
    var usersIcon = feather.icons.users.toSvg();
    var tagIcon = feather.icons.tag.toSvg();
    var bookmarkIcon = feather.icons.bookmark.toSvg();
    $.ajax({
      url: 'assets/data/api/pages/pages.json',
      async: true,
      dataType: 'json',
      success: function success(data) {
        e.webuiPopover({
          trigger: 'hover',
          placement: 'auto',
          width: 300,
          padding: false,
          offsetLeft: 0,
          offsetTop: 20,
          animation: 'pop',
          cache: false,
          content: function content() {
            var destroyLoader = setTimeout(function () {
              $('.loader-overlay').removeClass('is-active');
            }, 1000);
            var html = "\n                            <div class=\"profile-popover-block\">\n\n                                <div class=\"loader-overlay is-active\">\n                                    <div class=\"loader is-loading\"></div>\n                                </div>\n\n                                <div class=\"profile-popover-wrapper\">\n                                    <div class=\"popover-cover\">\n                                        <img src=\"" + data[pageRef].cover_image + "\">\n                                        <div class=\"popover-avatar\">\n                                            <img class=\"avatar\" src=\"" + data[pageRef].profile_picture + "\">\n                                        </div>\n                                    </div>\n                                    <div class=\"popover-meta\">\n                                        <span class=\"page-meta\">\n                                            <span class=\"pagename\">" + data[pageRef].name + "</span>\n                                        </span>\n                                        <div class=\"page-activity\">\n                                            " + tagIcon + "\n                                            <div class=\"text\">\n                                                " + data[pageRef].activity + "\n                                            </div>\n                                        </div>\n                                        <div class=\"page-followers\">\n                                            " + usersIcon + "\n                                            <div class=\"text\">\n                                                <a href=\"#\">" + data[pageRef].followers + "</a> Followers\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"popover-actions\">\n                                    <a href=\"#\" class=\"popover-icon\">\n                                        " + profileIcon + "\n                                    </a>\n                                    <a href=\"#\" class=\"popover-icon\">\n                                        " + bookmarkIcon + "\n                                    </a>\n                                    <a href=\"#\" class=\"popover-icon\">\n                                        " + messageIcon + "\n                                    </a>\n                                </div>\n                            </div>\n                        ";
            return html;
            return destroyLoader;
          }
        });
      }
    });
  });
}

$(document).ready(function () {
  /* Pages
        0. Fast Pizza
      1. Lonely Droid
      2. Meta Movies
      3. Nuclearjs
      4. Slicer
      5. Css Ninja
      6. Brent University
      8. Los Angeles
      9. Lipflow
      10. Drop Cosmetics
      11. Quick Fashion
      13. Go Pizza
      14. O' Reilly's
      15. Epic Burger
      16. Downtown Subs
  */
  getPagesPopovers();
});