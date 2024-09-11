const cardsArray = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  const shuffledCards = shuffle(cardsArray.slice());
  shuffledCards.forEach(cardValue => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = cardValue;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
if (lockBoard) return;
if (this === firstCard) return;

this.classList.add('flipped');
this.style.backgroundImage = 'none';  // 배경 이미지 제거
this.textContent = this.dataset.value;

if (!firstCard) {
  firstCard = this;
  return;
}

secondCard = this;
lockBoard = true;

checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    disableCards();
    resetBoard();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
setTimeout(() => {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  firstCard.style.backgroundImage = 'url("../images/character.jpg")';  // 배경 이미지 복원
  secondCard.style.backgroundImage = 'url("../images/character.jpg")';  // 배경 이미지 복원
  firstCard.textContent = '';
  secondCard.textContent = '';
  resetBoard();
}, 1500);
}


function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
});
