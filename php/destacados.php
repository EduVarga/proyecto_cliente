<?php
$conexion = new mysqli('localhost', 'root', 'sa', 'poker_events');

$consulta = "SELECT id, name, city_image, country, city, date FROM events WHERE is_featured = 1";
$respuesta = $conexion->query($consulta);

$events = [];
while ($fila = $respuesta->fetch_assoc()) {
    $events[] = $fila;
}

echo json_encode($events);
$conexion->close();
?>