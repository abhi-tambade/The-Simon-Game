var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0, started = false;

document.addEventListener("keydown", function(event) {
    if (!started) {
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
})

for (var i=0; i<buttonColors.length; i++) {
    $(".btn")[i].addEventListener("click", function () {
        var btnColor = this.id;
        userPattern.push(btnColor);
        buttonSound(btnColor);
        animateButton(btnColor);
        
        checkSequence(userPattern.length - 1);
    })
}

function nextSequence () {
    var randomNum = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    buttonSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    level = level + 1;
    $("h1").html("Level " + level);

    userPattern = [];
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

function animateButton(currentColor) {
    document.querySelector("#" + currentColor).classList.add("pressed");
    setTimeout(function() {
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100)
}

function checkSequence (currentLevel) {
    if (userPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }   
    }
    else {
        console.log("failure");

        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }   
}

function buttonSound (btnColor) {
    switch(btnColor) {
        case "red": 
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;

        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;

        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;

        default:
            break;
    }
}

