// ---------------------------------------------
// SELECCIÓN DE ELEMENTOS (FORMULARIO DE BÚSQUEDA)
// ---------------------------------------------
const form = document.querySelector('#form-busqueda');
const inputBusqueda = document.querySelector('#input-busqueda');
const mensajeBusqueda = document.querySelector('#mensaje-busqueda');
const contenidoPrincipal = document.querySelector('#contenido-principal');
const formContacto = document.querySelector('#form-contacto');
const mensajeContacto = document.querySelector('#mensaje-contacto');

// ---------------------------------------------
// FUNCIÓN DE LIMPIEZA (BÚSQUEDA)
// ---------------------------------------------
function limpiarBusqueda() {
  if (inputBusqueda) inputBusqueda.value = '';
  if (mensajeBusqueda) mensajeBusqueda.textContent = '';
}

// ---------------------------------------------
// ESCUCHADOR DEL FORMULARIO DE BÚSQUEDA
// ---------------------------------------------
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // evita recarga

    if (!inputBusqueda || !mensajeBusqueda || !contenidoPrincipal) return;

    const valor = inputBusqueda.value.trim();

    if (valor === '') {
      alert('Por favor escribe algo para buscar.');
      return;
    }

    // Ocultar contenido principal
    contenidoPrincipal.classList.add('hidden');

    // Mostrar mensaje dinámico
    mensajeBusqueda.classList.remove('hidden');
    mensajeBusqueda.textContent = `Buscando información de "${valor}"...`;

    // Simulación de búsqueda
    setTimeout(() => {
      mensajeBusqueda.textContent = `No se encontraron resultados para "${valor}".`;
      inputBusqueda.value = '';
    }, 2500);
  });
}


// =========================================================
// FORMULARIO DE CONTACTO
// =========================================================

if (formContacto) {
  formContacto.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recarga

    const nombre = formContacto.value.trim();
    const email = formContacto.value.trim();
    const asunto = formContacto.value.trim();
    const mensaje = formContacto.value.trim();

    // Ocultar formulario (opcional)
    formContacto.classList.add('hidden');

    // Mostrar mensaje de envío simulado
    mensajeContacto.classList.remove('hidden');
    mensajeContacto.textContent = '¡Tu información ha sido enviada correctamente!';

    // Resetear y restaurar después de 1.5 segundos
    setTimeout(() => {
      formContacto.reset();
      formContacto.classList.remove('hidden');
      mensajeContacto.classList.add('hidden');
      mensajeContacto.textContent = '';
    }, 5500);
  });
}
