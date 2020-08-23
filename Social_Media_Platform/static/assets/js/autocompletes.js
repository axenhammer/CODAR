"use strict";

/*! autocompletes.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
All autocompletes that are used accross the project
========================================================================== */
$(document).ready(function () {
  "use strict"; //Friends autocomplete

  if ($('#users-autocpl').length) {
    var html = '';
    var summary = '';
    var usersOptions = {
      url: "assets/data/api/users/user-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.badge + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.location + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          var newRecipient = $('#users-autocpl').val(); //empty the input for next use

          $('#users-autocpl').val('');
          html = "\n                        <div class=\"control tag-control\">\n                            <div class=\"tags has-addons\">\n                                <a class=\"tag is-link\">" + newRecipient + "</a>\n                                <a class=\"tag is-delete is-inverted\"></a>\n                            </div>\n                        </div>\n                    ";
          summary = "\n                        <span class=\"tagged-friend\"><small>&mdash; with</small> <a class=\"is-inverted\" href=\"#\">" + newRecipient + "</a>,</span>\n                    "; //Append tag template in list

          $.when($('#tag-list').append(html)).done(function () {
            //Add the name to the tagged friends summary
            $('#options-summary').append(summary); //Make added tag removable

            $('.tag.is-delete').on('click', function () {
              var friendName = $(this).closest('.tags').find('.tag.is-link').text();
              $(this).closest('.tag-control').remove();
              $('.tagged-friend a').each(function () {
                var comparedName = $(this).text();

                if (friendName === comparedName) {
                  $(this).closest('.tagged-friend').remove();
                } else {
                  return false;
                }
              });
            });
          });
        }
      }
    };
    $("#users-autocpl").easyAutocomplete(usersOptions);
  } // Share modal friend tags autocomplete


  if ($('#share-friend-tags-autocpl').length) {
    var html = '';
    var summary = '';
    var usersOptions = {
      url: "assets/data/api/users/user-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.badge + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.location + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          var newTag = $('#share-friend-tags-autocpl').val(); //empty the input for next use

          $('#share-friend-tags-autocpl').val('');
          html = "\n                        <div class=\"control is-spaced tag-control\">\n                            <div class=\"tags has-addons\">\n                                <a class=\"tag is-link\">" + newTag + "</a>\n                                <a class=\"tag is-delete is-inverted\"></a>\n                            </div>\n                        </div>\n                    ";
          summary = "\n                        <span class=\"tagged-friend\"><small>&mdash; with</small> <a class=\"is-inverted\" href=\"#\">" + newTag + "</a>,</span>\n                    "; //Append tag template in list

          $.when($('#share-modal-tag-list').append(html)).done(function () {
            //Make added tag removable
            $('.tag.is-delete').on('click', function () {
              $(this).closest('.tag-control').remove();
            });
          });
        }
      }
    };
    $("#share-friend-tags-autocpl").easyAutocomplete(usersOptions);
  } //Friends autocomplete


  if ($('#create-album-friends-autocpl').length) {
    var html = '';
    var summary = '';
    var closeIcon = feather.icons.x.toSvg();
    var albumOptions = {
      url: "assets/data/api/users/user-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.badge + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.location + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //
          var userId = $("#create-album-friends-autocpl").getSelectedItemData().id;
          var userAvatar = $("#create-album-friends-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#create-album-friends-autocpl').val('');
          html = "\n                        <div class=\"tagged-user\">\n                            <img src=\"" + userAvatar + "\" alt=\"\"  data-user-popover=\"" + userId + "\">\n                            <div class=\"remove-tag\">\n                                " + closeIcon + "\n                            </div>\n                        </div>\n                    "; //Append tag template in list

          $.when($('#album-tag-list').append(html)).done(function () {
            //Init user popovers
            getUserPopovers(); //Make added tag removable

            $('.remove-tag').on('click', function () {
              $(this).closest('.tagged-user').remove();
            });
          });
        }
      }
    };
    $("#create-album-friends-autocpl").easyAutocomplete(albumOptions);
  } //Simple Friends autocomplete


  if ($('.simple-users-autocpl').length) {
    var html = '';
    var summary = '';
    var simpleUsersOptions = {
      url: "assets/data/api/users/user-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.badge + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.location + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          var newFriend = $('.simple-users-autocpl').val();
        }
      }
    };
    $(".simple-users-autocpl").easyAutocomplete(simpleUsersOptions);
  } //Simple Groups autocomplete


  if ($('.simple-groups-autocpl').length) {
    var html = '';
    var summary = '';
    var simpleGroupsOptions = {
      url: "assets/data/api/groups/groups-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.country + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.topic + "</span></div><div class=" + 'right-content' + ">" + item.members + " members</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //Get the group name from the autocomplete
          var newGroup = $('.simple-groups-autocpl').val();
        }
      }
    };
    $(".simple-groups-autocpl").easyAutocomplete(simpleGroupsOptions);
  } //Simple locations autocomplete


  if ($('.simple-locations-autocpl').length) {
    var html = '';
    var summary = '';
    var simpleLocationsOptions = {
      url: "assets/data/api/places/places-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar is-squared' + " src='" + item.pic + "' /><img class=" + 'avatar-badge' + " src='" + item.country + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.address + "</span></div><div class=" + 'right-content' + ">" + item.visitors + " where there</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //Get the location name from the autocomplete
          var newGroup = $('.simple-locations-autocpl').val();
        }
      }
    };
    $(".simple-locations-autocpl").easyAutocomplete(simpleLocationsOptions);
  } //Activities autocomplete


  if ($('#activities-autocpl').length) {
    var html = '';
    var activitiesOptions = {
      url: "assets/data/api/activities/activity-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.desc + "</span></div><div class=" + 'next-icon' + "><i class=" + 'mdi mdi-chevron-right' + "></i></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 6,
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
          //Get the activity name from the autocomplete
          var newActivity = $('#activities-autocpl').val(); //empty the input for next use

          $('#activities-autocpl').val('');

          if (newActivity === 'status') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#mood-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openMoodDrop();
          } else if (newActivity === 'drinking') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#drinking-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openDrinksDrop();
          } else if (newActivity === 'eating') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#eating-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openEatsDrop();
          } else if (newActivity === 'reading') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#reading-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openReadsDrop();
          } else if (newActivity === 'watching') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#watching-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openWatchDrop();
          } else if (newActivity === 'travelling') {
            $('#activities-autocpl-wrapper, .is-activity').addClass('is-hidden');
            $('#travel-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

            openTravelDrop();
          }
        }
      }
    };
    $("#activities-autocpl").easyAutocomplete(activitiesOptions);
  } //Mood autocomplete


  if ($('#mood-autocpl').length) {
    var html = '';
    var moodOptions = {
      url: "assets/data/api/activities/mood/mood-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper is-smaller' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //Get the mood item name from the autocomplete
          var newMood = $('#mood-autocpl').val(); //

          var emoji = $("#mood-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#mood-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + emoji + "\"><span>" + newMood + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#mood-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#activities-suboption, #mood-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openMoodDrop();
            });
          });
        }
      }
    };
    $("#mood-autocpl").easyAutocomplete(moodOptions);
  } //Drinks autocomplete


  if ($('#drinking-autocpl').length) {
    var html = '';
    var drinkingOptions = {
      url: "assets/data/api/activities/drinking/drinking-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper is-smaller' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //Get the drink name from the autocomplete
          var newDrink = $('#drinking-autocpl').val(); //

          var drinkIcon = $("#drinking-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#drinking-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + drinkIcon + "\"><span class=\"is-inverted\"\"><span class=\"action-text\">is drinking</span>" + newDrink + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#drinking-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#activities-suboption, #drinking-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openDrinksDrop();
            });
          });
        }
      }
    };
    $("#drinking-autocpl").easyAutocomplete(drinkingOptions);
  } //Eating autocomplete


  if ($('#eating-autocpl').length) {
    var html = '';
    var eatingOptions = {
      url: "assets/data/api/activities/eating/eating-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper is-smaller' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 5,
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
          //Get the drink name from the autocomplete
          var newEat = $('#eating-autocpl').val(); //

          var eatIcon = $("#eating-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#eating-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + eatIcon + "\"><span><span class=\"action-text\">is eating</span>" + newEat + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#eating-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#activities-suboption, #eating-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openEatsDrop();
            });
          });
        }
      }
    };
    $("#eating-autocpl").easyAutocomplete(eatingOptions);
  } //Reads autocomplete


  if ($('#reading-autocpl').length) {
    var html = '';
    var readingOptions = {
      url: "assets/data/api/activities/reading/reading-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span class=" + 'is-description' + ">" + item.desc + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 6,
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
          //Get the activity name from the autocomplete
          var newRead = $('#reading-autocpl').val(); //

          var readIcon = $("#drinking-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#reading-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + readIcon + "\"><span class=\"is-inverted\"\"><span class=\"action-text\">is reading</span>" + newRead + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#reading-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').off();
            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#reading-suboption, #reading-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openReadsDrop();
            });
          });
        }
      }
    };
    $("#reading-autocpl").easyAutocomplete(readingOptions);
  } //Watch autocomplete


  if ($('#watching-autocpl').length) {
    var html = '';
    var watchingOptions = {
      url: "assets/data/api/activities/watching/watching-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'avatar-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "<br><span class=" + 'is-description' + ">" + item.desc + "</span></div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 6,
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
          //Get the activity name from the autocomplete
          var newWatch = $('#watching-autocpl').val(); //

          var watchIcon = $("#watching-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#watching-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + watchIcon + "\"><span class=\"is-inverted\"\"><span class=\"action-text\">is watching</span>" + newWatch + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#watching-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').off();
            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#watching-suboption, #watching-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openReadsDrop();
            });
          });
        }
      }
    };
    $("#watching-autocpl").easyAutocomplete(watchingOptions);
  } //Travel autocomplete


  if ($('#travel-autocpl').length) {
    var html = '';
    var travelOptions = {
      url: "assets/data/api/activities/travel/travel-autocpl.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><div class=" + 'icon-wrapper' + ">" + "<img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /></div><div class=" + 'entry-text' + ">" + value + "</div></div> ";
        }
      },
      highlightPhrase: false,
      list: {
        maxNumberOfElements: 10,
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
          //Get the drink name from the autocomplete
          var newTravel = $('#travel-autocpl').val(); //

          var travelIcon = $("#travel-autocpl").getSelectedItemData().pic; //empty the input for next use

          $('#travel-autocpl').val('');
          html = "\n                        <span class=\"mood-display\"><img src=\"" + travelIcon + "\"><span class=\"is-inverted\"\"><span class=\"action-text\">Travels to</span>" + newTravel + "</span></span>\n                    ";

          if ($('.mood-display').length) {
            $('.mood-display').remove();
          }

          $.when($('#options-summary').prepend(html)).done(function () {
            $('#travel-autocpl-wrapper').addClass('is-hidden'); //

            $('.mood-display').on('click', function () {
              $('.is-suboption').addClass('is-hidden');
              $('#activities-suboption, #travel-autocpl-wrapper').removeClass('is-hidden'); //Open autocomplete dropdown

              openTravelDrop();
            });
          });
        }
      }
    };
    $("#travel-autocpl").easyAutocomplete(travelOptions);
  } //Google places autocomplete


  if ($('#location-autocpl').length) {
    $(function () {
      var autocomplete;
      var geocoder;
      var input = document.getElementById('location-autocpl');
      var options = {
        //componentRestrictions: {'country':'us'},
        types: ['(cities)'] // (regions)

      };
      autocomplete = new google.maps.places.Autocomplete(input, options);
      $('#go').click(function () {
        var location = autocomplete.getPlace();
        geocoder = new google.maps.Geocoder();
        console.log(location['geometry']);
        lat = location['geometry']['location'].lat();
        lng = location['geometry']['location'].lng();
        var latlng = new google.maps.LatLng(lat, lng); // http://stackoverflow.com/a/5341468

        geocoder.geocode({
          'latLng': latlng
        }, function (results) {
          for (i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].address_components.length; j++) {
              for (var k = 0; k < results[i].address_components[j].types.length; k++) {
                if (results[i].address_components[j].types[k] == "postal_code") {
                  zipcode = results[i].address_components[j].short_name;
                  $('span.zip').html(zipcode);
                }
              }
            }
          }
        });
      });
    });
  }
});