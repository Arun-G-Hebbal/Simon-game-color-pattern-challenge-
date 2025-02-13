console.log("Game initialized...");

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const restartBtn = document.getElementById("restart-btn");

// Audio for buttons
const sounds = {
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

// Start game on keypress or restart button click
document.addEventListener("keypress", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        console.log("Game started");
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        restartBtn.style.display = "none";
        levelUp();
    }
}

function btnFlash(btn) {
    // Reset and play sound
    const sound = sounds[btn.classList[1]];
    sound.currentTime = 0;
    sound.play();

    // Flash button
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 400);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    userSeq = [];

    // Generate random button
    const randInx = Math.floor(Math.random() * 4);
    const randColor = btns[randInx];
    gameSeq.push(randColor);

    console.log("Game sequence:", gameSeq);

    // Flash buttons in sequence
    gameSeq.forEach((color, i) => {
        setTimeout(() => {
            const btn = document.querySelector(`.${color}`);
            btnFlash(btn);
        }, i * 600);
    });
}

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const clickedColor = this.classList[1];
        userSeq.push(clickedColor);
        btnFlash(this);
        console.log("User sequence:", userSeq);

        checkAnswer(userSeq.length - 1);
    });

    btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            this.click();
        }
    });
});

function checkAnswer(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Game Over!");
        h2.innerText = "Game Over! Press Any Key or Restart to Play Again";
        restartBtn.style.display = "inline-block";
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}
