const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var port = 3000;

var sqlite3 = require('sqlite3').verbose(); // why verbose
var db = new sqlite3.Database('Scores.db');

app.use(bodyParser.json());




app.listen(port, function(){
    console.log("Express app listening on port " + port);
});

// TODO add compression???
app.use(express.static('./public'));  // this sends clientside files


app.post('/scores', function(request, response){
  console.log(request.body);
  var userName = request.body.Name;
  var userScore = request.body.Score;
  console.log(userName + " USER TIME " + userScore + " YO THIS WORK???");

  db.run("INSERT INTO Scores (Name, Score) VALUES (?,? )", [userName,userScore]);

  console.log("IT WORKED????");
});


// this retrieves the high scores
app.get('/highscores', function(request, response){
  db.all("SELECT * FROM Scores ORDER BY Score ASC", function(err, rows){

    console.log("GET request for scores");
    response.send(rows);
  });
});
