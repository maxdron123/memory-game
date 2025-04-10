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
  const timeFrom = new Date().getTime() + 5000;
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

      // Create game over screen
      const gameoverScreen = document.createElement("div");
      gameoverScreen.className = "gameover-screen";

      const gameoverMessage = document.createElement("div");
      gameoverMessage.className = "gameover-message";
      gameoverMessage.textContent = "⏰ Time's Up! ⏰";

      const gameoverStats = document.createElement("div");
      gameoverStats.className = "win-stats";
      gameoverStats.textContent = `You completed ${pairsCount} pairs`;

      const restartBtn = document.createElement("button");
      restartBtn.className = "restart-btn";
      restartBtn.textContent = "Try Again";

      // Assemble game over screen
      gameoverScreen.appendChild(gameoverMessage);
      gameoverScreen.appendChild(gameoverStats);
      gameoverScreen.appendChild(restartBtn);
      document.body.appendChild(gameoverScreen);

      // Handle restart
      restartBtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }, 1000);
}

function unflip(array) {
  array.forEach((card) => card.classList.remove("transform"));
}

function doubleArray(array) {
  return array.concat(array);
}

function win(container, button, main) {
  // Create win screen elements
  const winScreen = document.createElement("div");
  winScreen.className = "win-screen";

  const winMessage = document.createElement("div");
  winMessage.className = "win-message";
  winMessage.textContent = "🎉 You Win! 🎉";

  const winStats = document.createElement("div");
  winStats.className = "win-stats";
  winStats.textContent = `Completed in ${turns} turns`;

  const restartBtn = document.createElement("button");
  restartBtn.className = "restart-btn";
  restartBtn.textContent = "Play Again";

  // Assemble win screen
  winScreen.appendChild(winMessage);
  winScreen.appendChild(winStats);
  winScreen.appendChild(restartBtn);
  document.body.appendChild(winScreen);

  // Handle restart
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

const main = document.querySelector(".main");
const startButton = document.querySelector("#start-btn");
const container = document.getElementById("container");
let turns = 0;
let pairsCount = 0;

async function startGame() {
  try {
    const request = await fetch(
      "https://raw.githubusercontent.com/maxdron123/maxdron123.github.io/refs/heads/main/cards.json"
    );
    if (request.ok) {
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
              if (window.flipTimeout) {
                clearTimeout(window.flipTimeout);
              }
              window.flipTimeout = setTimeout(function () {
                unflip(flippedCards);
                flippedCards = [];
              }, 2000);
            }
            if (flippedCards.length === 3) {
              unflip(flippedCards);
              flippedCards = [];
            }

            if (flippedCards.length === 2) {
              const [card1, card2] = flippedCards;
              if (card1 !== card2 && card1.innerHTML === card2.innerHTML) {
                pairsCount += 1;
                console.log(pairsCount);

                // Add matched class to trigger animation
                card1.parentElement.classList.add("matched");
                card2.parentElement.classList.add("matched");

                // Remove cards from DOM after animation completes
                setTimeout(() => {
                  card1.parentElement.remove();
                  card2.parentElement.remove();
                  flippedCards = [];
                  // Check if all pairs are matched (total pairs = doubledCards.length/2)
                  if (pairsCount === doubledCards.length / 2) {
                    win(container, startButton, main);
                  }
                }, 500);
              } else if (card1 === card2) {
                // Same card clicked twice - just unflip it
                setTimeout(() => {
                  card1.classList.remove("transform");
                  flippedCards = flippedCards.filter((card) => card !== card1);
                }, 500);
              }
            }
          });
        });
      });
    } else {
      throw error;
    }
  } catch (error) {
    console.log(`You have an error: ${error}`);
  }
}
startGame();
