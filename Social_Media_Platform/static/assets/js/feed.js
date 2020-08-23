"use strict";

/*! feed.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Feed page js file
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('#activity-feed').length) {
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
    }; //Toggle tag friends input in album modal


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

        if (window.matchMedia("(orientation: portrait)").matches) {
          $('#no-stream-modal').addClass('is-active');
        } else {
          $('#' + videosModal).addClass('is-active');
        }

        setTimeout(function () {
          $this.closest('.card-body').find('.content-block, .dot').toggleClass('is-active');
          $this.text('Next').off();
          videosHelp();
        }, 800);
      });
    }; //Add a recommended page to favorites


    //Feed v1 left menu
    if ($('.feed-menu-v1').length) {
      $('.feed-menu-v1 .main-menu li.is-active').find('.submenu').slideDown();
      $('.feed-menu-v1 .main-menu li').on('click', function () {
        //$('.submenu').slideUp();
        $(this).siblings('li').removeClass('is-active').find('.submenu').slideUp();
        $(this).addClass('is-active').find('.submenu').slideDown();
      });
    } //Open publish mode


    $('#publish').on('click', function () {
      $('.app-overlay').addClass('is-active');
      $('.is-new-content').addClass('is-highlighted');
    }); //Open publish mode from new story-button

    $('#add-story-button').on('click', function () {
      $('.app-overlay').addClass('is-active');
      $('.is-new-content').addClass('is-highlighted');
      $('.target-channels .channel').each(function () {
        if ($(this).find('input[type="checkbox"]').prop('checked')) {
          $(this).find('input[type="checkbox"]').prop('checked', false);
        } else {
          $(this).find('input[type="checkbox"]').prop('checked', true);
        }
      });
    }); //Enable and disable publish button based on the textarea value length (1)

    $('#publish').on('input', function () {
      var valueLength = $(this).val().length;

      if (valueLength >= 1) {
        $('#publish-button').removeClass('is-disabled');
      } else {
        $('#publish-button').addClass('is-disabled');
      }
    }); //Close compose box

    $('.close-publish').on('click', function () {
      $('.app-overlay').removeClass('is-active');
      $('.is-new-content').removeClass('is-highlighted');
      $('#compose-search, #extended-options, .is-suboption').addClass('is-hidden');
      $('#basic-options, #open-compose-search').removeClass('is-hidden');
    }); //Expand compose box

    $('#show-compose-friends').on('click', function () {
      $(this).addClass('is-hidden');
      $('.friends-list').removeClass('is-hidden');
      $('.hidden-options').addClass('is-opened');
    }); //Open extended options

    $('#open-extended-options').on('click', function () {
      $('.app-overlay').addClass('is-active');
      $('.is-new-content').addClass('is-highlighted');
      $('.compose-options').toggleClass('is-hidden');
    }); //Open compose box search

    $('#open-compose-search').on('click', function () {
      $('#compose-search, #open-compose-search').toggleClass('is-hidden');
    }); //Enable checkbox checking and unchecking by clicking on the row

    $('.channel, .friend-block').on('click', function (e) {
      if (e.target !== this) {
        return false;
      } else {
        if ($(this).find('input[type="checkbox"]').prop('checked')) {
          $(this).find('input[type="checkbox"]').prop('checked', false);
        } else {
          $(this).find('input[type="checkbox"]').prop('checked', true);
        }
      }
    }); //Suboptions

    $('#open-tag-suboption').on('click', function () {
      $('.is-suboption').addClass('is-hidden');
      $('#tag-suboption').removeClass('is-hidden'); //Open autocomplete dropdown

      openFriendsDrop();
    }); //Show activities

    $('#show-activities, #extended-show-activities').on('click', function () {
      $('.app-overlay').addClass('is-active');
      $('.is-new-content').addClass('is-highlighted'); //$('.compose-options').toggleClass('is-hidden');

      $('.is-suboption').addClass('is-hidden');
      $('#activities-suboption').removeClass('is-hidden'); //Open autocomplete dropdown

      openActivitiesDrop();
    }); //

    $('.input-block, .close-icon.is-subactivity').on('click', function () {
      $('#activities-autocpl-wrapper').toggleClass('is-hidden');
      $('.is-activity').addClass('is-hidden');
      $('.easy-autocomplete-container li').removeClass('selected');
      $('.mood-display').html(''); //Open autocomplete dropdown

      openActivitiesDrop();
    }); //Show location input

    $('#open-location-suboption').on('click', function () {
      $('.is-suboption').addClass('is-hidden');
      $('#location-suboption').removeClass('is-hidden');
    }); //Show URL input

    $('#open-link-suboption').on('click', function () {
      $('.is-suboption').addClass('is-hidden');
      $('#link-suboption').removeClass('is-hidden');
    }); //Show GIF input

    $('#open-gif-suboption').on('click', function () {
      $('.is-suboption').addClass('is-hidden');
      $('#gif-suboption').removeClass('is-hidden');
    }); //Close autocomplete sections when clicking on the X

    $('.is-autocomplete .close-icon.is-main').on('click', function () {
      $(this).closest('.is-suboption').addClass('is-hidden');
    }); //Init comments

    initPostComments(); //Handle adding member in a new group (modal)

    $('#new-group-list .friend-block').on('click', function () {
      var selectedRef = $(this).closest('.friend-block').attr('data-ref');
      var selectedAvatar = $(this).closest('.friend-block').find('img').attr('src');
      var selectedFriend = $(this).closest('.friend-block').find('.friend-name').text();
      var checkIcon = feather.icons.check.toSvg();
      var html = '';

      if ($(this).find('input').prop('checked')) {
        if ($('#' + selectedRef).length) {
          return false;
        } else {
          html = "\n                        <div id=\"" + selectedRef + "\" class=\"selected-friend-block\">\n                            <div class=\"image-wrapper\">\n                                <img class=\"friend-avatar\" src=\"" + selectedAvatar + "\" alt=\"\">\n                                <div class=\"checked-badge\">\n                                    " + checkIcon + "\n                                </div>\n                            </div>\n                            <div class=\"friend-name\">" + selectedFriend + "</div>\n                        </div>\n                    ";
          $('#selected-list').append(html);
          var selectedCount = $('#selected-list .selected-friend-block').length;
          $('#selected-friends-count').html(selectedCount);
        }
      } else {
        console.log('it has been unchecked!');
        $('#' + selectedRef).remove();
        var selectedCount = $('#selected-list .selected-friend-block').length;
        $('#selected-friends-count').html(selectedCount);
      }
    }); //Help modal before albums management

    albumsHelp();
    $('#tagged-in-album button').on('click', function () {
      $(this).addClass('is-hidden');
      $(this).closest('.tagged-in-album').find('.field, p').toggleClass('is-hidden');
    }); //Toggle datepicker input in album modal

    $('#album-date button').on('click', function () {
      $(this).addClass('is-hidden');
      $(this).closest('.album-date').find('p').addClass('is-hidden');
      $(this).closest('.album-date').find('.control').removeClass('is-hidden');
    }); //Init datepicker inside album modal

    $('#album-datepicker').datepicker({
      format: 'mm-dd-yyyy',
      container: 'body',
      autoHide: true,
      offset: 0
    }); //Help modal before live video

    videosHelp();
    $('.add-transition').on('click', function () {
      var $this = $(this);
      var itemName = $this.closest('.transition-block').find('.page-meta span:first-child').text();
      var successIndicator = "\n                <div class=\"checkmark-wrapper\">\n                    <svg class=\"checkmark is-xs\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\">\n                        <circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n                        <path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\"/>\n                    </svg>\n                </div>\n            ";
      $(this).addClass('is-hidden');
      $(this).closest('.transition-block').append(successIndicator); //Show a success toast

      setTimeout(function () {
        if ($this.closest('.transition-block').hasClass('page-block')) {
          iziToast.show({
            maxWidth: '280px',
            class: 'success-toast',
            icon: 'mdi mdi-bookmark-plus',
            title: '',
            message: '<b>' + itemName + '</b> has been added to your bookmarks',
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#344258',
            progressBarColor: '#0062ff',
            position: 'bottomRight',
            transitionIn: 'fadeInUp',
            close: false,
            timeout: 1800,
            zindex: 99999
          });
        } else {
          iziToast.show({
            maxWidth: '280px',
            class: 'success-toast',
            icon: 'mdi mdi-email-check',
            title: '',
            message: 'You will be redirected to message <b>' + itemName + '</b> shortly!',
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#344258',
            progressBarColor: '#0062ff',
            position: 'bottomRight',
            transitionIn: 'fadeInUp',
            close: false,
            timeout: 1800,
            zindex: 99999
          });
        }
      }, 1000);
    });
  }

  if ($('#share-modal').length) {
    //Share modal main dropdown
    $('.share-dropdown').on('click', function () {
      $(this).toggleClass('is-active');
    }); //Share modal main dropdown

    $('.share-dropdown .dropdown-item').on('click', function () {
      var targetSharingChannel = $(this).attr('data-target-channel');
      var channelIcon = $(this).find('i').attr('class');
      var channelName = $(this).find('h3').text();

      if (targetSharingChannel !== undefined) {
        $('.share-dropdown .button').find('i').removeClass().addClass(channelIcon);
        $('.share-dropdown .button').find('span').text(channelName);
        $('.share-channel-control').addClass('is-hidden');
        $('.footer-action.is-active').removeClass('is-active');
        $('#share-to-' + targetSharingChannel).removeClass('is-hidden').find('input').focus();
      }
    }); //Share modal page selector subdropdown

    $('.page-dropdown').on('click', function () {
      $(this).toggleClass('is-active');
    }); //Share modal footer actions

    $('.action-wrap .footer-action').on('click', function () {
      var targetAction = $(this).attr('data-target-action');
      $('.footer-action.is-active').removeClass('is-active');
      $(this).addClass('is-active');

      if (targetAction !== undefined) {
        //$('.share-channel-control').addClass('is-hidden');
        $('.bottom-share-inputs .field').addClass('is-hidden');
        $('#action-' + targetAction).removeClass('is-hidden').find('input').focus();
      }
    });
  }
});