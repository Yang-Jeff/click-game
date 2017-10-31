// HACK is there better way to do this than with jquery???

$.getJSON('./highscores', function(data){

  for (var i = 0; i < data.length; i++){

    var para = document.createElement("p");
    para.className = 'high_score';

    var name = document.createElement("span");
    name.setAttribute('class', 'high_score_name');
    name.innerHTML = data[i].Name;

    var score = document.createElement("span");
    score.setAttribute('class', 'high_score_score');
    score.innerHTML = data[i].Score + " seconds";

    para.appendChild(name);
    para.appendChild(score);

    var element = document.getElementById("heading");
    element.appendChild(para);

    console.log(JSON.stringify(data[i]));
  }


});
