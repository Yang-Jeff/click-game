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

// TODO post scores
// FIXME Never worked in the first place 
app.post('/scores', function(request, response){
  db.run("INSERT INTO Scores VALUES ?", request.body)
  console.log("IT WORKED????");
});


// this retrieves the high scores
app.get('/highscores', function(request, response){
  db.all("SELECT * FROM Scores ORDER BY Score ASC", function(err, rows){

    console.log("GET request for scores");
    response.send(rows);
  });
})
