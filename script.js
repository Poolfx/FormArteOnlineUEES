// =========================================================
// ELEMENTOS DEL DOM
// =========================================================
const form = document.querySelector('#form-busqueda');
const inputBusqueda = document.querySelector('#input-busqueda');
const mensajeBusqueda = document.querySelector('#mensaje-busqueda');
const contenidoPrincipal = document.querySelector('#contenido-principal');
const resultados = document.querySelector('#resultados');

// FORMULARIO DE CONTACTO
const formContacto = document.querySelector('#form-contacto');
const mensajeContacto = document.querySelector('#mensaje-contacto');

// =========================================================
// API
// =========================================================
const API_URL = "https://api.sampleapis.com/codingresources/codingResources";

// =========================================================
// FUNCION PRINCIPAL DE BUSQUEDA
// =========================================================
async function buscarCursos(termino) {

  console.log("Funcion buscarCursos iniciada. Termino buscado:", termino);

  try {
    mensajeBusqueda.textContent =
      'Buscando informacion sobre "' + termino + '"...';

    console.log("Realizando fetch a:", API_URL);

    const response = await fetch(API_URL);

    console.log("Respuesta HTTP recibida:", response);

    if (!response.ok) {
      console.error("Respuesta no valida. Codigo HTTP:", response.status);
      throw new Error("No se pudo obtener informacion de la API");
    }

    const data = await response.json();

    console.log("Datos recibidos:", data);

    const filtrados = data.filter(item => {

      const titulo = item.title ? item.title.toLowerCase() : "";
      const descripcion = item.description ? item.description.toLowerCase() : "";
      const topics = Array.isArray(item.topics)
        ? item.topics.map(t => t.toLowerCase())
        : [];

      return (
        titulo.includes(termino.toLowerCase()) ||
        descripcion.includes(termino.toLowerCase()) ||
        topics.some(t => t.includes(termino.toLowerCase()))
      );
    });

    console.log("Resultados filtrados:", filtrados);

    renderResultados(filtrados, termino);

  } catch (error) {

    console.error("Error en buscarCursos:", error);

    mensajeBusqueda.textContent = "Hubo un error al realizar la busqueda.";
    resultados.innerHTML = "";
  }
}

// =========================================================
// RENDERIZADO DE RESULTADOS
// =========================================================
function renderResultados(lista, termino) {

  console.log("Renderizando resultados. Total:", lista.length);

  resultados.classList.remove("hidden");

  if (lista.length === 0) {
    resultados.innerHTML =
      '<p>No se encontraron resultados para "' + termino + '".</p>';
    return;
  }

  resultados.innerHTML = lista
    .map(item => {

      const description = item.description || "Sin descripcion disponible.";
      const topics = Array.isArray(item.topics)
        ? item.topics.join(", ")
        : "No especificado";
      const url = item.url || "#";

      return `
        <div class="card-resultado-simple">
          <p>${description}</p>
          <p><strong>Temas:</strong> ${topics}</p>
          <a href="${url}" target="_blank" class="link-recurso">Ver recurso</a>
        </div>
      `;
    })
    .join("");

  console.log("Resultados renderizados correctamente.");
}

// =========================================================
// EVENTO: BUSQUEDA
// =========================================================
if (form) {
  form.addEventListener('submit', function (event) {

    console.log("Submit detectado en formulario de busqueda.");

    event.preventDefault();

    const valor = inputBusqueda.value.trim();

    console.log("Valor ingresado:", valor);

    if (valor === "") {
      alert("Por favor escribe algo para buscar.");
      return;
    }

    contenidoPrincipal.classList.add("hidden");
    mensajeBusqueda.classList.remove("hidden");
    resultados.innerHTML = "";

    buscarCursos(valor);
  });
}

// =========================================================
// EVENTO: CONTACTO
// =========================================================
if (formContacto) {

  console.log("Formulario de contacto detectado.");

  formContacto.addEventListener('submit', function (event) {

    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const asunto = document.querySelector("#asunto").value;
    const mensaje = document.querySelector("#mensaje").value;

    console.log("Datos del formulario:", { nombre, email, asunto, mensaje });

    if (!nombre || !email || !asunto || !mensaje) {
      alert("Completa todos los campos.");
      return;
    }

    formContacto.classList.add("hidden");
    mensajeContacto.classList.remove("hidden");
    mensajeContacto.textContent = "Tu mensaje fue enviado correctamente.";

    setTimeout(function () {
      formContacto.reset();
      formContacto.classList.remove("hidden");
      mensajeContacto.classList.add("hidden");
    }, 4000);
  });
}
