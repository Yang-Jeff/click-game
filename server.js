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
  console.log("New POST request");

  console.log("Name: " + request.body.Name + " Time: " + request.body.Score);
  db.run("INSERT INTO Scores (Name, Score) VALUES (?,? )", [request.body.Name,request.body.Score]);
});

// this retrieves the high scores
app.get('/highscores', function(request, response){
  db.all("SELECT * FROM Scores ORDER BY Score ASC", function(err, rows){

    console.log("GET request for scores");
    response.send(rows);
  });
});
