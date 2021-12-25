// Global variables are usually a bad idea, but I think it's fine here
const moves = ["Rock", "Paper", "Scissors"];

// Returns a random move from an array of moves
function computerPlay() {
    return moves[Math.floor(Math.random() * moves.length)];
}

// Plays a round and returns a string with the result
function playRound(playerSelection, computerSelection) {
    // Changes playerSelection to proper form (e.g. "rOcK" => "Rock")
    playerSelection = playerSelection[0].toUpperCase() +
                      playerSelection.slice(1).toLowerCase();
    
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
        // console.log("PS: " + playerSelection);
        // console.log("CS: " + computerSelection);
        return "Error: unknown outcome";
    }
}

const playerSelection = "rock";
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection));