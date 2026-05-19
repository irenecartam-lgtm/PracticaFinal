const tripForm = document.getElementById("trip-form");
const tripList = document.getElementById("trip-list");

// Recuperamos los viajes guardados en localStorage
// Si no hay ninguno, usamos un array vacío
let trips = JSON.parse(localStorage.getItem("trips")) || [];


// ─────────────────────────────────────────────
// FUNCIÓN PARA GUARDAR LOS VIAJES EN LOCALSTORAGE
// ─────────────────────────────────────────────
function saveTrips() {

  localStorage.setItem("trips", JSON.stringify(trips));

}


// ─────────────────────────────────────────────
// FUNCIÓN PARA VALIDAR LAS FECHAS
// ─────────────────────────────────────────────
function validarFechas(fechaInicio, fechaFin) {

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const hoy = new Date();

  // Validar que la fecha de inicio no sea en el pasado
  if (inicio < hoy) {
    return "The start date cannot be in the past.";
  }

  // Validar que la fecha final no sea antes que la inicial
  if (fin < inicio) {
    return "The end date cannot be before the start date.";
  }

  return null;

}


// ─────────────────────────────────────────────
// FUNCIÓN PARA MOSTRAR LOS VIAJES EN PANTALLA
// ─────────────────────────────────────────────
function renderTrips() {

  // Limpiamos el contenedor
  tripList.innerHTML = "";

  // Recorremos todos los viajes
  trips.forEach((trip, index) => {

    // Creamos la card
    const card = document.createElement("div");

    card.classList.add("trip-mini-card");

    // HTML interno de la card
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

          ${trip.activities.map(activity => `

            <div class="activity-item">

              <h4>${activity.title}</h4>

              <p>${activity.description}</p>

              <p>${activity.time}</p>

            </div>

          `).join("")}

        </div>

        <button class="delete-btn">
          Delete Trip
        </button>

      </div>

    `;


    // ─────────────────────────────────────────────
    // ABRIR Y CERRAR LA CARD
    // ─────────────────────────────────────────────
    card.addEventListener("click", () => {

      card.classList.toggle("active");

    });


    // ─────────────────────────────────────────────
    // MOSTRAR FORMULARIO DE ACTIVIDADES
    // ─────────────────────────────────────────────
    const addBtn = card.querySelector(".add-activity-btn");

    const activityForm = card.querySelector(".activity-form");

    addBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      activityForm.classList.toggle("activity-form-hidden");

    });


    // ─────────────────────────────────────────────
    // PARAR PROPAGACIÓN EN EL FORM Y TODOS SUS ELEMENTOS
    // El click en cualquier parte del form (inputs, botón submit,
    // espacio vacío) no debe llegar a la card y cerrarla
    // ─────────────────────────────────────────────
    activityForm.addEventListener("click", (e) => {

      e.stopPropagation();

    });


    // ─────────────────────────────────────────────
    // GUARDAR ACTIVIDAD
    // ─────────────────────────────────────────────
    activityForm.addEventListener("submit", (e) => {

      e.preventDefault();

      e.stopPropagation();

      // Creamos la actividad
      const activity = {

        title: activityForm.querySelector(".activity-title").value,

        description: activityForm.querySelector(".activity-description").value,

        time: activityForm.querySelector(".activity-time").value

      };

      // Añadimos actividad al viaje
      trip.activities.push(activity);

      // Guardamos
      saveTrips();

      // Volvemos a renderizar
      renderTrips();

    });


    // ─────────────────────────────────────────────
    // ELIMINAR VIAJE
    // ─────────────────────────────────────────────
    const deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      // Eliminamos el viaje
      trips.splice(index, 1);

      // Guardamos cambios
      saveTrips();

      // Actualizamos pantalla
      renderTrips();

    });


    // Añadimos la card al contenedor
    tripList.appendChild(card);

  });

}


// ─────────────────────────────────────────────
// SUBMIT DEL FORMULARIO PRINCIPAL
// ─────────────────────────────────────────────
tripForm.addEventListener("submit", (e) => {

  // Evitamos que se recargue la página
  e.preventDefault();


  // Guardamos las fechas
  const startDate = document.getElementById("trip-start").value;

  const endDate = document.getElementById("trip-end").value;


  // Validamos las fechas
  const errorFechas = validarFechas(startDate, endDate);


  // SI HAY ERROR
  if (errorFechas !== null) {

    // Mostramos el error
    alert(errorFechas);

  }

  // SI TODO ESTÁ BIEN
  else {

    // Creamos el nuevo viaje
    const newTrip = {

      name: document.getElementById("trip-name").value,

      origin: document.getElementById("trip-origin").value,

      destination: document.getElementById("trip-destination").value,

      start: startDate,

      end: endDate,

      activities: []

    };


    // Añadimos el viaje al array
    trips.push(newTrip);


    // Guardamos en localStorage
    saveTrips();


    // Actualizamos la pantalla
    renderTrips();


    // Limpiamos el formulario
    tripForm.reset();

  }

});


// ─────────────────────────────────────────────
// MOSTRAR VIAJES AL CARGAR LA PÁGINA
// ─────────────────────────────────────────────
renderTrips();



