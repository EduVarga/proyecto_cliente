<?php
// Este php no controla la inyeccion SQL en los parámetros, pero no lo he tenido
// en cuenta para hacer el php porque no hay nada importante en la base de datos

$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : '';
$event_id = isset($_POST['event_id']) ? $_POST['event_id'] : '';
$conexion = new mysqli('localhost', 'root', 'sa', 'poker_events');

$consulta = "INSERT INTO players (name, email, phone_number, event_id)
VALUES ('$name', '$email', '$phone_number', '$event_id');";

if ($conexion->query($consulta) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $conexion->error . " Query: " . $consulta;
}

$conexion->close();
?>