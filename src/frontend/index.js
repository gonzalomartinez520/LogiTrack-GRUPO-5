const API_URL = "https://backend-logicatrack-production.up.railway.app";

let rolActual = localStorage.getItem("rol") || "operador";

document.addEventListener("DOMContentLoaded", () => {
  inicializarRol();
  cargarEnvios();
});

function inicializarRol() {
  const selectRol = document.getElementById("rol");
  if (!selectRol) return;

  selectRol.value = rolActual;

  selectRol.addEventListener("change", (e) => {
    rolActual = e.target.value;
    localStorage.setItem("rol", rolActual);

    cargarEnvios();
  });
}

function cargarEnvios() {

  fetch(`${API_URL}/envios`, {
    cache: "no-store"
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener los envíos");
      }
      return response.json();
    })
    .then(envios => {

      const tbody = document.querySelector("tbody");
      if (!tbody) return;

      tbody.innerHTML = "";

      // 🔥 CONTADORES
      let total = envios.length;
      let enSucursal = 0;
      let enTransito = 0;
      let entregados = 0;

      envios.forEach(envio => {

        const estado = envio.estadoActual || envio.estado || "SIN ESTADO";

        // 🔥 CONTAR ESTADOS
        if (estado === "EN_SUCURSAL") enSucursal++;
        if (estado === "EN_TRANSITO") enTransito++;
        if (estado === "ENTREGADO") entregados++;

        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td class="link">${envio.trackingId || "-"}</td>
          <td>${envio.destinatario || "-"}</td>
          <td>
            <span class="badge">${estado}</span>
          </td>
          <td>${formatearFecha(envio.fechaCreacion)}</td>
          <td>
            <a href="detalle.html?tracking=${envio.trackingId}">
              Ver detalle
            </a>
          </td>
        `;

        tbody.appendChild(fila);
      });

      // 🔥 ACTUALIZAR CARDS
      setCard("totalEnvios", total);
      setCard("enSucursal", enSucursal);
      setCard("enTransito", enTransito);
      setCard("entregados", entregados);

    })
    .catch(error => {
      console.error("Error cargando envíos:", error);

      const tbody = document.querySelector("tbody");
      if (!tbody) return;

      tbody.innerHTML = `
        <tr>
          <td colspan="5">Error al cargar los envíos</td>
        </tr>
      `;

      // 🔥 resetear cards en error
      setCard("totalEnvios", "-");
      setCard("enSucursal", "-");
      setCard("enTransito", "-");
      setCard("entregados", "-");
    });
}

// 🔥 helper para actualizar cards
function setCard(id, valor) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = valor;
  }
}

function formatearFecha(fecha) {

  if (!fecha) return "-";

  const date = new Date(fecha);

  if (isNaN(date)) return "-";

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}