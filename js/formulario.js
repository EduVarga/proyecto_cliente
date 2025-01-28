var xhro = false;

if (window.XMLHttpRequest) {
    xhro = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xhro = new ActiveXObject("Microsoft.XMLHTTP");
}

document.getElementById("formularioRegistro").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone_number = document.getElementById("phone_number").value;
    var event_id = new URLSearchParams(window.location.search).get('event_id');

     
    if (xhro) {
        xhro.open("POST", "php/formulario.php");
        xhro.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhro.onreadystatechange = function () {
            if (xhro.readyState === 4 && xhro.status === 200) {
                var respuesta = xhro.responseText;

                if (respuesta === "success") {
                    alert("You have been registered correctly!");
                    window.location.href = "index.html";
                } else {
                    alert("There was a problem in the registry. Try again later");
                }
            }
        };

        xhro.send("name=" + encodeURIComponent(name) + 
          "&email=" + encodeURIComponent(email) +
          "&phone_number=" + encodeURIComponent(phone_number) +
          "&event_id=" + encodeURIComponent(event_id));
    }
});

document.getElementById("mostrarMensaje").addEventListener("click", function () {
    var infoTexto = document.getElementById("infoTexto");
    
    if (infoTexto.style.display === "none" || infoTexto.style.display === "") {
        infoTexto.style.display = "block";
        this.innerHTML = "-";
    } else {
        infoTexto.style.display = "none";
        this.innerHTML = "+";
    }
});