// Global variables are usually a bad idea, but I think it's fine here
const moves = ["Rock", "Paper", "Scissors"];

// Returns a random move from an array of moves
function computerPlay() {
    return moves[Math.floor(Math.random() * moves.length)];
}

// Plays a round and returns a string with the result
function playRound() {
    let playerSelection = this.move;
    let computerSelection = computerPlay();

    // Changes playerSelection to proper form (e.g. "rOcK" => "Rock")
    playerSelection = playerSelection[0].toUpperCase() +
                      playerSelection.slice(1).toLowerCase();
    
    // console.log("PS: " + playerSelection);
    // console.log("CS: " + computerSelection);

    // Returns an error for an invalid move
    if (moves.indexOf(playerSelection) == -1) {
        return "Error: player move not valid";
    }
    
    if (
        playerSelection === "Rock" && computerSelection === "Scissors" ||
        playerSelection === "Paper" && computerSelection === "Rock" ||
        playerSelection === "Scissors" && computerSelection === "Paper"
    ) {
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }
    else if (
        playerSelection === "Rock" && computerSelection === "Paper" ||
        playerSelection === "Paper" && computerSelection === "Scissors" ||
        playerSelection === "Scissors" && computerSelection === "Rock"
    ) {
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
    else if (playerSelection === computerSelection) {
        return `It's a tie! You both picked ${playerSelection}.`;
    }
    else {
        return "Error: unknown outcome";
    }
}

// Main game loop
function game(targetScore = 5) {
    let scorePlayer = 0;
    let scoreComputer = 0;
    let outcome;
    while (scorePlayer < targetScore && scoreComputer < targetScore) {
        playerSelection = prompt("Please enter your move: ");
        outcome = playRound(playerSelection, computerPlay());
        console.log(outcome);
        
        // Maybe not the best way to check who won, but eh
        if (outcome.includes("win")) {
            scorePlayer++;
        }
        else if (outcome.includes("lose")) {
            scoreComputer++;
        }
    }

    // Write final results
    console.log("-".repeat(40));
    console.log("Your score: " + scorePlayer);
    console.log("Computer score: " + scoreComputer);
    if (scorePlayer > scoreComputer) {
        console.log("You win!")
    }
    else if (scorePlayer < scoreComputer) {
        console.log("You lose!");
    }
    else if (scorePlayer === scoreComputer) {
        console.log("It's a tie!");
    }
    else {
        console.log("Error: something weird happened");
    }
}

// game();

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
rockBtn.move = "Rock";
paperBtn.move = "Paper";
scissorsBtn.move = "Scissors";

rockBtn.addEventListener("click", playRound);
paperBtn.addEventListener("click", playRound);
scissorsBtn.addEventListener("click", playRound);