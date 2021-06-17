const cards = document.querySelectorAll('.memory-card');
const message = document.getElementById('message');
const gethigh = document.getElementsByClassName("score");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countClick = 0;
let score = 0
function flipCard() {
  countClick++;
  score++;
  message.innerHTML=`<h1> Your  Current Score :  ${score}</h1>`;
  message.style.color="#fff"
  if(countClick <20){
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
  
      return;
    }
  
    secondCard = this;
   checkForMatch()
   
  }
  else{
   message.innerHTML="<h1>you lost the game</h1>"
   message.style.color="#fff"
  }
}

function checkForMatch() {
  
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
 
}

function disableCards() {
   score = score+100;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));