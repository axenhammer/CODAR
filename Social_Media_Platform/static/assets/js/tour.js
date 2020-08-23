/*! tour.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
App Tour
========================================================================== */
"use strict";

var tour = {
  id: "hello-friendkit",
  onEnd: function onEnd() {
    $('#end-tour-modal').addClass('is-active');
  },
  steps: [{
    title: "Let's hop in!",
    content: "Get ready, we are taking you for a template tour.",
    target: document.querySelector("#tour-start"),
    placement: "bottom"
  }, {
    title: "Made with Bulma",
    content: "Friendkit is built on top of Bulma 0.7.5, a very popular mobile first CSS framework.",
    target: document.querySelector("#made-with-bulma"),
    placement: "top",
    xOffset: 40
  }, {
    title: "Outstanding Features",
    content: "Friendkit comes with a lot of features, prebuilt pages and interactions. Be sure to check them out!",
    target: document.querySelector("#icon-features"),
    placement: "top",
    xOffset: "center"
  }, {
    title: "Prebuilt Pages",
    content: "More prebuilt pages will be added with each future update. But let's continue our tour to show you some of those.",
    target: document.querySelector("#demos-section"),
    placement: "top",
    xOffset: "center",
    multipage: true,
    onNext: function onNext() {
      window.location = "feed.html";
    }
  }, {
    title: "Main Layout",
    content: "This is the main app layout, the navbar provides controls to manage content, user account, and notifications.",
    target: document.querySelector("#main-navbar"),
    placement: "bottom",
    fixedElement: true,
    xOffset: "center"
  }, {
    title: "Chat & Explore",
    content: "You can also access an additional explore menu from the navbar or simply display the chat.",
    target: document.querySelector("#explorer-trigger"),
    placement: "bottom",
    fixedElement: true,
    xOffset: -5,
    onNext: function onNext() {
      setTimeout(function () {
        $('.is-new-content').addClass('hopscotch-highlight');
        $('.app-overlay').addClass('is-active');
      }, 800);
    }
  }, {
    title: "Post Content",
    content: "You can use this UI element to start posting and sharing content, or anything about your mood, who you are with or what you are doing.",
    target: document.querySelector("#compose-card"),
    placement: "bottom",
    xOffset: "center",
    onNext: function onNext() {
      $('.is-new-content').removeClass('hopscotch-highlight');
      $('.app-overlay').removeClass('is-active');
      setTimeout(function () {
        $('#feed-post-1').addClass('hopscotch-highlight');
        $('.app-overlay').addClass('is-active');
      }, 1200);
    }
  }, {
    title: "This is a Post",
    content: "This is how a post looks like. You can share content, images, links, videos and everything you'd like.",
    target: document.querySelector("#feed-post-1"),
    placement: "top",
    xOffset: "center",
    onNext: function onNext() {
      $('#feed-post-1').removeClass('hopscotch-highlight');
      $('.app-overlay').removeClass('is-active');
      setTimeout(function () {
        $('#latest-activity-1').addClass('hopscotch-highlight');
        $('.app-overlay').addClass('is-active');
      }, 1200);
    }
  }, {
    title: "This is a Widget",
    content: "Widgets are used to display abunch of useful information and mainly act as shortcuts.",
    target: document.querySelector("#latest-activity-1"),
    placement: "top",
    xOffset: "center",
    onNext: function onNext() {
      $('#latest-activity-1').removeClass('hopscotch-highlight');
      $('.app-overlay').removeClass('is-active');
    }
  }, {
    title: "User Account",
    content: "Your user account dropdown is here, you can use it to access quick links or to view your profile. Let's go to your profile.",
    target: document.querySelector("#account-dropdown"),
    placement: "left",
    xOffset: "5",
    fixedElement: true,
    multipage: true,
    onNext: function onNext() {
      window.location = "profile-main.html";
    }
  }, {
    title: "Profile",
    content: "This is your profile page, represented by your profile avatar. Click the plus button to display more actions.",
    target: document.querySelector("#user-avatar"),
    placement: "top",
    xOffset: 5
  }, {
    title: "Timeline",
    content: "This is your timeline. All your published posts and shared posts from your friends are here.",
    target: document.querySelector("#profile-timeline-posts"),
    placement: "top",
    xOffset: 5
  }, {
    title: "Basic Info",
    content: "Users and your friends can see some basic information about you, your hobbies or some of your photos.",
    target: document.querySelector("#profile-timeline-widgets"),
    placement: "top",
    xOffset: 5
  }, {
    title: "Friends",
    content: "You can click here to see all your friends and your photos.",
    target: document.querySelector("#profile-friends-link"),
    placement: "top",
    xOffset: 5
  }]
};
$(document).ready(function () {
  $('#tour-start').on('click', function () {
    if (!hopscotch.isActive) {
      // Start the tour!
      hopscotch.startTour(tour, 0);
    }
  });
  console.log(hopscotch.getState());

  if (hopscotch.getState() === "hello-friendkit:4") {
    hopscotch.startTour(tour, 4);
  } else if (hopscotch.getState() === "hello-friendkit:10") {
    hopscotch.startTour(tour, 10);
  }
});