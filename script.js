const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");

const playerOnePlusBtn = document.getElementById("playerOnePlus");
const playerTwoPlusBtn = document.getElementById("playerTwoPlus");
const playerOneMinusBtn = document.getElementById("playerOneMinus");
const playerTwoMinusBtn = document.getElementById("playerTwoMinus");

let gamesWonArr = [];
let gamesPlayedArr = [];

let isTiedGame = false;
let isMatchWon = false;

newMatch();

// EVENT LISTENERS

// Plus Button
playerOnePlusBtn.addEventListener("click", () =>
  plusBtn(playerOneScore, playerOneMinusBtn)
);
playerTwoPlusBtn.addEventListener("click", () =>
  plusBtn(playerTwoScore, playerTwoMinusBtn)
);

// Minus Button
playerOneMinusBtn.addEventListener("click", () =>
  minusBtn(playerOneScore, playerOneMinusBtn)
);
playerTwoMinusBtn.addEventListener("click", () =>
  minusBtn(playerTwoScore, playerTwoMinusBtn)
);

// Match Reset Button
document.getElementById("resetBtn").addEventListener("click", newMatch);

// FUNCTIONS

// Increment & Decrement Btns

function plusBtn(playerScore, playerMinusBtn) {
  let score = Number(playerScore.innerText) + 1;
  playerScore.innerText = score;
  playerMinusBtn.disabled = false;
  getGameStatus();
}

function minusBtn(playerScore, playerMinusBtn) {
  let score = Number(playerScore.innerText) - 1;
  playerScore.innerText = score;
  if (score === 0) {
    playerMinusBtn.disabled = true;
  }
  getGameStatus();
}

// Match

function getMatchStatus() {
  let playerOneTotalGamesWon = 0;
  let playerTwoTotalGamesWon = 0;

  if (gamesPlayedArr.length > 3) {
    for (let i = 0; i < gamesWonArr.length; i++) {
      if (gamesWonArr[i] === "playerOne") {
        playerOneTotalGamesWon += 1;
      } else {
        playerTwoTotalGamesWon += 1;
      }
    }
  }

  if (playerOneTotalGamesWon === 4) {
    playerOneScore.innerText = "w";
    playerTwoScore.innerText = "l";
    isMatchWon = true;
  } else if (playerTwoTotalGamesWon === 4) {
    playerOneScore.innerText = "L";
    playerTwoScore.innerText = "W";
    isMatchWon = true;
  }

  if (!isMatchWon) {
    setTimeout(() => {
      newGame();
      getGameStatus();
    }, 2000);
  } else {
    renderUnplayedGameColor();
    setTimeout(() => {
      document.getElementById("resetBtn").classList.add("reset-btn--highlight");
    }, 2000);
  }
}

function newMatch() {
  gamesPlayedArr = [];
  gamesWonArr = [];
  isMatchWon = false;
  document.getElementById("resetBtn").classList.remove("reset-btn--highlight");
  resetGameColor();
  newGame();
}

// Games

function getGameStatus() {
  let playerOneScoreCheck = Number(playerOneScore.innerText);
  let playerTwoScoreCheck = Number(playerTwoScore.innerText);

  let playerOneScoreMargin = playerOneScoreCheck - playerTwoScoreCheck;
  let playerTwoScoreMargin = playerTwoScoreCheck - playerOneScoreCheck;

  // Tied Game
  if (playerOneScoreCheck === 10 && playerTwoScoreCheck === 10) {
    isTiedGame = true;
  } else if (playerOneScoreCheck > 10 && playerOneScoreMargin < 2) {
    isTiedGame = true;
  } else if (playerTwoScoreCheck > 10 && playerTwoScoreMargin < 2) {
    isTiedGame = true;
  }

  // End Game
  if (isTiedGame) {
    if (playerOneScoreCheck > 10 && playerOneScoreMargin > 1) {
      isTiedGame = false;
      playerOneWinsGame();
    } else if (playerTwoScoreCheck > 10 && playerTwoScoreMargin > 1) {
      isTiedGame = false;
      playerTwoWinsGame();
    }
  } else if (playerOneScoreCheck > 10 || playerTwoScoreCheck > 10) {
    if (playerOneScoreCheck > 10 && playerOneScoreMargin > 1) {
      playerOneWinsGame();
    } else if (playerTwoScoreCheck > 10 && playerTwoScoreMargin > 1) {
      playerTwoWinsGame();
    }
  }
}

function playerOneWinsGame() {
  gamesWonArr.push("playerOne");
  renderWonGameColor("var(--clr-yellow-700)");
  endGame();
}

function playerTwoWinsGame() {
  gamesWonArr.push("playerTwo");
  renderWonGameColor("var(--clr-green-700)");
  endGame();
}

function endGame() {
  playerOnePlusBtn.disabled = true;
  playerTwoPlusBtn.disabled = true;
  playerOneMinusBtn.disabled = true;
  playerTwoMinusBtn.disabled = true;
  gamesPlayedArr.push("gamePlayed");
  getMatchStatus();
}

function newGame() {
  playerOneScore.innerText = 0;
  playerTwoScore.innerText = 0;
  playerOnePlusBtn.disabled = false;
  playerTwoPlusBtn.disabled = false;
  playerOneMinusBtn.disabled = true;
  playerTwoMinusBtn.disabled = true;
}

// Game Styles

function renderWonGameColor(color) {
  let currentGame = gamesPlayedArr.length + 1;
  if (currentGame === 1) {
    document.getElementById("gameOne").style.backgroundColor = color;
  } else if (currentGame === 2) {
    document.getElementById("gameTwo").style.backgroundColor = color;
  } else if (currentGame === 3) {
    document.getElementById("gameThree").style.backgroundColor = color;
  } else if (currentGame === 4) {
    document.getElementById("gameFour").style.backgroundColor = color;
  } else if (currentGame === 5) {
    document.getElementById("gameFive").style.backgroundColor = color;
  } else if (currentGame === 6) {
    document.getElementById("gameSix").style.backgroundColor = color;
  } else {
    document.getElementById("gameSeven").style.backgroundColor = color;
  }
}

function renderUnplayedGameColor() {
  let unplayedGames = gamesPlayedArr.length + 1;
  if (unplayedGames === 5) {
    document.getElementById("gameFive").style.backgroundColor =
      "var(--clr-neutral-300)";
    document.getElementById("gameSix").style.backgroundColor =
      "var(--clr-neutral-300)";
    document.getElementById("gameSeven").style.backgroundColor =
      "var(--clr-neutral-300)";
  } else if (unplayedGames === 6) {
    document.getElementById("gameSix").style.backgroundColor =
      "var(--clr-neutral-300)";
    document.getElementById("gameSeven").style.backgroundColor =
      "var(--clr-neutral-300)";
  } else if (unplayedGames === 7) {
    document.getElementById("gameSeven").style.backgroundColor =
      "var(--clr-neutral-300)";
  }
}

function resetGameColor() {
  document.getElementById("gameOne").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameTwo").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameThree").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameFour").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameFive").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameSix").style.backgroundColor =
    "var(--clr-neutral-200)";
  document.getElementById("gameSeven").style.backgroundColor =
    "var(--clr-neutral-200)";
}
