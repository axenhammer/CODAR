/*! settings.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Settings js file
========================================================================== */
"use strict";

$(document).ready(function () {
  if ($('.settings-wrapper').length) {
    //Sidebar
    if ($('.settings-sidebar').length) {
      var handleMobileSidebar = function handleMobileSidebar() {
        if (window.matchMedia("(max-width: 767px)").matches) {
          $('.settings-sidebar').removeClass('is-active');
        } else if (window.matchMedia("(max-width: 768px)").matches) {
          $('.settings-sidebar').removeClass('is-active');
        } else {
          $('.settings-sidebar').addClass('is-active');
        }
      };

      $('.mobile-sidebar-trigger').on('click', function () {
        $('.settings-sidebar').addClass('is-active');
      });
      $('.close-settings-sidebar').on('click', function () {
        $(this).closest('.settings-sidebar').removeClass('is-active');
      });
      handleMobileSidebar();
      $(window).on('resize', function () {
        handleMobileSidebar();
      });
    } //Settings sections toggle


    $('.settings-sidebar .menu-block li').on('click', function () {
      var targetSection = $(this).attr('data-section');
      $('.settings-sidebar .menu-block li').removeClass('is-active');
      $(this).addClass('is-active');
      $('.settings-wrapper .settings-section, .tip-group').removeClass('is-active');
      $('#' + targetSection + '-settings').addClass('is-active');
      $('#' + targetSection + '-tips').addClass('is-active');
    }); //Country autocomplete

    if ($('#country-autocpl').length) {
      var html = '';
      var summary = '';
      var countryOptions = {
        url: "assets/data/api/countries/countries.json",
        getValue: "name",
        template: {
          type: "custom",
          method: function method(value, item) {
            return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.code + "</span></div></div> ";
          }
        },
        highlightPhrase: false,
        list: {
          maxNumberOfElements: 3,
          showAnimation: {
            type: "fade",
            //normal|slide|fade
            time: 400,
            callback: function callback() {}
          },
          match: {
            enabled: true
          },
          onChooseEvent: function onChooseEvent() {
            //Get the user name from the autocomplete
            var newRecipient = $('#country-autocpl').val(); //empty the input for next use
            //$('#country-autocpl').val('');
          }
        }
      };
      $("#country-autocpl").easyAutocomplete(countryOptions);
    }
  }
});