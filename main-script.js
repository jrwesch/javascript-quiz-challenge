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

