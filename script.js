let cards = [
  { id: 1, name: "Card 1", img: "images/clown.png" },
  { id: 2, name: "Card 2", img: "images/heart.png" },
  { id: 3, name: "Card 3", img: "images/knight.png" },
  { id: 4, name: "Card 4", img: "images/pie.png" },
  { id: 5, name: "Card 5", img: "images/skull.png" },
  { id: 6, name: "Card 6", img: "images/smile.png" },
  { id: 7, name: "Card 7", img: "images/clown.png" },
  { id: 8, name: "Card 8", img: "images/heart.png" },
  { id: 9, name: "Card 9", img: "images/knight.png" },
  { id: 10, name: "Card 10", img: "images/pie.png" },
  { id: 11, name: "Card 11", img: "images/skull.png" },
  { id: 12, name: "Card 12", img: "images/smile.png" },
];

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = cards[i];
    cards[i] = cards[j];
    cards[j] = k;
  }
}

function timerSetup() {
  let timeFrom = new Date().getTime() + 90000;
  let timer = document.createElement("div");
  document.querySelector("header").appendChild(timer);
  let interval = setInterval(function () {
    let timeTo = new Date().getTime();
    let distance = timeFrom - timeTo;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let display = `Time: ${minutes} Seconds: ${seconds}`;
    timer.innerHTML = display;
    if (distance < 0) {
      clearInterval(interval);
      timer.innerHTML = "Time is UP!";
    }
  }, 1000);
}

const startButton = document.querySelector("#start-btn");
const container = document.getElementById("container");
let turns = 0;

startButton.addEventListener("click", function () {
  startButton.classList.toggle("hidden");
  timerSetup();
  shuffleCards(cards);
  let turnsContainer = document.getElementById("turn-counter");
  turnsContainer.innerHTML = "Turns:";
  let turnsNumber = document.createElement("p");
  turnsContainer.appendChild(turnsNumber);
  turnsNumber.innerHTML = `${turns}`;
  let flippedCards = [];
  console.log(flippedCards);

  cards.forEach((card) => {
    let cardContainer = document.createElement("div");
    cardContainer.className = "card";
    let cardInner = document.createElement("div");
    container.appendChild(cardContainer);
    cardInner.className = "card-inner";
    cardContainer.appendChild(cardInner);
    let cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.innerHTML = `<img class="image-cover" src="images/card-back.png">`;
    cardInner.appendChild(cardFront);
    let cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.innerHTML = `<img class="image-fit" src="${card.img}">`;
    cardBack.classList.add("transform");
    cardInner.appendChild(cardBack);
    let cardFlip = false;

    function flipCard() {
      cardInner.classList.toggle("transform");
      cardFlip = !cardFlip;
      flippedCards.push(cardInner);
    }

    cardContainer.addEventListener("click", function () {
      flipCard();
      console.log(flippedCards);
      if (cardFlip) {
        setTimeout(function () {
          flippedCards.forEach((card) => card.classList.remove("transform"));
          flippedCards = [];
        }, 3000);
        turns += 1;
        turnsNumber.innerHTML = `${turns}`;
      }
      if (flippedCards.length >= 3) {
        flippedCards.forEach((card) => card.classList.remove("transform"));
        flippedCards = [];
      }
    });
  });
});
