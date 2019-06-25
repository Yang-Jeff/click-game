var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var circX, circY; // center coordinates for the circle
var clickX, clickY; // coordinates of the user click event
const TARGET_RAD = 20; // radius of the target circle
const TOTAL_TARGETS = 10;


var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var numTargetLeft = TOTAL_TARGETS;  // number of targets the user needs to hit
var targetLeftText = document.getElementById("targetsLeft");

var startTime;
var endTime;

var gameStart = false;  // is the game in progress?

targetLeftText.innerHTML = numTargetLeft;

// draw start button
drawStartButton();

console.log("About to start");
// listening for user click
canvas.addEventListener('mousedown', function(event){
  clickEvent(event);
}, false);


// functions below

// main game logic
function clickEvent(event){

  clickX = event.pageX - canvasLeft;
  clickY = event.pageY - canvasTop;

  if (gameStart == false){  // if the game has not started
    // if the user clicks the startbutton
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


  // when the user clicks a target
  if (Math.pow((clickX - circX), 2) + Math.pow((clickY - circY), 2) <= Math.pow(TARGET_RAD, 2) ){
    // when user clicks the last target, end the game
    if (numTargetLeft == 1){
      console.log("Game end");
      // TODO why is the final circle not cleared
      context.clearRect(0,0,canvas.width,canvas.height);

      targetLeftText.innerHTML = 0;

      endTime = Date.now();
      var gameTimeRaw = endTime - startTime;
      var gameTimeSeconds = gameTimeRaw / 1000.0;
      // reset game values
      gameStart = false;
      numTargetLeft = TOTAL_TARGETS;

      // display time taken
      context.font = "30px Helvetica Neue";
      context.textAlign = "center";
      context.fillStyle = "#212121";
      context.fillText("Your time is: " + gameTimeSeconds + " seconds", canvas.width/2, canvas.height/2 - 100);

      drawStartButton();
      recordScore(gameTimeSeconds);

    }

    // if game is in progress
    if (gameStart == true){
      numTargetLeft--;
      targetLeftText.innerHTML = numTargetLeft;

      context.clearRect(0,0,canvas.width,canvas.height);
      drawCircleTarget();
    }

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
function drawCircleTarget(){
  console.log("drawing circle!!!");
  circX = Math.floor((Math.random() * (canvas.width -  (2 * TARGET_RAD))) + TARGET_RAD);
  circY = Math.floor((Math.random() * (canvas.height - (2 * TARGET_RAD))) + TARGET_RAD);
  context.beginPath();
  context.arc(circX,circY,TARGET_RAD,0,2*Math.PI);
  context.fillStyle = "#FF0000";
  context.fill();
  context.stroke();
}

function recordScore(score){
  // if user has not already entered their name

  var name = window.prompt("Your time is " + score + " seconds. Please enter your name to record your score");
  if (name != null){


    var scoreObj = new Object();
    scoreObj.Name = name;
    scoreObj.Score = score;
    var scoreJSONString = JSON.stringify(scoreObj);

    console.log(scoreJSONString);

    try{
      //NOTE why doesn't this work
      // $.post("./scores", scoreJSONString);

      $.ajax({
        type: 'POST',
        url: './scores',
        data: scoreJSONString,
        success: function(data) { alert('data: ' + data); },
        contentType: "application/json",
        dataType: 'json'
      });

    }
    catch(err){

    }
  }

}
