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
      travel planning easier and more enjoyable. She loves exploring new destinations and sharing her travel tips with others.
    `
  },

  irene: {

    name: "Irene",

    text: `
      Irene focuses on frontend development and interactive design.
      She loves creating dynamic websites and digital experiences
      with a modern and intuitive style. She is also an avid traveler and enjoys sharing her adventures through her work.
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
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que el navegador recargue la página

  const name     = document.getElementById('contact-name').value.trim();
  const surname  = document.getElementById('contact-surname').value.trim();
  const email    = document.getElementById('contact-email').value.trim();
  const message  = document.getElementById('contact-message').value.trim();
  const btn      = document.getElementById('contact-submit');
  const feedback = document.getElementById('contact-feedback');

  // La validación de email y required ya la hace el navegador por el <form>,
  // pero dejamos esta comprobación como seguridad extra en JS
  if (!name || !email || !message) {
    feedback.textContent = 'Please fill in name, email and message.';
    feedback.style.color = '#e74c3c';
    return;
  }

  const EMAILJS_URL   = 'https://api.emailjs.com/api/v1.0/email/send';
  const SERVICE_ID    = 'service_54x28i8';
  const PUBLIC_KEY    = '6tHz_Fii2l0UWXevz';
  const TEMPLATE_TEAM = 'template_y4adgtk';
  const TEMPLATE_AUTO = 'template_zq6p0u5';

  const now = new Date();
  const templateParams = {
    name:    name + (surname ? ' ' + surname : ''),
    email:   email,
    message: message,
    time:    now.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
  };

  const makePayload = (templateId) => JSON.stringify({
    service_id:      SERVICE_ID,
    template_id:     templateId,
    user_id:         PUBLIC_KEY,
    template_params: templateParams
  });

  const headers = { 'Content-Type': 'application/json' };

  btn.disabled = true;
  btn.textContent = 'Sending... ⏳';
  feedback.textContent = '';

  try {
    const [res1, res2] = await Promise.all([
      fetch(EMAILJS_URL, { method: 'POST', headers, body: makePayload(TEMPLATE_TEAM) }),
      fetch(EMAILJS_URL, { method: 'POST', headers, body: makePayload(TEMPLATE_AUTO) })
    ]);

    if (res1.ok && res2.ok) {
      feedback.textContent = `Thanks ${name}! We've received your message and will get back to you as soon as possible.`;
      feedback.style.color = '#27ae60';
      document.getElementById('contact-form').reset(); // Limpia el form entero de golpe
    } else {
      throw new Error('EmailJS error');
    }
  } catch (err) {
    feedback.textContent = 'Something went wrong. Please try again later.';
    feedback.style.color = '#e74c3c';
    console.error(err);
  }

  btn.disabled = false;
  btn.textContent = 'Send Message ✉️';
});


  /* ───────── VENTANA IA ───────── */
const planTripBtn = document.getElementById("plan-trip-btn");

planTripBtn.addEventListener("click", () => {

  window.location.href = "chat.html";

});
