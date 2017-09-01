const express = require('express');
const app = express();

var port = 3000;

var sqlite3 = require('sqlite3').verbose(); // why verbose
var db = new sqlite3.Database('Scores.db');

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

// TODO change score name?
// this posts new score to server
app.post('/score', function(request, response){
  db.run("INSERT INTO ")
});

// this retrieves the high scores
app.get('/highscores', function(request, response){
  db.all("SELECT * FROM Scores", function(err, rows){

    console.log("GET request for scores");
    response.send(rows);
  });
})
