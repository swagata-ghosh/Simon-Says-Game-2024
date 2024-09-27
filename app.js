let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0; // Variable to store the highest score

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score"); // Element to display the high score

// Load the high score from local storage if it exists
function loadHighScore() {
    let storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore, 10);
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game start");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndx = Math.floor(Math.random() * 4);
    let randcolour = btns[randIndx];
    let randbtn = document.querySelector(`.${randcolour}`);
    gameseq.push(randcolour);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update high score if necessary
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore); // Store the new high score
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    console.log("Btn pressed");
    let btn = this;
    userflash(btn);
    let userColour = btn.getAttribute("id");
    userseq.push(userColour);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// Initialize the high score display on page load
loadHighScore();
