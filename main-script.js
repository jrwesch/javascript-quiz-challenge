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

// Render questions to page
function render(questionIndex) {
    questionBank.innerHTML = "";
    newUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionBank.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionBank.appendChild(newUl);
        newUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })

}

//array of questions 
var questions = [
    {
        title: "Which is the correct way to write a comment in JavaScript?",
        choices: ["'comment here...'", "<!-- Ha Ha! This is a comment! -->", "COMMENT: this is a comment", "// Duh..."],
        answer: "// Duh..."
    },
    {
        title: "Which event happens when an HTML element is clicked on?",
        choices: ["onsmash", "onselect", "onclick", "onlistenevent"],
        answer: "onclick"
    },
    {
        title: "How are arrays in Javascript declared?",
        choices: ["var pets = ('dog', 'cat', 'bird', 'lizard')", "var pets = ['dog', 'cat', 'bird', 'lizard']", "var pets = {'dog', 'cat', 'bird', 'lizard'}", "var pets = <'dog', 'cat', 'bird', 'lizard'>"],
        answer: "var pets = ['dog', 'cat', 'bird', 'lizard']"
    },
    {
        title: "Which parts of an HTML file can have JavaScript scripts added to them?",
        choices: ["The <body> section", "The <head> section", "Both the <body> and <head> sections", "JS scripts go in the CSS file"],
        answer: "Both the <body> and <head> sections"
    },
    {
        title: "How do you call a function named 'thisFunction'?",
        choices: ["call function thisFunction()", "thisFunction().call", "call.thisFunction()", "thisFunction()"],
        answer: "thisFunction()"
    },

];


// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            timeRemaining = timeRemaining - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // quiz complete will append last page with user stats
        quizComplete();
        createDiv.textContent = "You correctly answered  " + score + "/" + questions.length + " questions.";
    } else {
        render(questionIndex);
    }
    questionBank.appendChild(createDiv);

}
// Quiz Complete appends last page
function quizComplete() {
    questionBank.innerHTML = "";
    currentTime.innerHTML = "";

    // New heading for Quiz Complete
    var quizCompleteHeading = document.createElement("h1");
    quizCompleteHeading.setAttribute("id", "quizCompleteHeading");
    quizCompleteHeading.textContent = "Quiz Complete!"

    questionBank.appendChild(quizCompleteHeading);

    // New paragraph for displaying results
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionBank.appendChild(createP);

        // Calculates time remaining and replaces it with score
        if (timeRemaining >= 0) {
            var timeScore = timeRemaining;
            var createP2 = document.createElement("p");
            clearInterval(holdInterval);
            createP.textContent = "Your final score is: " + timeScore;

            questionBank.appendChild(createP2);
        }

        // Label for inputting initials 
        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your initials: ";

        questionBank.appendChild(createLabel);

        // input for initials
        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.setAttribute("id", "initials");
        createInput.textContent = "";

        questionBank.appendChild(createInput);

        // submit button
        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type", "submit");
        createSubmit.setAttribute("id", "Submit");
        createSubmit.textContent = "Submit";

        questionBank.appendChild(createSubmit);

// Event listener to capture initials and local storage for initials and score
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);

        // Sends to final page
        window.location.replace("./HighScores.html");
    }
});

}