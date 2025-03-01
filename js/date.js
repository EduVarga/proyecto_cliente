var xhro = false;

if (window.XMLHttpRequest) {
    xhro = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xhro = new ActiveXObject("Microsoft.XMLHTTP");
}

function cargarTorneos() {
    const fecha = document.getElementById("datepicker").value;
    const fechaFormateada = formatearFecha(fecha);

    if (xhro) {
        xhro.open("POST", "php/date.php");
        xhro.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhro.onreadystatechange = function () {
            if (xhro.readyState === 4 && xhro.status === 200) {
                
                var eventos = JSON.parse(xhro.responseText);
                var resultadoDiv = document.getElementById("resultado");
                resultadoDiv.innerHTML = "";

                eventos.forEach(function (torneo) {
                    var tarjeta = document.createElement("div");

                    var imagen = document.createElement("img");
                    imagen.src = torneo.city_image;
                    imagen.alt = torneo.name + " city image";
                    tarjeta.appendChild(imagen);

                    var nombre = document.createElement("p");
                    nombre.textContent = torneo.name;
                    tarjeta.appendChild(nombre);

                    var paisCiudad = document.createElement("p");
                    paisCiudad.textContent = torneo.country + " - " + torneo.city;
                    tarjeta.appendChild(paisCiudad);

                    var fecha = document.createElement("p");
                    fecha.textContent = torneo.date;
                    tarjeta.appendChild(fecha);

                    var enlace = document.createElement("a");
                    enlace.href = "formulario.html?event_id=" + torneo.id;
                    enlace.textContent = "Register";
                    tarjeta.appendChild(enlace);

                    resultadoDiv.appendChild(tarjeta);
                });
            }
        };

        xhro.send("fechaTorneo=" + fechaFormateada);
    }
}

/*function mostrarDia(){
    const fecha = document.getElementById("datepicker").value;
    const fechaFormateada = formatearFecha(fecha);
    
    $.post('php/date.php', { fechaTorneo: fechaFormateada}, function(respuesta) {
        $('#resultado').text(respuesta);
    });

    alert(fechaFormateada);
}*/

function formatearFecha(fecha) { 
    if (fecha.includes("/")){
        const [month, day, year] = fecha.split("/");
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, "0")}`;
    }

    return fecha;
}