// Memory Game Logic
const board = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const icons = ["🍎","🍌","🍇","🍓","🍒","🍍","🥝","🍉"];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
  board.innerHTML = "";
  matchedPairs = 0;
  flippedCards = [];

  const gameIcons = shuffle([...icons, ...icons]); // duplicate for pairs

  gameIcons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${icon}</div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, icon));
    board.appendChild(card);
  });
}

// Flip card
function flipCard(card, icon) {
  if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push({ card, icon });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check match
function checkMatch() {
  const [first, second] = flippedCards;
  if (first.icon === second.icon) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === icons.length) {
      setTimeout(() => alert("🎉 You won!"), 500);
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", createBoard);

// Init
createBoard();
