"use strict";

/*! landing.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Landing page functions
========================================================================== */
$(document).ready(function () {
  "use strict";

  if ($('.landing-wrapper').length) {
    var scroll_if_anchor = function scroll_if_anchor(href) {
      href = typeof href == "string" ? href : $(this).attr("href"); // You could easily calculate this dynamically if you prefer

      var fromTop = 50; // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
      // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174

      if (href.indexOf("#") == 0) {
        var $target = $(href); // Older browser without pushState might flicker here, as they momentarily
        // jump to the wrong position (IE < 10)

        if ($target.length) {
          $('html, body').animate({
            scrollTop: $target.offset().top - fromTop
          });

          if (history && "pushState" in history) {
            history.pushState({}, document.title, window.location.pathname + href);
            return false;
          }
        }
      }
    }; // When our page loads, check to see if it contains and anchor


    scroll_if_anchor(window.location.hash); // Intercept all anchor clicks

    $("body").on("click", "a", scroll_if_anchor); //Scroll reveal definitions

    window.sr = ScrollReveal(); // Simple reveal

    sr.reveal('.is-single-reveal', {
      origin: 'bottom',
      distance: '20px',
      duration: 600,
      delay: 300,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      container: window.document.documentElement,
      mobile: true,
      reset: false,
      useDelay: 'always',
      viewFactor: 0.2
    }); // Revealing multiple icons

    sr.reveal('.is-box-reveal', {
      origin: 'bottom',
      distance: '20px',
      duration: 600,
      delay: 100,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      container: window.document.documentElement,
      mobile: true,
      reset: true,
      useDelay: 'always',
      viewFactor: 0.2
    }, 100);
    /* ---- particles.js config ---- */

    if ($('#particles-js').length) {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 50,
            "density": {
              "enable": true,
              "value_area": 1000
            }
          },
          "color": {
            "value": ["#1a72ff"]
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 5,
              "color": "#1a72ff"
            },
            "fill": {
              "color": "#1a72ff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 4,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 120,
            "color": "#1a72ff",
            "opacity": 0.2,
            "width": 1.6
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "top",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": false
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }
});