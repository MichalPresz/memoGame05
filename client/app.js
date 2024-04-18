const gridContainer = document.querySelector(".grid-container");
const form = document.getElementById("gameForm");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;

//ARRAY OF CAT IMAGES

cards = [
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596854273338-cbf078ec7071?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516139008210-96e45dccd83b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat5",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580914960731-b824d9730556?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat6",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat7",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605450648855-63f9161b7ef7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat8",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596854273338-cbf078ec7071?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516139008210-96e45dccd83b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat5",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580914960731-b824d9730556?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat6",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "cat7",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605450648855-63f9161b7ef7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

//GENERATE CARDS FUNCTION / aria

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.setAttribute("role", "button");
    cardElement.setAttribute("aria-label", "unflipped card");
    cardElement.tabIndex = 0;
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
