//created score tracker 
var scoreTracker = "View High Scores";
//create a link for highscore.html on leftDiv on header bar
leftDiv.innerHTML = scoreTracker.link("highScore.html"); 

// create timer that count down from 60 seconds
var seconds = 60;
var interval ;
// create a timer function that have input of seconds 
function counter() {
   interval = setInterval(function() {
       // time decrease every seconds
        seconds--;
        // write time to rightDiv
        rightDiv.innerHTML = "Timer " + seconds;

        // when timer hit 0 game over or is negative
        if(!seconds || Math.sign(seconds)=="-1"){
             clearInterval(interval); 
             alert("Game Over");
        }
   },1000)
}

// create score tracker
userscore = 0;
//check if button was clicked
$("button").on("click",function(){
    //if the button that was click has a class named "correct" increase score
    if($(this).hasClass("correct")){
        console.log("correct");
        userscore++;
        console.log(userscore)
    }
    //if not then decrease timer
    else{
        console.log("wrong");
        seconds =seconds-10;
    }
    // turn display off on the current div and the display on the next div only if div id is less than 5
    if((parseInt(this.parentNode.id)<5) && (seconds >= 0)){
        $("#" + parseInt(this.parentNode.id)).css("display","none");
        $("#" + (parseInt(this.parentNode.id) + 1)).css("display","block");
    }
    // if timer is less or equal to 0 turn on submit form and turn off question div
    else if(seconds <= 0 ){
        $("#submit").css("display","block");
        $("#" + parseInt(this.parentNode.id)).css("display","none");
        updateScore();
    }
})


// start counter
counter();

// submit user inital to score board by putting them into local storage
function updateScore(){
    $(".submit").on("click",function(){
        var initalInput= $(".form-control").val();
        var scoreInput = userscore;
        var score = {inital : initalInput, score : scoreInput};
        localStorage.setItem("score", JSON.stringify(score));
        console.log(score);
    })
}