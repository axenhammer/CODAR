"use strict";

/*! widgets.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Widgets js file
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('.schedule').length) {
    var style = document.createElement('style');
    document.head.appendChild(style);
    var headerDot = document.querySelector('.day-header-bg');
    var headerDotClasses = ['primary', 'pink', 'purple', 'green'];
    var headerCloseBtn = document.querySelector('.day-header-close');
    var dayContainer = document.querySelector('.schedule-day-container');
    var toggleFab = document.querySelector('.next-fab');
    var dayHeaderTitleDay = document.querySelector('.day-header-title-day');
    var dayHeaderContent = document.querySelector('.day-header-content');
    var dayHeaderEvent = document.querySelector('.day-header-event');
    var dayContent = document.querySelector('.day-content');
    var dayContentDetails = document.querySelector('.day-content').children;
    var dayHeader = document.querySelector('.day-header');
    dayContent.addEventListener('scroll', function (_) {
      if (_.target.scrollTop > 155) {
        if (dayHeader.classList.contains('day-header--large')) {
          dayHeader.classList.remove('day-header--large');
          dayHeader.classList.add('sticky');
          dayHeader.style.height = 58 + 'px';
        }
      } else if (_.target.scrollTop < 155) {
        if (!dayHeader.classList.contains('day-header--large')) {
          dayHeader.classList.add('day-header--large');
          dayHeader.classList.remove('sticky');
          dayHeader.style.height = 280 + 'px';
        }

        dayHeader.style.height = 200 - _.target.scrollTop + 'px';
      }
    });
    headerCloseBtn.addEventListener('click', function (_) {
      dayContainer.classList.add('animate-out');
      setTimeout(function () {
        dayContainer.classList.add('hidden');
        dayContainer.classList.remove('animate-out');
        dayHeaderContent.classList.remove('animate-in');
        dayContent.classList.remove('animate-in');
        dayHeader.classList.add('day-header--large');
        dayHeader.classList.remove('sticky');
        dayContent.scrollTop = 0;
        headerCloseBtn.classList.remove('animate');
        headerDot.classList.remove('animate');
        headerDotClasses.forEach(function (c) {
          headerDot.classList.remove(c);
        });
        toggleFab.classList.remove('is-hidden');
        style.innerHTML = '';
      }, 155);
    });
    Array.from(document.querySelectorAll('[data-day]')).forEach(function (day) {
      var selector = '.schedule .schedule-calendar .calendar-row .day.event[data-day="' + day.dataset.day + '"]:before';
      var colorClass = headerDotClasses.filter(function (c) {
        return day.classList.contains(c);
      })[0];
      day.addEventListener('click', function (_) {
        var animate = _.target.classList.contains('animate');

        var targetDetails = _.target.getAttribute("data-content");

        var contentBlock = '#event-' + _.target.dataset.content; //var eventContentActive = document.getElementsByClassName('event-details-wrap is-active');

        console.log(dayContentDetails);
        toggleFab.classList.add('is-hidden');
        dayContainer.classList.remove('hidden');
        $('.event-details-wrap').removeClass('is-active');
        $(contentBlock).addClass('is-active'); //dayContentDetails.classList.remove('is-active');
        //contentContent.classList.add('is-active');

        headerDot.classList.remove('animate');
        headerDotClasses.forEach(function (c) {
          headerDot.classList.remove(c);
        });
        dayHeaderTitleDay.innerText = day.dataset.day;
        dayHeaderEvent.innerText = day.dataset.event;

        if (!animate) {
          style.innerHTML = selector + ' {\n            top: ' + _.target.offsetTop + 'px;\n            left: ' + _.target.offsetLeft + 'px;\n          }';
        } else {
          style.innerHTML = '';
        }

        _.target.classList.add('animate'); // Just above the bottom of the header
        // Math done from the vars in the stylus


        var endPos = {
          x: 55,
          y: 166
        };
        style.innerHTML = selector + ' {\n            top: ' + _.target.offsetTop + 'px;\n            left: ' + _.target.offsetLeft + 'px;\n          }\n         ' + selector + ' {\n            transform: translate(\n              ' + (String(endPos.x - _.target.offsetLeft) + 'px') + ',\n              ' + (String(endPos.y - _.target.offsetTop) + 'px') + '\n            )\n        }';
        setTimeout(function () {
          _.target.classList.remove('animate');

          headerDot.classList.add(colorClass);
          headerDot.classList.add('animate');
          dayContent.classList.add('animate-in');
          setTimeout(function () {
            headerCloseBtn.classList.add('animate');
            dayHeaderContent.classList.add('animate-in');
          }, 150);
        }, 150);
      });
    });
    $('.next-fab').on('click', function () {
      $(this).toggleClass('is-toggled');
      $('.schedule-events').slideToggle();
    });
  }
});