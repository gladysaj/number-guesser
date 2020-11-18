// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`);
    // Game over -won
    // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = "green";
    // // Set message
    // setMessage(`${winningNum} is correct! You win!`, "green");
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over! You lost! The correct number was ${winningNum}`
      );
      // Game over - lost
      // // Disable input
      // guessInput.disabled = true;
      // // Change border color
      // guessInput.style.borderColor = "green";
      // // Set message
      // setMessage(
      //   `Game Over! You lost! The correct number was ${winningNum}`,
      //   "red"
      // );
    } else {
      // Game continues - wrong answer

      // Change border color
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      // Tell users is the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color === "green" : color === "red";

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again ?
  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

// Get winning num
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
