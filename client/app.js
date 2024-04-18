const gridContainer = document.querySelector(".grid-container");
const form = document.getElementById("gameForm");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;

//ARRAY OF CAT IMAGES

cards = [
  {
    image: "./assets/cat1.webp",
    name: "cat",
  },
  {
    image: "./assets/cat2.webp",
    name: "cat2",
  },
  {
    image: "./assets/cat3.webp",
    name: "cat3",
  },
  {
    image: "./assets/cat4.webp",
    name: "cat4",
  },
  {
    image: "./assets/cat5.webp",
    name: "cat5",
  },
  {
    image: "./assets/cat6.webp",
    name: "cat6",
  },
  {
    image: "./assets/cat7.webp",
    name: "cat7",
  },
  {
    image: "./assets/cat8.webp",
    name: "cat8",
  },
  {
    image: "./assets/cat1.webp",
    name: "cat",
  },
  {
    image: "./assets/cat2.webp",
    name: "cat2",
  },
  {
    image: "./assets/cat3.webp",
    name: "cat3",
  },
  {
    image: "./assets/cat4.webp",
    name: "cat4",
  },
  {
    image: "./assets/cat5.webp",
    name: "cat5",
  },
  {
    image: "./assets/cat6.webp",
    name: "cat6",
  },
  {
    image: "./assets/cat7.webp",
    name: "cat7",
  },
  {
    image: "./assets/cat8.webp",
    name: "cat8",
  },
];

document.querySelector(".turns").textContent = turns;

//SHUFFLE CARDS FUNCTION

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

//GENERATE CARDS FUNCTION

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
    <div class="front">
      <img class="front-image" src=${card.image} alt="Cristiano Ronaldo"/>
    </div>
    <div class="back"></div>
  `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

//FLIP CARD FUNCTION

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  turns++;
  document.querySelector(".turns").textContent = turns;
  lockBoard = true;

  checkForMatch();
}

//CHECK FOR MATCH FUNCTION

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

//DISABLE CARD FUNCTION

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//UNFLIP CARD FUNCTION

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 500);
}

//RESET BOARD FUNCTION

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

//RESTART FUNCTION

function restart() {
  resetBoard();
  shuffleCards();
  turns = 0;
  document.querySelector(".turns").textContent = turns;
  gridContainer.innerHTML = "";
  generateCards();
}

//RESTART BUTTON

const button = document.getElementById("restart-button");
button.addEventListener("click", restart);

//RUN FUNCTIONS

shuffleCards();
generateCards();

//SUBMISSION HANDLING

async function handleSubmit(event) {
  event.preventDefault();
  const username = event.target.username.value;
  console.log(`username:${username}, turns:${turns}`);
  await fetch("https://memogame05.onrender.com/", {
    method: "POST",
    body: JSON.stringify({ username, turns }),
    headers: { "Content-Type": "application/json" },
  });
  event.target.reset();
  fetchGameResults();
}

//FETCH USERNAME AND TURNS
async function fetchGameResults() {
  const response = await fetch("https://memogame05.onrender.com/");
  const results = await response.json();
  const resultList = document.getElementById("messageList");
  resultList.innerHTML = "";
  results.forEach((result) => {
    const resultItem = document.createElement("li");
    resultItem.textContent = `username: ${result.username}, Turns:${result.turns}`;
    resultList.appendChild(resultItem);
  });
}
form.addEventListener("submit", handleSubmit);
window.addEventListener("load", fetchGameResults);
