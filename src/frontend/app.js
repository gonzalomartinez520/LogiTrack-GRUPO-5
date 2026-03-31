document.getElementById("form-envio")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const campos = [
    "remitente",
    "destinatario",
    "ciudadOrigen",
    "paisOrigen",
    "direccionOrigen",
    "ciudadDestino",
    "paisDestino",
    "direccionDestino"
  ];

  let faltantes = [];

  campos.forEach(id => {
    const valor = document.getElementById(id).value.trim();
    if (!valor) {
      faltantes.push(id);
    }
  });

  if (faltantes.length > 0) {
    alert("Faltan completar campos obligatorios");
    return;
  }

  alert("Envío creado correctamente (simulado)");

  window.location.href = "index.html";
});