// declare variables
var score = 0;
var questionIndex = 0;

var timer = document.getElementById("quizStart");
var currentTime = document.getElementById("currentTime");
var questionBank = document.getElementById("questionBank");
var wrapper = document.getElementById("wrapper");
var newUl = document.createElement("ul");

// timer elements

var timeRemaining = 76;
var holdInterval = 0;
var penalty = 10;

// create timer and listen to button 
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeRemaining--;
            currentTime.textContent = "Time Remaining: " + timeRemaining;

            if (timeRemaining === 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Pencils Down!";
            }
        }, 1000);
    }
    render(questionIndex);

});

