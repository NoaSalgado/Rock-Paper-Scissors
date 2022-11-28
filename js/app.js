const startScreen = document.querySelector(".start");
const gameScreen = document.querySelector(".game");
const startBtn = document.querySelector(".start__btn");
const restartBtn = document.querySelector(".game__header button");
const selectedWeaponsIcons = document.querySelectorAll(".game__round img");
const scoreSpans = document.querySelectorAll(".game__round span");
const roundResultContainer = document.querySelector(".game__round--result");
const weaponsBtns = document.querySelectorAll(".game__weapons--btns button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const playAgainBtn = document.querySelector(".new-game-btn");
const exitGameBtn = document.querySelector(".exit-btn");

const computerChoices = ["rock", "paper", "scissors"];
let playerScore;
let computerScore;

const startGame = () => {
  selectedWeaponsIcons.forEach((icon) => {
    icon.src = "../img/none.svg";
  });

  scoreSpans.forEach((span) => {
    span.textContent = "0";
  });

  roundResultContainer.textContent = "START!!";
  playerScore = 0;
  computerScore = 0;
};

const getComputerChooice = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  return computerChoices[randomIndex];
};

const playRound = (playerSelection, computerSelection) => {
  let message;
  if (playerSelection === computerSelection) {
    message = "It´s a tie!";
  } else if (playerSelection === "rock") {
    if (computerSelection === "paper") {
      message = "You loose!! <span>Paper beats rock</span>";
      computerScore++;
    } else if (computerSelection === "scissors") {
      message = "You win!! <span>Rock beats scissors</span>";
      playerScore++;
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      message = "You  win!! <span>Paper beats rock</span>";
      playerScore++;
    } else if (computerSelection === "scissors") {
      message = "You loose!! <span>Scissors beat paper</span>";
      computerScore++;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      message = "You win!! <span>Scissors beat paper</span>";
      playerScore++;
    } else if (computerSelection === "rock") {
      message = "You loose!! <span>Rock beats scissors</span>";
      computerScore++;
    }
  }

  updateRound(
    playerSelection,
    computerSelection,
    message,
    playerScore,
    computerScore
  );

  getWinner(playerScore, computerScore);
};

const updateRound = (
  playerSelection,
  computerSelection,
  message,
  playerScore,
  computerScore
) => {
  selectedWeaponsIcons[0].src = `../img/${playerSelection}.svg`;
  selectedWeaponsIcons[1].src = `../img/${computerSelection}.svg`;
  roundResultContainer.innerHTML = message;
  scoreSpans[0].textContent = playerScore;
  scoreSpans[1].textContent = computerScore;
};

getWinner = (playerScore, computerScore) => {
  let winnerText;
  if (playerScore < 5 && computerScore < 5) {
    return;
  }

  if (playerScore === 5) {
    winnerText = "You are the winner!! 🏆";
  } else {
    winnerText = "You loose... 🥹";
  }

  showModal(winnerText);
};

const hideModal = () => {
  overlay.classList.remove("display");
  modal.classList.remove("display");
};

const showModal = (text) => {
  overlay.classList.add("display");
  modal.classList.add("display");
  modal.querySelector(".modal__text").textContent = text;
};

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.add("display");

  startGame();
});

restartBtn.addEventListener("click", () => {
  startGame();
});

playAgainBtn.addEventListener("click", () => {
  hideModal();
  startGame();
});

exitGameBtn.addEventListener("click", () => {
  hideModal();
  startScreen.classList.remove("hidden");
  gameScreen.classList.remove("display");
});

weaponsBtns.forEach((weaponsBtn) => {
  weaponsBtn.addEventListener("click", (e) => {
    const playerSelection = e.target.id;
    const computerSelection = getComputerChooice();
    playRound(playerSelection, computerSelection);
  });
});
