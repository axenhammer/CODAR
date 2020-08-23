"use strict";

/*! inbox.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Inbox UI functions
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('.inbox-wrapper').length) {
    //Ui utilities
    $('.left-menu a').on('click', function () {
      $('.left-menu a.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    });
    $('.msg-subject svg').on('click', function () {
      $(this).toggleClass('is-active');
    });
    $('.is-msg').on('click', function () {
      $('.is-msg.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    }); //Quill Editor init

    var containers = document.querySelectorAll('.reply-textarea');
    var editors = Array.from(containers).map(function (container) {
      return new Quill(container, {
        modules: {
          toolbar: [[{
            header: [1, 2, false]
          }], ['bold', 'italic', 'underline'], ['image', 'code-block']]
        },
        placeholder: 'Write your reply...',
        theme: 'bubble'
      });
    }); //Previews

    $('.is-msg').on('click', function () {
      var targetPreview = $(this).attr('data-preview-id');
      $('.message-body-inner.is-active').removeClass('is-active');
      $('#message-preview-' + targetPreview).addClass('is-active');
      $('.message-body').animate({
        scrollTop: 0
      }, 'fast');
      $('.inbox-message-container').addClass('is-opened-mobile');
    }); //Close previews

    $('#close-inbox-preview').on('click', function () {
      $('.inbox-message-container').removeClass('is-opened-mobile');
    });
    $('#open-compose, #close-compose').on('click', function () {
      $('.inbox-left-sidebar').toggleClass('is-opened-mobile');
    });
  }
});