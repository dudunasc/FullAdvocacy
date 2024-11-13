<?php
include '../config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe dados do formulário
    $nome = $_POST['nome'];
    $perfil = $_POST['perfil'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $telefone = $_POST['telefone'];

    // Verifica se todos os campos foram preenchidos corretamente
    if (empty($nome) || empty($perfil) || empty($email) || empty($senha) || empty($telefone)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    try {
        // Insere dados no banco para funcionário comum
        $sql = "INSERT INTO funcionarios (nome, perfil, numeroOAB, email, senha, telefone, tipo) 
                VALUES (?, ?, NULL, ?, ?, ?, 'comum')";

        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $perfil, $email, $senha, $telefone]);

        echo "Funcionário cadastrado com sucesso!";
    } catch (PDOException $e) {
        echo "Erro ao cadastrar funcionário: " . $e->getMessage();
    }
}
?>
