var body = document.querySelector("body");//BODY SELECTED
var box = document.querySelectorAll(".box");//BOXES SELECTED
var header = document.querySelector("#main-title");//HEADER SELECTED
var levelP = document.querySelector("#score");
var buttonColours = ["red", "blue", "green", "yellow"];//DEFINED BUTTON COLORS
var gamePattern = [];//TO KEEPS RANDOM COLORS
var userClickedPattern = [];//TO KEEPS USERS COLORS

var level = 0; //DEFINED LEVEL(First is 0)
var started = true; //TO CONTROL KEYBOARD

var score = 0;

//TO START THE GAME
document.addEventListener("keydown", function () {
    if (started) {  //We just used it to start the game.
        //header.innerText = level;
        levelP.innerText = " ";
        nextSequence();
        started = false;
    }
});

//SHOWS THE NEXT RANDOM BUTTON
function nextSequence() {
    userClickedPattern = [];

    level++;

    header.innerText = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
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

//MOST IMPORTANT PLACE
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //CLICK UNTIL END BUTTON
        if (userClickedPattern.length === gamePattern.length) { //CLICK END BUTTON
            score++;
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

        levelP.innerText = "Your score is : " + score;
        header.innerText = "Game Over, Press Any Keyboard Key to Restart";
        startOver();
    }
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
    score = 0;
}
