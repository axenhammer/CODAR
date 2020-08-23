"use strict";

/*! profile.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Profile js file
========================================================================== */
$(document).ready(function () {
  "use strict"; //Highlight current profile menu item

  if ($('.profile-menu').length) {
    // Get current page URL
    var url = window.location.href; // remove # from URL

    url = url.substring(0, url.indexOf("#") == -1 ? url.length : url.indexOf("#")); // remove parameters from URL

    url = url.substring(0, url.indexOf("?") == -1 ? url.length : url.indexOf("?")); // select file name

    url = url.substr(url.lastIndexOf("/") + 1); // If file name not available

    if (url == '') {
      url = 'index.html';
    } // Loop all menu items


    $('.profile-menu a').each(function () {
      // select href
      var href = $(this).attr('href'); // Check filename

      if (url == href) {
        // Add active class
        $(this).addClass('is-active');
      }
    });
  } //Avatar buttons


  $('.avatar-button').on('click', function () {
    $(this).toggleClass('is-active');
    $('.pop-button').toggleClass('is-active');
  }); //Pop buttons

  $('.pop-button').on('click', function () {
    $('.pop-button, .avatar-button').toggleClass('is-active');

    if ($(this).attr('id') == 'follow-pop') {
      if ($(this).hasClass('is-shifted')) {
        $(this).removeClass('is-shifted');
        iziToast.show({
          maxWidth: '280px',
          class: 'success-toast',
          icon: 'mdi mdi-bell-off',
          title: '',
          message: 'You are not following Jenna anymore',
          titleColor: '#fff',
          messageColor: '#fff',
          iconColor: "#fff",
          backgroundColor: '#7F00FF',
          progressBarColor: '#b975ff',
          position: 'bottomRight',
          transitionIn: 'fadeInUp',
          close: false,
          timeout: 2500,
          zindex: 99999
        });
      } else {
        $(this).addClass('is-shifted');
        iziToast.show({
          maxWidth: '280px',
          class: 'success-toast',
          icon: 'mdi mdi-bell-ring',
          title: '',
          message: 'You are now following Jenna',
          titleColor: '#fff',
          messageColor: '#fff',
          iconColor: "#fff",
          backgroundColor: '#7F00FF',
          progressBarColor: '#b975ff',
          position: 'bottomRight',
          transitionIn: 'fadeInUp',
          close: false,
          timeout: 2500,
          zindex: 99999
        });
      }
    } else if ($(this).attr('id') == 'invite-pop') {
      if ($(this).hasClass('is-shifted')) {
        $(this).removeClass('is-shifted');
        iziToast.show({
          maxWidth: '280px',
          class: 'success-toast',
          icon: 'mdi mdi-heart-broken',
          title: '',
          message: 'You are no longer friends with Jenna',
          titleColor: '#fff',
          messageColor: '#fff',
          iconColor: "#fff",
          backgroundColor: '#7F00FF',
          progressBarColor: '#b975ff',
          position: 'bottomRight',
          transitionIn: 'fadeInUp',
          close: false,
          timeout: 2500,
          zindex: 99999
        });
      } else {
        $(this).addClass('is-shifted');
        iziToast.show({
          maxWidth: '280px',
          class: 'success-toast',
          icon: 'mdi mdi-send',
          title: '',
          message: 'Your invitation has been sent to Jenna',
          titleColor: '#fff',
          messageColor: '#fff',
          iconColor: "#fff",
          backgroundColor: '#7F00FF',
          progressBarColor: '#b975ff',
          position: 'bottomRight',
          transitionIn: 'fadeInUp',
          close: false,
          timeout: 2500,
          zindex: 99999
        });
      }
    } else if ($(this).attr('id') == 'chat-pop') {
      $('.chat-wrapper').toggleClass('is-active');
      $('body').toggleClass('is-frozen');
    }
  }); //Close picture update selection modal

  $('.change-cover-modal .selection-box, .change-profile-pic-modal .selection-box').on('click', function () {
    $(this).closest('.modal').removeClass('is-active');
  }); //Handle album photos toggle in update photo modal

  $('.album-wrapper').on('click', function () {
    var targetPhotos = $(this).attr('data-album');
    $('.albums-grid').addClass('is-hidden');

    if (targetPhotos !== undefined) {
      $('.album-image-grid').addClass('is-hidden');
      $('#' + targetPhotos).removeClass('is-hidden');
    }
  }); //Cover image cropper

  if ($('#upload-cover').length) {
    var readCoverFile = function readCoverFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $coverCrop.croppie('bind', {
            url: e.target.result
          }).then(function () {
            coverSrc = e.target.result;
            console.log('jQuery bind complete'); //console.log(e.target.result);
          });
        };

        reader.readAsDataURL(input.files[0]);
      } else {
        swal("Sorry - you're browser doesn't support the FileReader API");
      }
    };

    var popupCoverResult = function popupCoverResult(result) {
      var html;

      if (result.html) {
        html = result.html;
        console.log('HTML RESULT', html);
      }

      if (result.src) {
        html = '<img src="' + result.src + '" />';
        console.log(html);
        $('.cover-image').attr('src', result.src);
        $('#submit-cover-picture').removeClass('is-loading');
        $('#upload-crop-cover-modal').removeClass('is-active');
      }
    };

    var coverSrc = '';
    var $coverCrop = $('#upload-cover').croppie({
      enableExif: true,
      url: 'assets/img/demo/placeholder.png',
      viewport: {
        width: 640,
        height: 184,
        type: 'square'
      },
      boundary: {
        width: '100%',
        height: 300
      }
    });
    $('#upload-cover-picture').on('change', function () {
      readCoverFile(this);
      $(this).closest('.modal').find('.cover-uploader-box, .upload-demo-wrap, .cover-reset').toggleClass('is-hidden');
      $('#submit-cover-picture').removeClass('is-disabled');
    });
    $('#submit-cover-picture').on('click', function (ev) {
      var $this = $(this);
      $this.addClass('is-loading');
      $coverCrop.croppie('result', {
        type: 'canvas',
        size: 'original' //size: 'viewport'

      }).then(function (resp) {
        console.log('RESP:', resp);
        popupCoverResult({
          src: resp
        });
      });
    });
    $('#cover-upload-reset').on('click', function () {
      $(this).addClass('is-hidden');
      $('.cover-uploader-box, .upload-demo-wrap').toggleClass('is-hidden');
      $('#submit-cover-picture').addClass('is-disabled');
      $('#upload-cover-picture').val('');
    });
  } //Pofile picture cropper


  if ($('#upload-profile').length) {
    var readFile = function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $uploadCrop.croppie('bind', {
            url: e.target.result
          }).then(function () {
            imgSrc = e.target.result;
            console.log('jQuery bind complete');
          });
        };

        reader.readAsDataURL(input.files[0]);
      } else {
        swal("Sorry - you're browser doesn't support the FileReader API");
      }
    };

    var popupResult = function popupResult(result) {
      var html;

      if (result.html) {
        html = result.html;
      }

      if (result.src) {
        html = '<img src="' + result.src + '" />';
        $('.cover-bg .avatar .avatar-image').attr('src', result.src);
        $('#submit-profile-picture').removeClass('is-loading');
        $('#upload-crop-profile-modal').removeClass('is-active');
      }
    };

    var imgSrc = '';
    var $uploadCrop = $('#upload-profile').croppie({
      enableExif: true,
      url: 'assets/img/demo/placeholder.png',
      viewport: {
        width: 130,
        height: 130,
        type: 'circle'
      },
      boundary: {
        width: '100%',
        height: 300
      }
    });
    $('#upload-profile-picture').on('change', function () {
      readFile(this);
      $(this).closest('.modal').find('.profile-uploader-box, .upload-demo-wrap, .profile-reset').toggleClass('is-hidden');
      $('#submit-profile-picture').removeClass('is-disabled');
    });
    $('#submit-profile-picture').on('click', function (ev) {
      var $this = $(this);
      $this.addClass('is-loading');
      $uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'viewport'
      }).then(function (resp) {
        popupResult({
          src: resp
        });
      });
    });
    $('#profile-upload-reset').on('click', function () {
      $(this).addClass('is-hidden');
      $('.profile-uploader-box, .upload-demo-wrap').toggleClass('is-hidden');
      $('#submit-profile-picture').addClass('is-disabled');
      $('#upload-profile-picture').val('');
    });
  } //Nested photos


  $('.close-nested-photos').on('click', function () {
    $('.album-image-grid').addClass('is-hidden');
    $('.albums-grid').removeClass('is-hidden');
  });
  $('.user-photos-modal .grid-image input').on('change', function () {
    $(this).closest('.modal').find('.replace-button').removeClass('is-disabled');
  }); //Profile Timeline specific functions (profile-main.html)

  if ($('#profile-main, #pages-main').length) {
    //Init post comments
    initPostComments(); //Star friends widget

    $('.star-friend').on('click', function () {
      $(this).toggleClass('is-active');
    });
  } //Profile about specific functions (profile-about.html)


  if ($('#profile-about').length) {
    //Vertical tabs
    $('.left-menu .menu-item').on('click', function () {
      var targetContent = $(this).attr('data-content');
      $('.left-menu .menu-item').removeClass('is-active');
      $(this).addClass('is-active');
      $('.content-section').removeClass('is-active');
      $('#' + targetContent).addClass('is-active');

      if (targetContent == 'education-content' || targetContent == 'job-content') {
        //Init Glider
        initAboutGlider();
      }
    }); //Mini like button

    $('.small-like .inner').on('click', function () {
      $(this).closest('.small-like').toggleClass('is-active');
    }); //Modal videos

    $(".video-list .video-wrapper .video-button").modalVideo();
  } //Profile photos specific functions (profile-photos.html)


  if ($('#profile-photos, #pages-photos').length) {
    //Like a photo
    $('.photo-like').on('click', function () {
      if ($(this).hasClass('is-liked')) {
        $(this).find('svg').removeClass('gelatine');
      } else {
        $(this).find('svg').addClass('gelatine');
      }

      $(this).toggleClass('is-liked');
    }); //Open photo lightbox

    $('.image-grid .image-row > div .overlay').on('click', function () {
      var $this = $(this);
      var imageSrc = $this.closest('.image-row > div').attr('data-background');
      var avatarSrc = $this.siblings('.image-owner').find('img').attr('src');
      var userName = $this.siblings('.image-owner').find('.name').text();
      var timeStamp = $this.siblings('.photo-time').text();
      $('#lightbox-image').attr('src', imageSrc);
      $('#lightbox-avatar').attr('src', avatarSrc);
      $('#lightbox-username').html(userName);
      $('#lightbox-time').html(timeStamp);
      $('.custom-profile-lightbox').addClass('is-active'); //Simulate loading

      setTimeout(function () {
        $('.custom-profile-lightbox').find('.image-loader, .comments-loader').removeClass('is-active');
      }, 1000);
    }); //Close photo lightbox

    $('.custom-profile-lightbox .close-lightbox').on('click', function () {
      $('.custom-profile-lightbox').removeClass('is-active');
      setTimeout(function () {
        $('.custom-profile-lightbox').find('.image-loader, .comments-loader').addClass('is-active');
      }, 500);
    });
  }
});