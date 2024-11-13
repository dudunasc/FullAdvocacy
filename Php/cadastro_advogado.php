<?php
// Incluir o arquivo de configuração
include '../config.php';

// Verificar se o formulário foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receber os dados do formulário
    $nome = $_POST['nome'];
    $numeroOAB = $_POST['numeroOAB'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $telefone = $_POST['telefone'];

    // SQL para inserir os dados do advogado na tabela "funcionarios"
    $sql = "INSERT INTO funcionarios (nome, perfil, numeroOAB, email, senha, telefone, tipo) 
            VALUES (?, ?, ?, ?, ?, ?, 'advogado')";
    
    // Preparar a consulta
    $stmt = $conn->prepare($sql);
    
    // Executar a consulta com os valores recebidos do formulário
    if ($stmt->execute([$nome, 'Advogado', $numeroOAB, $email, $senha, $telefone])) {
        echo "Advogado cadastrado com sucesso!";
    } else {
        echo "Erro ao cadastrar advogado.";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Advogado</title>
</head>
<body>
    <h1>Cadastro de Advogado</h1>

    <!-- Formulário para cadastrar advogado -->
    <form action="cadastro_advogado.php" method="POST">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required><br><br>

        <label for="numeroOAB">Número da OAB:</label>
        <input type="text" id="numeroOAB" name="numeroOAB" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required><br><br>

        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" required><br><br>

        <input type="submit" value="Cadastrar">
    </form>
</body>
</html>
