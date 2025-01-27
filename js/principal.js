function cargarDestacados() {
    var xhro1 = new XMLHttpRequest();
    if (xhro1) {
        xhro1.open("GET", "php/destacados.php", true);
        xhro1.onreadystatechange = function () {
            if (xhro1.readyState == 4 && xhro1.status == 200) {
                try {

                    var eventos = JSON.parse(xhro1.responseText);
                    var contenedorDestacados = document.getElementById("torneos");
                    contenedorDestacados.innerHTML = "";

                    eventos.forEach(function (torneo) {
                        var torneoDiv = document.createElement("div");
                        torneoDiv.className = "torneo";

                        var imagen = document.createElement("img");
                        imagen.src = torneo.city_image;
                        imagen.alt = torneo.name + " city image";
                        torneoDiv.appendChild(imagen);

                        var item = document.createElement("p");
                        item.textContent = torneo.name;
                        torneoDiv.appendChild(item);
                        
                        var lugar = document.createElement("p");
                        lugar.textContent = torneo.country + " - " + torneo.city;
                        torneoDiv.appendChild(lugar);

                        var fecha = document.createElement("p");
                        fecha.textContent = torneo.date;
                        torneoDiv.appendChild(fecha);

                        contenedorDestacados.appendChild(torneoDiv);                        
                    });

                    iniciarCarousel();

                } catch (error) {
                    console.error("Error al procesar la respuesta del servidor:", error);
                }
            }
        };
        xhro1.send(null);
    }
    var xhro2 = new XMLHttpRequest();
    if (xhro2) {
        xhro2.open("GET", "php/proximos.php", true);
        xhro2.onreadystatechange = function () {
            if (xhro2.readyState == 4 && xhro2.status == 200) {
                try {
                    var eventosProximos = JSON.parse(xhro2.responseText);
                    var contenedorProximos = document.getElementById("proximos");
                    contenedorProximos.innerHTML = "";

                    eventosProximos.forEach(function (torneo) {
                        var listaTorneo = document.createElement("li");
                        listaTorneo.className = "listaTorneo";
                    
                        var nombreTorneo = document.createElement("p");
                        nombreTorneo.className = "nombreTorneo";
                        nombreTorneo.textContent = torneo.name;
                    
                        var lugarTorneo = document.createElement("p");
                        lugarTorneo.className = "lugarTorneo";
                        lugarTorneo.textContent = `${torneo.city}, ${torneo.country}`;
                    
                        var fechaTorneo = document.createElement("p");
                        fechaTorneo.className = "fechaTorneo";
                        fechaTorneo.textContent = `${torneo.date}`;
                    
                        var imagen = document.createElement("img");
                        imagen.src = torneo.city_image;
                        imagen.alt = torneo.name + " city image";
                        
                        imagen.onclick = function() {
                            mostrarImagen(imagen);
                        }
                    
                        listaTorneo.appendChild(imagen);
                        listaTorneo.appendChild(nombreTorneo);
                        listaTorneo.appendChild(lugarTorneo);
                        listaTorneo.appendChild(fechaTorneo);
                        contenedorProximos.appendChild(listaTorneo);
                    });

                } catch (error) {
                    console.error("Error al procesar la respuesta del servidor:", error);
                }
            }
        };
        xhro2.send(null);
    }
}

/* carousel torneos destacados */

function iniciarCarousel() {
    const $torneos = $(".torneo");
    let indiceActual = 0;

    function mostrarTorneo(indice) {
        $torneos.removeClass("activa").hide();
        $torneos.eq(indice).addClass("activa").fadeIn(300);
    }

    $("#anterior").on("click", function () {
        indiceActual = (indiceActual - 1 + $torneos.length) % $torneos.length;
        mostrarTorneo(indiceActual);
    });

    $("#siguiente").on("click", function () {
        indiceActual = (indiceActual + 1) % $torneos.length;
        mostrarTorneo(indiceActual);
    });

    mostrarTorneo(indiceActual);
}

function mostrarImagen(imagen) {
    const divAmpliadas = document.getElementById("ampliadas");
    const imagenAmpliada = document.getElementById("imagen-ampliada");
    
    //imagenAmpliada.style.width = '90%';
    //imagenAmpliada.style.height = '80%';
    //imagenAmpliada.style.borderRadius = "12px";

    imagenAmpliada.src = imagen.src;
    divAmpliadas.style.display = "flex";
}

function cerrarAmpliadas() {
    document.getElementById("ampliadas").style.display = "none";
}

document.addEventListener('DOMContentLoaded', cargarDestacados);