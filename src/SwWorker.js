// var timerStart = true;

// function myTimer(d0) {
//   // get current time
//   var d = new Date().valueOf();
//   // calculate time difference between now and initial time
//   var diff = d - d0;
//   // calculate number of minutes
//   var minutes = Math.floor(diff / 1000 / 60);
//   // calculate number of seconds
//   var seconds = Math.floor(diff / 1000) - minutes * 60;
//   var myVar = null;
//   // if number of minutes less than 10, add a leading "0"
//   minutes = minutes.toString();
//   if (minutes.length === 1) {
//     minutes = "0" + minutes;
//   }
//   // if number of seconds less than 10, add a leading "0"
//   seconds = seconds.toString();
//   if (seconds.length === 1) {
//     seconds = "0" + seconds;
//   }

//   // return output to Web Worker
//   postMessage(minutes + ":" + seconds);
// }

// if (timerStart) {
//   // get current time
//   var d0 = new Date().valueOf();
//   // repeat myTimer(d0) every 100 ms
//   myVar = setInterval(function () {
//     myTimer(d0);
//   }, 100);
//   // timer should not start anymore since it has been started
//   timerStart = false;
// }
