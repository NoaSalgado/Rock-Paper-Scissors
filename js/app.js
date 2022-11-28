const startScreen = document.querySelector(".start");
const gameScreen = document.querySelector(".game");
const startBtn = document.querySelector(".start__btn");
const selectedWeaponsIcons = document.querySelectorAll(".game__round img");
const scoreSpans = document.querySelectorAll(".game__round span");
const roundResultContainer = document.querySelector(".game__round--result");
const weaponsBtns = document.querySelectorAll(".game__weapons--btns button");
console.log(weaponsBtns);

const computerChoices = ["rock", "paper", "scissors"];
let playerScore;
let computerScore;

const startGame = () => {
  selectedWeaponsIcons.forEach((icon) => {
    icon.src = "../img/none.svg";
    console.log(icon);
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
    message = "No winner!";
  } else if (playerSelection === "rock") {
    if (computerSelection === "paper") {
      message = "You loose!! Paper beats rock!";
      computerScore++;
    } else if (computerSelection === "scissors") {
      message = "You win!! Rock beats scissors";
      playerScore++;
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      message = "You  win!! Paper beats rock";
      playerScore++;
    } else if (computerSelection === "scissors") {
      message = "You loose!! Scissors beat paper";
      computerScore++;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      message = "You win!! Scissors beat paper";
      playerScore++;
    } else if (computerSelection === "rock") {
      message = "You loose!! Rock beats scissors";
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
  roundResultContainer.textContent = message;
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

  console.log(winnerText);
};

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.add("display");

  startGame();
});

weaponsBtns.forEach((weaponsBtn) => {
  weaponsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target);
    const playerSelection = e.target.id;
    console.log(playerSelection);
    const computerSelection = getComputerChooice();
    playRound(playerSelection, computerSelection);
  });
});
