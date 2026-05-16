
//CONECTAR LA IA:

const API_KEY = "AIzaSyDxJrwjdje0aEegN-tRmW-cNG3ZtU-HZq8";

// helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const form = $("#form");
const chat = $("#messages");

// La funcion callback se declara fuera!
// function handleSubmit(event) {
//   // hago cosas
// }

// form.addEventListener("submit", handleSubmit);


// la funcion callback se declara dentro!
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const texto = formData.get("textUsuario");

  const newLi = document.createElement("li");
  newLi.classList.add("user");
  newLi.innerText = texto;

  chat.appendChild(newLi);
  // console.log(texto);

  // lo que me interesa es pasarle al gpt el texto + el contexto...
  // const respuesta = "hola!";
  const respuesta = await llamaAChatGPT(texto);

  const newLiRespuesta = document.createElement("li");
  newLiRespuesta.classList.add("gpt");
  newLiRespuesta.innerText = respuesta;

  chat.appendChild(newLiRespuesta);
});

async function llamaAChatGPT(texto) {

  // de la documentación de https://ai.google.dev/gemini-api/docs/quickstart?hl=es-419#make-first-request
  /*
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "contents": [
          {
            "parts": [
              {
                "text": "Explain how AI works in a few words"
              }
            ]
          }
        ]
      }'
  */

  // Ejemplo de fetch POST con cabeceras
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
  const datos = {
    contents: [
      {
        parts: [
          {
            text:
              "eres un asistente y te han preguntado: " +
              texto +
              ". Responde con pocas palabras",
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST", // Método de la petición
    headers: {
      "x-goog-api-key": API_KEY, // api key
      "Content-Type": "application/json", // tipo de datos
    },
    body: JSON.stringify(datos), // Convertir datos a JSON
  });

  const data = await response.json();

  console.log("Éxito:", data);

  return data.candidates[0].content.parts[0].text;
}

const tips = document.querySelectorAll(".tip-item");
const input = document.querySelector("#input");

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    input.value = tip.innerText;
    input.focus();
  });
});