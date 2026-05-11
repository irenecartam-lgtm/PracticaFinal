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

/* ───────── ABOUT US ───────── */

const creatorCards = document.querySelectorAll(".creator-card");

const creatorDescription = document.getElementById("creator-description");

const creatorsInfo = {

  ariadna: {

    name: "Ariadna",

    text: `
      Ariadna is passionate about web design and user experiences.
      She enjoys creating clean and modern interfaces that make
      travel planning easier and more enjoyable.
    `
  },

  irene: {

    name: "Irene",

    text: `
      Irene focuses on frontend development and interactive design.
      She loves creating dynamic websites and digital experiences
      with a modern and intuitive style.
    `
  }

};

creatorCards.forEach(card => {

  card.addEventListener("click", () => {

    creatorCards.forEach(c => {

      c.classList.remove("active");

    });

    card.classList.add("active");

    const creator = card.dataset.creator;

    creatorDescription.innerHTML = `

      <h3>${creatorsInfo[creator].name}</h3>

      <p>${creatorsInfo[creator].text}</p>

    `;

  });

});