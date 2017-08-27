const express = require('express');
const app = express();

var port = 3000;

app.listen(port, function(){
    console.log("Express app listening on port " + port);
});

// TODO add compression???
app.use(express.static('./public'));
