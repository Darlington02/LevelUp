window.addEventListener("load", init);

let time;
let score = 0;
let isPlaying;
let highScores = [];

let level = {
    beginner: 10,
    intermediate: 5,
    hacker: 3,
}

const seconds = document.querySelector("#seconds");
const wordInput = document.querySelector("#input-field");
const currentWord = document.querySelector("#current-word"); 
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const clearHighScores = document.querySelector("#clear-score");
const selectedLevel = document.querySelector(".select-level");

// toggle time based on selected level
selectedLevel.addEventListener("click", (event) => {
    button = event.target.id;
    time = level[button];
    seconds.innerHTML = time;
})


const words = ["David", "Veronica", "Blessed", "Department", "Goliath", "Software", "Docker", "Container", "Japan", "Antarctica", "Mayweather", "Venomous", "Endless", "University", "Berrylium", "Endorsed", "Breaking", "Limitless", "Myopia", "Mississippi", "Ignite", "Consume", "Devour", "Psychopath", "Generic", "Violence", "Heavenly", "Curiousity", "Vibrant"];

// initialize game on loading
function init(){
    displayWords(words);
    // start matching input words
    wordInput.addEventListener("input", startMatch);
    // countdown every second
    setInterval(countdown, 1000);
    // check game status
    setInterval(checkStatus, 50);
}

// Show random words
function displayWords(words){
    random = Math.floor(Math.random()* words.length);
    chosenWord = words[random];
    
    currentWord.innerHTML = chosenWord;
}

// countdown timer
function countdown(){
    if(time > 0){
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }

    timeDisplay.innerHTML = "Time Left: "+time;
}

// check game status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = "<b>Game Over!</b>";
        highScores.push(score);
        // localStorage.setItem("scores", JSON.stringify(highScores));
        score = 0;
    }
}


// begin matching
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = level[button];
        wordInput.value = "";
        displayWords(words);
        score++;
    }
    scoreDisplay.innerHTML = "score: "+score;
}

// match words with input to see if they match
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = "Correct!";
        return true;
    }
    else{
        message.innerHTML = "";
        return false;
    }
}

