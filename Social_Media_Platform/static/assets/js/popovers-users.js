/*! popovers-users.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Handles the user popovers that appear when hovering a user image
========================================================================== */
"use strict";

function getUserPopovers() {
  $('*[data-user-popover]').each(function () {
    var e = $(this);
    var userRef = $(this).attr('data-user-popover');
    var messageIcon = feather.icons['message-circle'].toSvg();
    var profileIcon = feather.icons['more-horizontal'].toSvg();
    var pinIcon = feather.icons['map-pin'].toSvg();
    var usersIcon = feather.icons.users.toSvg();
    var bookmarkIcon = feather.icons.bookmark.toSvg();
    $.ajax({
      url: 'static/assets/data/api/users/users.json',
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
            var html = "\n                                <div class=\"profile-popover-block\">\n\n                                    <div class=\"loader-overlay is-active\">\n                                        <div class=\"loader is-loading\"></div>\n                                    </div>\n\n                                    <div class=\"profile-popover-wrapper\">\n                                        <div class=\"popover-cover\">\n                                            <img src=\"" + data[userRef].cover_image + "\">\n                                            <div class=\"popover-avatar\">\n                                                <img class=\"avatar\" src=\"" + data[userRef].profile_picture + "\">\n                                            </div>\n                                        </div>\n\n                                        <div class=\"popover-meta\">\n                                            <span class=\"user-meta\">\n                                                <span class=\"username\">" + data[userRef].first_name + " " + data[userRef].last_name + "</span>\n                                            </span>\n                                            <!--span class=\"job-title\">" + data[userRef].title + "</span-->\n                                            <div class=\"common-friends\">\n                                                " + usersIcon + "\n                                                <div class=\"text\">\n                                                    " + data[userRef].common_friends + " mutual friend(s)\n                                                </div>\n                                            </div>\n                                            <div class=\"user-location\">\n                                                " + pinIcon + "\n                                                <div class=\"text\">\n                                                    From <a href=\"#\">" + data[userRef].location + "</a>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"popover-actions\">\n\n                                        <a href=\"#\" class=\"popover-icon\">\n                                            " + profileIcon + "\n                                        </a>\n                                        <a href=\"#\" class=\"popover-icon\">\n                                            " + bookmarkIcon + "\n                                        </a>\n                                        <a href=\"#\" class=\"popover-icon\">\n                                            " + messageIcon + "\n                                        </a>\n                                    </div>\n                                </div>\n                            ";
            return html;
            return destroyLoader;
          }
        });
      }
    });
  });
}

$(document).ready(function () {
  /* Users
        0. Jenna Davis
      1. Dan Walker
      2. Stella Bergmann
      3. Daniel Wellington
      4. David Kim
      5. Edward Mayers
      6. Elise Walker
      7. Milly Augustine
      8. Bobby Brown
      9. Nelly Schwartz
      10. Lana Henrikssen
      11. Gaelle Morris
      12. Mike Lasalle
      13. Rolf Krupp
      14. Ken Rogers
      15. Leana Marks
      16. Aline Cambell
      17. Mike Donovan
      18. George A. Romero
      19. Brian Stevenson
      20. Azzouz El Paytoun
      21. Cathy Smith
      22. Bob Barker
      23. Greg Patel
      24. Hisashi Yokida
  */
  getUserPopovers();
});