const envio = {

tracking:"ENV-16593",
estado:"En Sucursal",

remitente:"Agus",
destinatario:"Gonzalo",
fecha:"30/03/2026 23:36",

origen:{
ciudad:"San Miguel",
pais:"Argentina",
direccion:"Serrano 123"
},

destino:{
ciudad:"San Miguel",
pais:"Argentina",
direccion:"San José 456"
},

historial:[
"Creado - 30/03/2026",
"En sucursal - 31/03/2026"
]

};


function cargarDetalle(){

document.getElementById("tracking").textContent = envio.tracking;
document.getElementById("estado").textContent = envio.estado;

document.getElementById("remitente").textContent = envio.remitente;
document.getElementById("destinatario").textContent = envio.destinatario;
document.getElementById("fecha").textContent = envio.fecha;

document.getElementById("ciudadOrigen").textContent = envio.origen.ciudad;
document.getElementById("paisOrigen").textContent = envio.origen.pais;
document.getElementById("direccionOrigen").textContent = envio.origen.direccion;

document.getElementById("ciudadDestino").textContent = envio.destino.ciudad;
document.getElementById("paisDestino").textContent = envio.destino.pais;
document.getElementById("direccionDestino").textContent = envio.destino.direccion;

const lista = document.getElementById("historial");

envio.historial.forEach(item => {

const li = document.createElement("li");
li.textContent = item;

lista.appendChild(li);

});

}

cargarDetalle()