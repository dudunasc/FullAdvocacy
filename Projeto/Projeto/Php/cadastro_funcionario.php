<?php
include '../config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $perfil = $_POST['perfil'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $telefone = $_POST['telefone'];

    $sql = "INSERT INTO funcionarios (nome, perfil, numeroOAB, email, senha, telefone, tipo) VALUES (?, ?, NULL, ?, ?, ?, 'comum')";
    
    $stmt = $conn->prepare($sql);
    
    if ($stmt->execute([$nome, $perfil, $email, $senha, $telefone])) {
        echo "Funcionário cadastrado com sucesso!";
    } else {
        echo "Erro ao cadastrar funcionário.";
    }
}
?>