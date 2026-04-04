const API_URL = "https://backend-logicatrack-production.up.railway.app";

document.addEventListener("DOMContentLoaded", cargarDetalle);

function cargarDetalle() {

  const params = new URLSearchParams(window.location.search);
  const tracking = params.get("tracking");

  if (!tracking) {
    alert("Tracking no encontrado");
    return;
  }

  fetch(`${API_URL}/envios/${tracking}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al obtener el envío");
      }
      return res.json();
    })
    .then(envio => {

      console.log("Detalle:", envio);

      // ⚠️ Si usás <p> → textContent
      // ⚠️ Si usás <input> → value
      // (te dejo compatible con ambos)

      setValor("tracking", envio.trackingId);
      setValor("remitente", envio.remitente);
      setValor("destinatario", envio.destinatario);

      setValor("origenCiudad", envio.origen);
      setValor("destinoCiudad", envio.destino);

      setValor("fecha", formatearFecha(envio.fechaCreacion));

      // Estado (por si es select o texto)
      const estadoEl = document.getElementById("estado");
      if (estadoEl) {
        if (estadoEl.tagName === "SELECT") {
          estadoEl.value = envio.estadoActual || envio.estado;
        } else {
          estadoEl.textContent = envio.estadoActual || envio.estado;
        }
      }

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al cargar el detalle del envío");
    });
}

// 🔧 Función para soportar input o texto
function setValor(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;

  if (el.tagName === "INPUT") {
    el.value = valor || "";
  } else {
    el.textContent = valor || "-";
  }
}

// 📅 Formatear fecha
function formatearFecha(fecha) {
  if (!fecha) return "-";

  const date = new Date(fecha);
  if (isNaN(date)) return "-";

  return date.toLocaleString("es-AR");
}