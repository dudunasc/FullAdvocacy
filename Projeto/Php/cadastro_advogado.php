<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $numeroOAB = $_POST['numeroOAB'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $telefone = $_POST['telefone'];

    $sql = "INSERT INTO funcionarios (nome, perfil, numeroOAB, email, senha, telefone, tipo) VALUES (?, ?, ?, ?, ?, ?, 'advogado')";
    
    $stmt = $conn->prepare($sql);
    
    if ($stmt->execute([$nome, 'Advogado', $numeroOAB, $email, $senha, $telefone])) {
        echo "Advogado cadastrado com sucesso!";
    } else {
        echo "Erro ao cadastrar advogado.";
    }
}
?>