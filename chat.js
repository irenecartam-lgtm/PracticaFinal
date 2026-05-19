// CONECTAR LA IA:
const API_KEY = "AIzaSyCH4UpiX9nUa7iZa7p2Vzs0-u2BY9vy474";

// helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const form = $("#form");
const chat = $("#messages");
const input = document.querySelector("#input");

// Evento de envío del formulario de chat
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const texto = formData.get("textUsuario");

  // Validar que el usuario no envíe un mensaje vacío
  if (!texto || texto.trim() === "") return;

  // 1. Pintar el mensaje del usuario en el chat
  const newLi = document.createElement("li");
  newLi.classList.add("user");
  newLi.innerText = texto;
  chat.appendChild(newLi);

  // Limpiar el campo de entrada de texto y devolverle el foco
  if (input) {
    input.value = "";
    input.focus();
  }

  // Hacer scroll automático hacia abajo para ver el nuevo mensaje
  chat.scrollTop = chat.scrollHeight;

  // 2. Llamar a la API de Gemini esperando la respuesta
  const respuesta = await llamaAChatGPT(texto);

  // 3. Pintar la respuesta de la IA en el chat
  const newLiRespuesta = document.createElement("li");
  newLiRespuesta.classList.add("gpt");
  newLiRespuesta.innerText = respuesta;
  chat.appendChild(newLiRespuesta);

  // Volver a hacer scroll automático para ver la respuesta completa de la IA
  chat.scrollTop = chat.scrollHeight;
});

// Función asíncrona optimizada y protegida contra errores
async function llamaAChatGPT(texto) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
  
  const datos = {
    contents: [
      {
        parts: [
          {
            text: "eres un asistente de viajes y te han preguntado: " + texto + ". Responde con pocas palabras.",
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    // Controlar si el servidor devuelve un error HTTP (como el 429 de límite de cuota)
    if (!response.ok) {
      if (response.status === 429) {
        return " Error: He superado el límite de mensajes permitidos por Google de forma gratuita. Por favor, espera un minuto antes de volver a intentarlo.";
      }
      return `Ocurrió un problema con la IA (Código de error: ${response.status}).`;
    }

    const data = await response.json();
    console.log("Éxito de la API:", data);

    // Verificar con seguridad que la estructura esperada existe antes de leerla
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "Lo siento, la IA devolvió un formato inesperado y no he podido procesar la respuesta.";
    }

  } catch (error) {
    console.error("Error crítico en la petición fetch:", error);
    return "No se ha podido conectar con el servicio de Inteligencia Artificial. Revisa tu conexión a internet.";
  }
}

// Control de los botones de sugerencias rápidas (tips)
const tips = document.querySelectorAll(".tip-item");

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    if (input) {
      input.value = tip.innerText;
      input.focus();
    }
  });
});

/* ───────── VENTANA BACK ───────── */
const goBackBtn = document.getElementById("back-btn");

if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html#plan-trip";
  });
}

//*-- Control del menú de navegación móvil

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});