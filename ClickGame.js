var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var circX, circY; // center coordinates for the circle
var clickX, clickY; // coordinates of the user click event
const TARGET_RAD = 20; // radius of the target circle

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var numTargetLeft = 10;  // number of targets the user needs to hit
var targetLeftText = document.getElementById("targetsLeft");

var startTime;
var endTime;
var timeTextSec = document.getElementById("timeSec");
var timeTextMilliSec = document.getElementById("timeMilliSec");


var start = false;  // has the game started?


targetLeftText.innerHTML = numTargetLeft;


// this code generates the first circle
// TODO sometimes the circle is generated outside of canvas, need to fix
circX = Math.floor((Math.random() * canvas.width - (2 * TARGET_RAD)) + TARGET_RAD);
circY = Math.floor((Math.random() * canvas.height - (2 * TARGET_RAD)) + TARGET_RAD);
context.beginPath();
context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
context.fillStyle = "#FF0000";
context.fill();
context.stroke();


console.log("About to start");
// listening for user click
canvas.addEventListener('click', function(event){
  clickEvent(event);
}, false);






// main game logic
function clickEvent(event){
  if (start == false){  // if the game has not started, start it
    start = true;
    startTime = Date.now();
    console.log("Started");
  }
  // because of how onclick works this has to be 1. stop the game once user has clicked all targets
  if (numTargetLeft == 1){
    endTime = Date.now();
    var gameTime = endTime - startTime;

    timeTextSec.innerHTML = Math.floor(gameTime / 1000);  // display seconds
    timeTextMilliSec.innerHTML = gameTime % 1000; // display milliseconds
    document.getElementById("timePeriod").removeAttribute("hidden");
    document.getElementById("timeUnits").removeAttribute("hidden");

    // TODO this is not working, how to remove listener once game is done???
    context.clearRect(0,0,canvas.width,canvas.height);
    this.removeEventListener('click', function(event){}, false);
  }

  console.log("In click event")

  clickX = event.pageX - canvasLeft;
  clickY = event.pageY - canvasTop;

  if (Math.pow((clickX - circX), 2) + Math.pow((clickY - circY), 2) <= 400 ){

    numTargetLeft--;

    targetLeftText.innerHTML = numTargetLeft;

    context.clearRect(0,0,canvas.width,canvas.height);

    circX = Math.floor((Math.random() * canvas.width - (2 * TARGET_RAD)) + TARGET_RAD);
    circY = Math.floor((Math.random() * canvas.height - (2 * TARGET_RAD)) + TARGET_RAD);

    context.beginPath();
    context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
    context.fillStyle = "#FF0000";
    context.fill();
    context.stroke();

  }

}
