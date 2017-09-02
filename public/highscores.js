// NOTE is there better way to do this than with jquery???

$.getJSON('./highscores', function(data){
  // TODO work with data
  for (var i = 0; i < data.length; i++){

    var para = document.createElement("p");
    var node = document.createTextNode(data[i].Name + " Time: " + data[i].Score);
    para.appendChild(node);
    var element = document.getElementById("heading");
    element.appendChild(para);



    console.log(data[i].toString());
  }


});
