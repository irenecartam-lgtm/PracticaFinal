const carousel = document.querySelector(".popular-destinations");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function getCardWidth() {
  const card = document.querySelector(".card");
  return card.offsetWidth + 20; 
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
  e.preventDefault(); 

  const name     = document.getElementById('contact-name').value.trim();
  const surname  = document.getElementById('contact-surname').value.trim();
  const email    = document.getElementById('contact-email').value.trim();
  const message  = document.getElementById('contact-message').value.trim();
  const btn      = document.getElementById('contact-submit');
  const feedback = document.getElementById('contact-feedback');

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
  btn.textContent = 'Sending... ';
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
  btn.textContent = 'Send Message ';
});


  /* ───────── VENTANA IA ───────── */
const planTripBtn = document.getElementById("plan-trip-btn");

planTripBtn.addEventListener("click", () => {

  window.location.href = "chat.html";

});

  /* ───────── MENU TOGGLE ───────── */

const menuToggle = document.getElementById("menu-toggle");

const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", function () {

  mobileNav.classList.toggle("active");

});



  /* ───────── WEATHER ───────── */

const API_KEY = '6757199e74ac9488dc56336a2c22645a';

  document.getElementById('weather-btn').addEventListener('click', fetchWeather);
  document.getElementById('weather-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchWeather();
  });

  async function fetchWeather() {
    const city = document.getElementById('weather-input').value.trim();
    const errorEl = document.getElementById('weather-error');
    errorEl.textContent = '';

    if (!city) {
      errorEl.textContent = '⚠️ Please enter a city name.';
      return;
    }

    try {
      
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`
      );

      if (!res.ok) {
        errorEl.textContent = '❌ City not found. Please check the name and try again.';
        document.getElementById('weather-current').classList.add('hidden');
        document.getElementById('weather-forecast').classList.add('hidden');
        return;
      }

      const data = await res.json();
      renderCurrent(data);

      
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=en`
      );
      const forecastData = await resForecast.json();
      renderForecast(forecastData);

    } catch (err) {
      errorEl.textContent = '❌ Something went wrong. Please try again.';
      console.error(err);
    }
  }

  function renderCurrent(data) {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    document.getElementById('w-city').textContent    = `${data.name}, ${data.sys.country}`;
    document.getElementById('w-date').textContent    = date.toLocaleDateString('en-GB', options);
    document.getElementById('w-desc').textContent    = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    document.getElementById('w-temp').textContent    = `${Math.round(data.main.temp)}°C`;
    document.getElementById('w-icon').src            = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('w-feels').textContent   = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('w-humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('w-wind').textContent    = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('w-minmax').textContent  = `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°C`;

    document.getElementById('weather-current').classList.remove('hidden');
  }

  function renderForecast(data) {
    const container = document.getElementById('forecast-cards');
    container.innerHTML = '';

    
    const days = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

    days.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      const desc = day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1);

      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <p class="forecast-day">${dayName}</p>
        <img src="${icon}" alt="${desc}" />
        <p class="forecast-desc">${desc}</p>
        <p class="forecast-temp">${Math.round(day.main.temp)}°C</p>
        <p class="forecast-minmax">${Math.round(day.main.temp_min)}° / ${Math.round(day.main.temp_max)}°C</p>
      `;
      container.appendChild(card);
    });

    document.getElementById('weather-forecast').classList.remove('hidden');
  }
