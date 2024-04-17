const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;

document.querySelector(".turns").textContent = turns;

//FETCH IMAGES FROM ARRAY IN DATA FOLDER

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

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
      <img class="front-image" src=${card.image} />
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

//submission handling
async function handleSubmit(event) {
  event.preventDefault();
  const username = event.target.username.value;
  console.log("username:$(username), turns:$(turns)");
  fetch("", {
    method: "POST",
    body: JSON.stringify({ username, turns }),
    headers: { "Content-Type": "application/json" },
  });
  form.reset();
}
//RESTART BUTTON

const button = document.getElementById("restart-button");
button.addEventListener("click", restart);
