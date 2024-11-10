<?php
$host = 'localhost';
$db = 'advocacia';
$user = 'root'; // Substitua pelo seu usuário do MySQL
$pass = ''; // Substitua pela sua senha do MySQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Conexão falhou: " . $e->getMessage();
}
?>