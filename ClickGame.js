var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var circX, circY; // center coordinates for the circle
var clickX, clickY; // coordinates of the user click event
const TARGET_RAD = 20; // radius of the target circle
const TOTAL_TARGETS = 10

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var numTargetLeft = TOTAL_TARGETS;  // number of targets the user needs to hit
var targetLeftText = document.getElementById("targetsLeft");

var startTime;
var endTime;

var gameStart = false;  // has the game started?

targetLeftText.innerHTML = numTargetLeft;

// draw start button
drawStartButton();

console.log("About to start");
// listening for user click
canvas.addEventListener('click', function(event){
  clickEvent(event);
}, false);





// functions below

// main game logic
function clickEvent(event){

  clickX = event.pageX - canvasLeft;
  clickY = event.pageY - canvasTop;

  if (gameStart == false){  // if the game has not started, start it

    if (clickX >= canvas.width/2 - 50 && clickX <= canvas.width/2 + 50 && clickY >= canvas.height/2 - 35 && clickY <= canvas.height/2 + 15){
      context.clearRect(0,0,canvas.width,canvas.height);
      gameStart = true;
      gameEnd = false;
      startTime = Date.now();
      console.log("Started");

      drawCircleTarget();

      targetLeftText.innerHTML = numTargetLeft;
    }

  }
  // because of how onclick works this has to be 1. stop the game once user has clicked all targets
  if (numTargetLeft == 1){

    console.log("Game end");
    // TODO why is final circle not cleared
    context.clearRect(0,0,canvas.width,canvas.height);
    targetLeftText.innerHTML = 0;

    endTime = Date.now();
    var gameTime = endTime - startTime;

    // reset game values
    gameStart = false;
    numTargetLeft = TOTAL_TARGETS;

    // display time taken
    context.font = "30px Helvetica Neue";
    context.textAlign = "center";
    context.fillStyle = "#212121";
    context.fillText("Your time is: " + Math.floor(gameTime/1000) + "." + gameTime%1000 + " seconds",
        canvas.width/2, canvas.height/2 - 100);

    drawStartButton();
  }


  if ( gameStart == true && Math.pow((clickX - circX), 2) + Math.pow((clickY - circY), 2) <= 400 ){

    numTargetLeft--;
    targetLeftText.innerHTML = numTargetLeft;

    context.clearRect(0,0,canvas.width,canvas.height);

    drawCircleTarget();
  }

}

// this code draws the start button
function drawStartButton(){
  context.fillStyle = "#FF0000";
  context.rect(canvas.width/2 - 50, canvas.height/2 - 35, 100, 50);
  context.fill();
  context.stroke();

  context.fillStyle = "#212121";
  context.font = "30px Helvetica Neue";
  context.textAlign = "center";
  context.fillText("Start", canvas.width/2, canvas.height/2);
}

// this function draws a target circle at a random location
// TODO sometimes the circle is generated outside of canvas, need to fix
function drawCircleTarget(){
  circX = Math.floor((Math.random() * (canvas.width -  (2 * TARGET_RAD))) + TARGET_RAD);
  circY = Math.floor((Math.random() * (canvas.height - (2 * TARGET_RAD))) + TARGET_RAD);
  context.beginPath();
  context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
  context.fillStyle = "#FF0000";
  context.fill();
  context.stroke();
}
