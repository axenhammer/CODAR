/*! go-live.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Live video functions
========================================================================== */
"use strict"; //Get user media

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var video;
var webcamStream;
var audioStream;
var startButton = document.getElementById('start-stream');
var stopButton = document.getElementById('stop-stream');
var liveIndicator = document.getElementById('live-indicator');

function startWebcam() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia( // constraints
    {
      video: true,
      audio: false
    }, // successCallback
    function (localMediaStream) {
      video = document.querySelector('video');

      try {
        video.srcObject = localMediaStream;
      } catch (error) {
        video.src = window.URL.createObjectURL(localMediaStream);
      }

      webcamStream = localMediaStream.getTracks()[0];
      audioStream = localMediaStream.getTracks()[1];
    }, // errorCallback
    function (err) {
      console.log("The following error occured: " + err);
    });
    startButton.classList.toggle('is-hidden');
    stopButton.classList.toggle('is-hidden');
    liveIndicator.classList.toggle('is-vhidden');
  } else {
    console.log("getUserMedia not supported");
  }
}

function stopWebcam() {
  webcamStream.stop();
  stopButton.classList.toggle('is-hidden');
  startButton.classList.toggle('is-hidden');
  liveIndicator.classList.toggle('is-vhidden');
} //Take snapshot
//var canvas, ctx;
// Get the canvas and obtain a context for
// drawing in it

/*canvas = document.getElementById("myCanvas");
ctx = canvas.getContext('2d');*/

/*function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0,0, canvas.width, canvas.height);
}*/