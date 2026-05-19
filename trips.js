const tripForm = document.getElementById("trip-form");
const tripList = document.getElementById("trip-list");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

function saveTrips() {
  localStorage.setItem("trips", JSON.stringify(trips));
}

function validarFechas(fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const hoy = new Date();

  if (inicio < hoy) {
    return "The start date cannot be in the past.";
  }

  if (fin < inicio) {
    return "The end date cannot be before the start date.";
  }

  return null;
}

function renderTrips() {
  tripList.innerHTML = "";

  trips.forEach((trip, index) => {
  
    const card = document.createElement("div");

    card.classList.add("trip-mini-card");

    card.innerHTML = `

      <div class="trip-preview">

        <h3>${trip.name}</h3>

        <p>${trip.destination}</p>

      </div>

      <div class="trip-details">

        <p><strong>Origin:</strong> ${trip.origin}</p>

        <p><strong>Destination:</strong> ${trip.destination}</p>

        <p><strong>Dates:</strong> ${trip.start} → ${trip.end}</p>

        <button class="add-activity-btn">
          + Add Activity
        </button>

        <form class="activity-form activity-form-hidden">

          <input
            type="text"
            placeholder="Activity title"
            class="activity-title"
            required
          >

          <input
            type="text"
            placeholder="Description"
            class="activity-description"
            required
          >

          <input
            type="time"
            class="activity-time"
            required
          >

          <button type="submit">
            Save Activity
          </button>

        </form>

        <div class="activities-list">

          ${trip.activities
            .map(
              (activity) => `

            <div class="activity-item">

              <h4>${activity.title}</h4>

              <p>${activity.description}</p>

              <p>${activity.time}</p>

            </div>

          `,
            )
            .join("")}

        </div>

        <button class="delete-btn">
          Delete Trip
        </button>

      </div>

    `;

    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });

    const addBtn = card.querySelector(".add-activity-btn");

    const activityForm = card.querySelector(".activity-form");

    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      activityForm.classList.toggle("activity-form-hidden");
    });

    activityForm.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    activityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      e.stopPropagation();

      const activity = {
        title: activityForm.querySelector(".activity-title").value,

        description: activityForm.querySelector(".activity-description").value,

        time: activityForm.querySelector(".activity-time").value,
      };

      trip.activities.push(activity);

      saveTrips();

      renderTrips();
    });

    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      trips.splice(index, 1);

      saveTrips();

      renderTrips();
    });

    tripList.appendChild(card);
  });
}

tripForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const startDate = document.getElementById("trip-start").value;

  const endDate = document.getElementById("trip-end").value;

  const errorFechas = validarFechas(startDate, endDate);

  if (errorFechas !== null) {

    alert(errorFechas);
  }


  else {
    
    const newTrip = {
      name: document.getElementById("trip-name").value,

      origin: document.getElementById("trip-origin").value,

      destination: document.getElementById("trip-destination").value,

      start: startDate,

      end: endDate,

      activities: [],
    };

    trips.push(newTrip);

    saveTrips();

    renderTrips();

    tripForm.reset();
  }
});

renderTrips();
