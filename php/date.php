<?php
// El php está hecho de esta forma para evitar inyecciones SQL con el parámetro

$fechaTorneo = isset($_POST['fechaTorneo']) ? $_POST['fechaTorneo'] : '';
$conexion = new mysqli('localhost', 'root', 'sa', 'poker_events');

// Prepara la consulta SQL de manera segura usando parámetros
$consulta = "SELECT id, name, city_image, country, city, date FROM events WHERE date = ?";
$stmt = $conexion->prepare($consulta);

// Verifica si la preparación de la consulta fue exitosa
if ($stmt === false) {
    die("Error al preparar la consulta: " . $conexion->error);
}

// Vincula el parámetro con el tipo de dato correspondiente (s = string)
$stmt->bind_param("s", $fechaTorneo);

// Ejecuta la consulta
$stmt->execute();

// Obtén el resultado
$resultado = $stmt->get_result();

$events = [];
while ($fila = $resultado->fetch_assoc()) {
    $events[] = $fila;
}

echo json_encode($events);

// Cierra la declaración preparada y la conexión
$stmt->close();
$conexion->close();
?>