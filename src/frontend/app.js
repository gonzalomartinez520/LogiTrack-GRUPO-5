const API_URL = "https://backend-logicatrack-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");

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

        // Redirige al listado
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error al crear el envío");
      });

  });

});