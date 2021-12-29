// I don't know how to do this without these global vars, sorry
let scorePlayer = 0;
let scoreComputer = 0;
let scoreTarget = 5;

// Returns a random move from an array of moves
function computerPlay() {
    const moves = ["Rock", "Paper", "Scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

// Plays a round and calls other functions to update the page
function playRound() {
    const playerSelection = this.move;
    const computerSelection = computerPlay();
    
    // console.log("PS: " + playerSelection);
    // console.log("CS: " + computerSelection);

    updateLastMove(playerSelection, computerSelection);

    if (
        playerSelection === "Rock" && computerSelection === "Scissors" ||
        playerSelection === "Paper" && computerSelection === "Rock" ||
        playerSelection === "Scissors" && computerSelection === "Paper"
    ) {
        // Player won
        updateScore(1);
    }
    else if (
        playerSelection === "Rock" && computerSelection === "Paper" ||
        playerSelection === "Paper" && computerSelection === "Scissors" ||
        playerSelection === "Scissors" && computerSelection === "Rock"
    ) {
        // Computer won
        updateScore(-1);
    }
    else if (playerSelection === computerSelection) {
        // Tie
        updateScore(0); // Technically unnecessary
    }

    // Check if anyone won the tournament
    if (scorePlayer >= scoreTarget || scoreComputer >= scoreTarget) {
        finishGame();
    }
}

// Visually updates last move on screen
function updateLastMove(playerSelection, computerSelection) {
    const lastMovePlayer = document.querySelector(".last-move.human");
    const lastMoveComputer = document.querySelector(".last-move.computer");

    // There are probably better ways to do this
    switch(playerSelection) {
        case "Rock":
            lastMovePlayer.textContent = "🪨";
            break;
        case "Paper":
            lastMovePlayer.textContent = "🧾";
            break;
        case "Scissors":
            lastMovePlayer.textContent = "✂️";
    }
    switch(computerSelection) {
        case "Rock":
            lastMoveComputer.textContent = "🪨";
            break;
        case "Paper":
            lastMoveComputer.textContent = "🧾";
            break;
        case "Scissors":
            lastMoveComputer.textContent = "✂️";
    }
}

// Updates score visually and internally
// winner > 0  =>  player won
// winner = 0  =>  tie
// winner < 0  =>  computer won
function updateScore(winner) {
    const scoreElementPlayer = document.querySelector(".score.human");
    const scoreElementComputer = document.querySelector(".score.computer");

    if (winner > 0) {
        scorePlayer++;
        scoreElementPlayer.textContent = "Score: " + scorePlayer;
    }
    else if (winner < 0) {
        scoreComputer++;
        scoreElementComputer.textContent = "Score: " + scoreComputer;
    }
}

function updateGameLength() {
    if (scorePlayer > 0 || scoreComputer > 0) {
        if (confirm("Are you sure you wish to change game length? This will reset the current scores.")) {
            scoreTarget = this.value;
            resetGame();
        }
        else {
            // Reset the dropdown to previous value if canceled
            this.value = scoreTarget;
        }
    }
    else {
        scoreTarget = this.value;
    }
}

function finishGame() {
    if (scorePlayer > scoreComputer) {
        alert("You won!");
    }
    else if (scorePlayer < scoreComputer) {
        alert("You lost!");
    }
    resetGame();
}

function resetGame() {
    const lastMovePlayer = document.querySelector(".last-move.human");
    const lastMoveComputer = document.querySelector(".last-move.computer");
    const scoreElementPlayer = document.querySelector(".score.human");
    const scoreElementComputer = document.querySelector(".score.computer");

    lastMovePlayer.textContent = "?";
    lastMoveComputer.textContent = "?";
    scoreElementPlayer.textContent = "Score: 0";
    scoreElementComputer.textContent = "Score: 0";
    scorePlayer = 0;
    scoreComputer = 0;
}

// Main game loop
function game() {
    const rockBtn = document.querySelector("#rock");
    const paperBtn = document.querySelector("#paper");
    const scissorsBtn = document.querySelector("#scissors");
    const gameLength = document.querySelector("#game-length");
    rockBtn.move = "Rock";
    paperBtn.move = "Paper";
    scissorsBtn.move = "Scissors";
    
    rockBtn.addEventListener("click", playRound);
    paperBtn.addEventListener("click", playRound);
    scissorsBtn.addEventListener("click", playRound);

    gameLength.addEventListener("change", updateGameLength);
}

game();