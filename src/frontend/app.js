const API_URL = "https://backend-logicatrack-production.up.railway.app";

let rolActual = localStorage.getItem("rol") || "operador";

document.addEventListener("DOMContentLoaded", () => {
  inicializarRol();
  inicializarUsuario();
  inicializarFormulario();
});

// 🔥 Manejo de rol
function inicializarRol() {
  const selectRol = document.getElementById("rol");

  if (!selectRol) return;

  selectRol.value = rolActual;

  selectRol.addEventListener("change", (e) => {
    rolActual = e.target.value;
    localStorage.setItem("rol", rolActual);
  });
}

// 🔥 Manejo del nombre de usuario
function inicializarUsuario() {
  const nombreElemento = document.getElementById("nombreUsuario");
  const botonCambiar = document.getElementById("cambiarUsuario");

  if (!nombreElemento) return;

  // Cargar usuario guardado
  let nombreGuardado = localStorage.getItem("usuario") || "Usuario";

  nombreElemento.textContent = nombreGuardado;

  // Cambiar usuario
  if (botonCambiar) {
    botonCambiar.addEventListener("click", () => {

      const nuevoNombre = prompt("Ingrese su nombre de usuario:", nombreGuardado);

      if (nuevoNombre && nuevoNombre.trim() !== "") {

        localStorage.setItem("usuario", nuevoNombre);
        nombreElemento.textContent = nuevoNombre;

      }

    });
  }
}

// 🔥 Lógica del formulario
function inicializarFormulario() {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const remitente = document.getElementById("remitente").value;
    const destinatario = document.getElementById("destinatario").value;
    const origen = document.getElementById("ciudadOrigen").value;
    const destino = document.getElementById("ciudadDestino").value;

    const envio = {
      remitente,
      destinatario,
      origen,
      destino
    };

    fetch(`${API_URL}/envios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(envio)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then(data => {
        console.log("Envío creado:", data);

        alert("Envío creado correctamente");

        form.reset();

        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error al crear el envío");
      });
  });
}

//version mala 