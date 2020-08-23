"use strict";

/*! signup.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Signup Process JS
========================================================================== */
Dropzone.autoDiscover = false;
$(document).ready(function () {
  "use strict";

  $('.progress-wrap .dot').on('click', function () {
    var $this = $(this);
    var stepValue = $this.attr('data-step');
    $this.closest('.progress-wrap').find('.bar').css('width', stepValue + '%');
    $this.siblings('.dot').removeClass('is-current');
    $this.addClass('is-active is-current');
    $this.prevAll('.dot').addClass('is-active');
    $this.nextAll('.dot').removeClass('is-active');
    $('.process-panel-wrap').removeClass('is-active');
    $('.step-title').removeClass('is-active');

    if (stepValue == '0') {
      $('#signup-panel-1, #step-title-1').addClass('is-active');
    } else if (stepValue == '25') {
      $('#signup-panel-2, #step-title-2').addClass('is-active');
    } else if (stepValue == '50') {
      $('#signup-panel-3, #step-title-3').addClass('is-active');
    } else if (stepValue == '75') {
      $('#signup-panel-4, #step-title-4').addClass('is-active');
    } else if (stepValue == '100') {
      $('#signup-panel-5, #step-title-5').addClass('is-active');
    }
  });
  $('.process-button').on('click', function () {
    var $this = $(this);
    var targetStepDot = $this.attr('data-step');
    $this.addClass('is-loading');
    setTimeout(function () {
      $this.removeClass('is-loading');
      $('#' + targetStepDot).trigger('click');
    }, 800);
  });
  var myDropzone = new Dropzone("#profile-pic-dz", {
    maxFilesize: 8,
    // MB
    acceptedFiles: ".jpeg,.jpg,.png",
    clickable: ".upload-button",
    init: function init() {
      this.on("error", function (file, message) {
        console.log(message);
        this.removeFile(file);
      });

      if (this.files[1] != null) {
        this.removeFile(this.files[0]);
      }

      ;
    },
    transformFile: function transformFile(file, done) {
      $('#crop-modal').addClass('is-active'); //pictures = [];
      // Create the image editor overlay

      var editor = document.createElement('div');
      editor.style.position = 'absolute';
      editor.style.left = 0;
      editor.style.right = 0;
      editor.style.top = 0;
      editor.style.bottom = 0;
      editor.style.zIndex = 9999;
      editor.style.backgroundColor = '#fff';
      document.getElementById('cropper-wrapper').appendChild(editor); // Create confirm button at the top left of the viewport

      var buttonConfirm = document.createElement('button');
      buttonConfirm.style.position = 'absolute';
      buttonConfirm.style.right = '10px';
      buttonConfirm.style.bottom = '10px';
      buttonConfirm.style.zIndex = 9999;
      buttonConfirm.textContent = 'Crop';
      buttonConfirm.classList.add('button');
      editor.appendChild(buttonConfirm);
      buttonConfirm.addEventListener('click', function () {
        // Get the canvas with image data from Cropper.js
        var canvas = cropper.getCroppedCanvas({
          width: 256,
          height: 256
        }); // Turn the canvas into a Blob (file object without a name)

        canvas.toBlob(function (blob) {
          // Create a new Dropzone file thumbnail
          myDropzone.createThumbnail(blob, myDropzone.options.thumbnailWidth, myDropzone.options.thumbnailHeight, myDropzone.options.thumbnailMethod, false, function (dataURL) {
            // Update the Dropzone file thumbnail
            myDropzone.emit('thumbnail', file, dataURL); // Return the file to Dropzone

            done(blob); //console.log(blob);
            //Display image preview

            var previewReader = new FileReader();

            previewReader.onload = function (event) {
              // event.target.result contains base64 encoded image
              $('#upload-preview').attr('src', blob.dataURL); //Show popover

              $('.picture-container').webuiPopover({
                title: '',
                content: 'Your photo is ready to be uploaded. Hit the "Save Changes" button to complete the upload process.',
                animation: 'pop',
                width: 300,
                style: 'inverse',
                placement: 'top',
                offsetTop: -16
              }).trigger('click'); //console.log('THIS IS THE BLOB', blob)
            };

            previewReader.readAsDataURL(file);
          });
          var reader = new FileReader();
          reader.addEventListener("loadend", function (event) {// put picture in a holding var

            /*pictures.push({
                binaryData: btoa(reader.result),
                filePath: file.name,
                seoFilename: file.name.substring(0, file.name.lastIndexOf(".")),
                titleAttribute: file.name,
                altAttribute: file.name,
                mimeType: file.type,
                isNew: true
            });*/
            // accept the file
            //done();
            //console.log('THIS IS THE RESULT', reader.result);
            //console.log('THIS IS THE ARRAY', pictures);
          }); //reader.readAsBinaryString(file);

          reader.readAsBinaryString(blob);
        }); // Remove the editor from the view

        document.getElementById('cropper-wrapper').removeChild(editor);
        document.getElementById('crop-modal').classList.remove('is-active');
      }); // Create an image node for Cropper.js

      var image = new Image();
      image.src = URL.createObjectURL(file);
      editor.appendChild(image); // Create Cropper.js

      var cropper = new Cropper(image, {
        aspectRatio: 1
      });
    }
  });
  $('#signup-finish').on('click', function () {
    var $this = $(this);
    var url = '/feed.html';
    $this.addClass('is-loading');
    setTimeout(function () {
      window.location = url;
    }, 800);
  });
});