/*! modal-uploader.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Uploader used in the create album modal
========================================================================== */
"use strict";

if ($('.modal-uploader').length) {
  Dropzone.autoDiscover = false; // Get the template HTML and remove it from the doument

  var previewNode = document.querySelector("#template");
  previewNode.id = "";
  var previewTemplate = previewNode.parentNode.innerHTML;
  previewNode.parentNode.removeChild(previewNode);
  var modalUploader = new Dropzone(document.body, {
    // Make the whole body a dropzone
    url: "https://www.cssninja.io/dropzone.php",
    // Set the url
    thumbnailWidth: 800,
    thumbnailHeight: 600,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoProcessQueue: true,
    autoQueue: true,
    // Make sure the files aren't queued until manually added
    previewsContainer: "#previews",
    // Define the container to display the previews
    clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.

  });
  modalUploader.on("addedfile", function (file) {
    //Get the file count
    var count = modalUploader.files.length; // Hookup the start button

    file.previewElement.querySelector(".start").onclick = function () {
      modalUploader.enqueueFile(file);
    }; //Set the new file count


    $('#modal-uploader-file-count').html(count);
  });
  modalUploader.on("removedfile", function (file) {
    //Get the file count
    var count = modalUploader.files.length; //Set the new file count

    $('#modal-uploader-file-count').html(count);
  }); // Update the total progress bar

  modalUploader.on("totaluploadprogress", function (progress) {
    document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
  });
  modalUploader.on("sending", function (file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1"; // And disable the start button

    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
  }); // Hide the total progress bar when nothing's uploading anymore

  modalUploader.on("queuecomplete", function (progress) {
    document.querySelector("#total-progress").style.opacity = "0";
  }); // Setup the buttons for all transfers
  // The "add files" button doesn't need to be setup because the config
  // `clickable` has already been specified.

  document.querySelector("#actions .start").onclick = function () {
    modalUploader.enqueueFiles(modalUploader.getFilesWithStatus(Dropzone.ADDED));
  };

  document.querySelector("#actions .cancel").onclick = function () {
    modalUploader.removeAllFiles(true);
  }; // Now fake the file upload


  var minSteps = 6,
      maxSteps = 60,
      timeBetweenSteps = 100,
      bytesPerStep = 100000;

  modalUploader.uploadFiles = function (files) {
    var self = this;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(function (file, totalSteps, step) {
          return function () {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            };
            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);

            if (file.upload.progress == 100) {
              file.status = Dropzone.SUCCESS;
              self.emit("success", file, 'success', null);
              self.emit("complete", file);
              self.processQueue();
            }
          };
        }(file, totalSteps, step), duration);
      }
    }
  };
}