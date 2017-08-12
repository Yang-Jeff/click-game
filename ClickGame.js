var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var circX, circY; // center coordinates for the circle
var clickX, clickY; // coordinates of the user click event
const TARGET_RAD = 20; // radius of the target circle

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;


var score = 0;
var scoreText = document.getElementById("score");




// this code generates the first circle
circX = Math.floor((Math.random() * canvas.width - (2 * TARGET_RAD)) + TARGET_RAD);
circY = Math.floor((Math.random() * canvas.height - (2 * TARGET_RAD)) + TARGET_RAD);
context.beginPath();
context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
context.fillStyle = "#FF0000";
context.fill();
context.stroke();

// listening for user click
canvas.addEventListener('click', function(event){

  clickX = event.pageX - canvasLeft;
  clickY = event.pageY - canvasTop;

  if (Math.pow((clickX - circX), 2) + Math.pow((clickY - circY), 2) <= 400 ){
    score++;

    scoreText.innerHTML =  score;

    context.clearRect(0,0,canvas.width,canvas.height);

    circX = Math.floor((Math.random() * canvas.width - (2 * TARGET_RAD)) + TARGET_RAD);
    circY = Math.floor((Math.random() * canvas.height - (2 * TARGET_RAD)) + TARGET_RAD);

    context.beginPath();
    context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
    context.fillStyle = "#FF0000";
    context.fill();
    context.stroke();
  }

}, false);
