"use strict";

/*! chat.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Chat js file
========================================================================== */
$(document).ready(function () {
  "use strict"; //Close chat app

  $('.close-chat, .open-chat').on('hover', function () {
    $('.chat-wrapper').toggleClass('is-active');
    $('body').toggleClass('is-frozen');
  }); //Close chat side panel

  $('#chat-panel .panel-close').on('click', function () {
    $('#chat-body, #chat-panel').removeClass('is-opened');
  });
  $('#chat-sidebar .user-item').on('click', function () {
    //Declare variables
    var targetUser = $(this).attr('data-chat-user');
    var userAvatar = $(this).find('img').attr('src');
    var targetUserFullname = $(this).attr('data-full-name');
    var userStatus = $(this).attr('data-status'); //Handle sidebar chat items active state

    $('.user-item.is-active').removeClass('is-active');
    $(this).addClass('is-active'); //Resize chat body and open side panel

    $('#chat-body, #chat-panel').addClass('is-opened'); //Handle user details toggle

    $('.chat-body-inner').addClass('is-hidden');
    $('#' + targetUser + '-conversation').removeClass('is-hidden'); //Handle user conversation toggle

    $('.panel-body').addClass('is-hidden');
    $('#' + targetUser + '-details').removeClass('is-hidden'); //Handle conversation header update

    $('.recipient-block').find('.user-avatar').attr('src', userAvatar);
    $('.recipient-block').find('.username span:first-child').text(targetUserFullname);
    $('.recipient-block').find('.username span span').text('| ' + userStatus);
  });
});
