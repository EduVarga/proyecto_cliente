<?php
$conexion = new mysqli('localhost', 'root', 'sa', 'poker_events');

$consulta = "
    SELECT id, name, city_image, country, city, date 
    FROM events 
    WHERE date >= CURDATE() 
    ORDER BY date ASC 
    LIMIT 5
";

$respuesta = $conexion->query($consulta);

$events = [];
while ($fila = $respuesta->fetch_assoc()) {
    $events[] = $fila;
}

echo json_encode($events);
$conexion->close();
?>