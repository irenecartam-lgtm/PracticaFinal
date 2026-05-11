const carousel = document.querySelector(".popular-destinations");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function getCardWidth() {
  const card = document.querySelector(".card");
  return card.offsetWidth + 20; // ancho + gap (igual que en CSS)
}

nextBtn.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  carousel.style.transition = "transform 0.6s ease-in-out";
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    carousel.style.transition = "none";
    carousel.appendChild(carousel.firstElementChild);
    carousel.style.transform = `translateX(0)`;
  }, 620);
});

prevBtn.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  carousel.style.transition = "none";
  carousel.prepend(carousel.lastElementChild);
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    carousel.style.transition = "transform 0.6s ease-in-out";
    carousel.style.transform = `translateX(0)`;
  }, 20);
});