var body = document.querySelector("body");//BODY SELECTED
var box = document.querySelectorAll(".box");//BOXES SELECTED
var header = document.querySelector("#main-title");//HEADER SELECTED
var startButton = document.querySelector('.start-button');
var scoreP = document.querySelector("#score");
var buttonColours = ["red", "blue", "green", "yellow"];//DEFINED BUTTON COLORS

var gamePattern = [];//TO KEEPS RANDOM COLORS
var userClickedPattern = [];//TO KEEPS USERS COLORS

var level = 1; //DEFINED LEVEL(First is 0)
var started = true; //TO CONTROL KEYBOARD

var score = 0;

//TO START THE GAME
startButton.addEventListener("click", function () {
    if (started) {  //We just used it to start the game.
        //header.innerText = level;
        scoreP.innerText = "Skorunuz : 0";
        nextSequence();
        started = false; //control keyboard
    }
});

//SHOWS THE NEXT RANDOM BUTTON
function nextSequence() {
    header.style.fontSize = "2.3rem";
    userClickedPattern = [];

    header.innerText = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4); //create random number among 0-3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); //ADDING RANDOM COLOR INTO gamePattern
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //ANIMATE RANDOM BOX
    playSound(randomChosenColour); //Send the color to the audio function
};

//CLICK BUTTONS
for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("click", function () { //$(".box").click(function(){
        var userChosenColour = this.id; //var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour); //userClickedPattern.push(userChosenColour);        
        
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);

    });
}

//check answers true or false
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //CLICK UNTIL END BUTTON
        if (userClickedPattern.length === gamePattern.length) { //CLICK END BUTTON
            level++;
            score++;
            scoreP.innerText = "Skorunuz : " + score;
            setTimeout(function () {
                nextSequence();
            }, 1100);
        }
    } else {
        playSound("wrong");
        body.classList.add("game-over");
        setTimeout(function () {
            body.classList.remove("game-over");
        }, 300);

        
        
        header.style.fontSize = "1.4rem";
        header.innerText = "Oyun Bitti! Yeniden Başlamak İçin Butona Dokunun";
        startOver();
    }
}

//Animate Button Press
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

//Play sound function
function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

//Start Again
function startOver() {
    level = 1;
    gamePattern = [];
    started = true;
    score = 0;
    
}
