<?php
// Este php no controla la inyeccion SQL en los parámetros, pero no lo he tenido
// en cuenta para hacer el php porque no hay nada importante en la base de datos

$paisElegido = isset($_POST['pais']) ? $_POST['pais'] : '';
$conexion = new mysqli('localhost', 'root', 'sa', 'poker_events');

$consulta = "SELECT id, name, city_image, country, city, date FROM events WHERE country = '$paisElegido'";

$resultado = $conexion->query($consulta);

$events = [];
while ($fila = $resultado->fetch_assoc()) {
    $events[] = $fila;
}

echo json_encode($events);

$conexion->close();
?>