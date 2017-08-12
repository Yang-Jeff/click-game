var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var circX, circY; // center coordinates for the circle
var clickX, clickY;

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;


var score = 0;
var scoreText = document.getElementById("score");




// run this code once first
circX = Math.floor((Math.random() * 560) + 20);
circY = Math.floor((Math.random() * 360) + 20);

context.beginPath();
context.arc(circX,circY,20,0,2*Math.PI);
context.fillStyle = "#FF0000";
context.fill();
context.stroke();


canvas.addEventListener('click', function(event){

  clickX = event.pageX - canvasLeft;
  clickY = event.pageY - canvasTop;

  if (Math.pow((clickX - circX), 2) + Math.pow((clickY - circY), 2) <= 400 ){
    score++;

    scoreText.innerHTML =  score;

    context.clearRect(0,0,canvas.width,canvas.height);

    circX = Math.floor((Math.random() * 560) + 20);
    circY = Math.floor((Math.random() * 360) + 20);

    context.beginPath();
    context.arc(circX,circY,20,0,2*Math.PI);
    context.fillStyle = "#FF0000";
    context.fill();
    context.stroke();
  }

}, false);
