let cards = [
  { id: 1, name: "Card 1", img: "/memory-game/images/clown.png" },
  { id: 2, name: "Card 2", img: "/memory-game/images/heart.png" },
  { id: 3, name: "Card 3", img: "/memory-game/images/knight.png" },
  { id: 4, name: "Card 4", img: "/memory-game/images/pie.png" },
  { id: 5, name: "Card 5", img: "/memory-game/images/skull.png" },
  { id: 6, name: "Card 6", img: "/memory-game/images/smile.png" },
  { id: 7, name: "Card 7", img: "/memory-game/images/clown.png" },
  { id: 8, name: "Card 8", img: "/memory-game/images/heart.png" },
  { id: 9, name: "Card 9", img: "/memory-game/images/knight.png" },
  { id: 10, name: "Card 10", img: "/memory-game/images/pie.png" },
  { id: 11, name: "Card 11", img: "/memory-game/images/skull.png" },
  { id: 12, name: "Card 12", img: "/memory-game/images/smile.png" },
];
let startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", function () {
  startButton.classList.toggle("hidden");
  let shuffledCards = cards.sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffledCards.length; i++) {
    let div = document.createElement("div");
    let card = shuffledCards[i];
    div.className = "card";
    div.innerHTML = `<img class="image-cover" src="/memory-game/images/card-back.png">`;
    document.getElementById("container").appendChild(div);
    let cardBack = true;
    div.addEventListener("click", function () {
      if (cardBack === true) {
        div.innerHTML = `<img class="image-fit" src="${card.img}">`;
        cardBack = false;
      } else {
        div.innerHTML = `<img class="image-cover" src="/memory-game/images/card-back.png">`;
        cardBack = true;
      }
    });
  }
});
