const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var port = 3000;

var sqlite3 = require('sqlite3').verbose(); // why verbose
var db = new sqlite3.Database('Scores.db');

app.use(bodyParser.json());

/*
, sqlite3.OPEN_CREATE,// TODO idk about OPEN_CREATE here
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Database connected");
  }
);
*/
// TODO make sure scores table is here and ready to go




app.listen(port, function(){
    console.log("Express app listening on port " + port);
});

// TODO add compression???
app.use(express.static('./public'));  // this sends clientside files

// TODO post scores
// FIXME Never worked in the first place
app.post('/scores', function(request, response){
  console.log(request.body);
  var userName = request.body.Name;
  var userScore = request.body.Score;
  console.log(userName + " USER TIME " + userScore + " YO THIS WORK???");

  db.run("INSERT INTO Scores (Name, Score) VALUES (?,? )", [userName,userScore]); /*function(err){
    console.log ("Oh no, an error!!!!!!!");
    console.log(err.message);

  });*/
  console.log("IT WORKED????");
});


// this retrieves the high scores
app.get('/highscores', function(request, response){
  db.all("SELECT * FROM Scores ORDER BY Score ASC", function(err, rows){

    console.log("GET request for scores");
    response.send(rows);
  });
});
