function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = cards[i];
    cards[i] = cards[j];
    cards[j] = k;
  }
}

function timerSetup() {
  const timeFrom = new Date().getTime() + 90000;
  const timer = document.createElement("div");
  document.querySelector("header").appendChild(timer);
  const interval = setInterval(function () {
    const timeTo = new Date().getTime();
    const distance = timeFrom - timeTo;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const display = `Time: ${minutes} Seconds: ${seconds}`;
    timer.innerHTML = display;
    if (distance < 0) {
      clearInterval(interval);
      timer.innerHTML = "Time is UP!";
    }
  }, 1000);
}

function unflip(array) {
  array.forEach((card) => card.classList.remove("transform"));
}

const startButton = document.querySelector("#start-btn");
const container = document.getElementById("container");
let turns = 0;
fetch(
  "https://raw.githubusercontent.com/maxdron123/maxdron123.github.io/refs/heads/main/cards.json"
)
  .then((response) => response.json())
  .then((cards) =>
    startButton.addEventListener("click", function () {
      startButton.classList.toggle("hidden");
      timerSetup();
      shuffleCards(cards);
      const turnsContainer = document.getElementById("turn-counter");
      turnsContainer.innerHTML = "Turns:";
      const turnsNumber = document.createElement("p");
      turnsContainer.appendChild(turnsNumber);
      turnsNumber.innerHTML = turns;
      let flippedCards = [];

      cards.forEach((card) => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card";
        const cardInner = document.createElement("div");
        container.appendChild(cardContainer);
        cardInner.className = "card-inner";
        cardContainer.appendChild(cardInner);
        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        cardFront.innerHTML = `<img class="image-cover" src="images/card-back.png">`;
        cardInner.appendChild(cardFront);
        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        cardBack.innerHTML = `<img class="image-fit" src="${card.img}">`;
        cardBack.classList.add("transform");
        cardInner.appendChild(cardBack);
        let cardFlip = false;

        function flipCard() {
          cardInner.classList.toggle("transform");
          cardFlip = !cardFlip;
          flippedCards.push(cardInner);
          console.log(cardInner);
        }

        cardContainer.addEventListener("click", function () {
          flipCard();
          if (
            cardInner.classList.contains("transform") &&
            flippedCards.length <= 2
          ) {
            turns += 1;
          }
          turnsNumber.innerHTML = turns;
          console.log(flippedCards);
          if (cardFlip) {
            let timeout = setTimeout(function () {
              unflip(flippedCards);
              flippedCards = [];
            }, 2000);
            while (timeout--) {
              window.clearTimeout(timeout);
            }
          }
          if (flippedCards.length === 3) {
            unflip(flippedCards);
            flippedCards = [];
          }
        });
      });
    })
  );
