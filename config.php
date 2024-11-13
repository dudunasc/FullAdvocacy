<?php
$host = 'localhost';    // Endereço do servidor
$db = 'advocacia';      // Nome do banco de dados
$user = 'root';         // Usuário padrão do MySQL no XAMPP
$pass = '';             // Senha padrão do MySQL (em branco)

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão com o banco de dados bem-sucedida!";
} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();  // Exibe erro de conexão, se houver
}
?>
