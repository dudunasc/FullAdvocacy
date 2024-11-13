<?php
include 'config.php';

$sql = "SELECT * FROM funcionarios";
$stmt = $conn->prepare($sql);
$stmt->execute();
$funcionarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funcionários Cadastrados</title>
</head>
<body>
    <h1>Funcionários Cadastrados</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Número da OAB</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Tipo</th>
        </tr>
        <?php foreach ($funcionarios as $funcionario): ?>
        <tr>
            <td><?php echo htmlspecialchars($funcionario['id']); ?></td>
            <td><?php echo htmlspecialchars($funcionario['nome']); ?></td>
            <td><?php echo htmlspecialchars($funcionario['perfil']); ?></td>
            <td><?php echo $funcionario['numeroOAB'] ? htmlspecialchars($funcionario['numeroOAB']) : 'N/A'; ?></td>
            <td><?php echo htmlspecialchars($funcionario['email']); ?></td>
            <td><?php echo htmlspecialchars($funcionario['telefone']); ?></td>
            <td><?php echo htmlspecialchars($funcionario['tipo']); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <a href="../pages/SitePHP.html">Voltar ao Painel</a>
</body>
</html>
