// Create a Div for Score Board
var newDiv = document.createElement("div")
newDiv.setAttribute("id", "highScoreBoard");
document.body.appendChild(newDiv);
var header = document.createElement("h1");
header.innerHTML="High Score Board";
newDiv.appendChild(header);

// Get score from local memory
var score = JSON.parse(localStorage.getItem("score"));

//create Div for showing local memory scores
var scoreDiv = document.createElement("div");
scoreDiv.setAttribute("id", "scoreBoard");
scoreDiv.innerHTML = "Inital " +score.inital +" Score of " +score.score;
newDiv.appendChild(scoreDiv)


