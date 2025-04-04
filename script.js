function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = cards[i];
    cards[i] = cards[j];
    cards[j] = k;
  }
}

async function removeFromPull(index, array1) {
  await array1.splice(index, 1);
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

function doubleArray(array) {
  return array.concat(array);
}

const startButton = document.querySelector("#start-btn");
const container = document.getElementById("container");
let turns = 0;
let cardsPull = [];

async function startGame() {
  try {
    const request = await fetch(
      "https://raw.githubusercontent.com/maxdron123/maxdron123.github.io/refs/heads/main/cards.json"
    );
    const cards = await request.json();
    const doubledCards = doubleArray(cards);
    console.log(doubledCards);
    startButton.addEventListener("click", () => {
      startButton.classList.toggle("hidden");
      timerSetup();
      shuffleCards(doubledCards);
      const turnsContainer = document.getElementById("turn-counter");
      turnsContainer.innerHTML = "Turns:";
      const turnsNumber = document.createElement("p");
      turnsContainer.appendChild(turnsNumber);
      turnsNumber.innerHTML = turns;
      let flippedCards = [];
      doubledCards.forEach((card) => {
        cardsPull.push(card);
        console.log(cardsPull);
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
          console.log(flippedCards[0].innerHTML);
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
            }, 4000);
            while (timeout--) {
              window.clearTimeout(timeout);
            }
          }
          if (flippedCards.length === 3) {
            unflip(flippedCards);
            flippedCards = [];
          }

          if (flippedCards.length === 2) {
            if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
              cardsPull.forEach((card) => {
                if (
                  flippedCards[0].innerHTML.includes(card.img) &&
                  flippedCards[1].innerHTML.includes(card.img)
                ) {
                  removeFromPull(cardsPull.indexOf(card), cardsPull);
                  console.log(cardsPull);
                }
              });
              setTimeout(() => {
                flippedCards[0].style.display = "none";
                flippedCards[1].style.display = "none";
              }, 1000);
            }
          }
        });
      });
    });
  } catch (error) {
    console.log(`You have an error: ${error}`);
  }
}
startGame();
