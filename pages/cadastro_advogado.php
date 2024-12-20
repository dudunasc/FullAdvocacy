<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Advogado</title>
    <link rel="stylesheet" href="../styles/tela-SitePhp/CadastroAdvogado.css">
</head>
<body>
    <div class="container">
        <h1>Cadastro de Advogado</h1>
        <form action="../Php/cadastro_advogado.php" method="POST">
            <input type="text" name="nome" placeholder="Nome" required>
            <input type="text" name="numeroOAB" placeholder="Número da OAB" required>
            <input type="email" name="email" placeholder="E-mail" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <input type="tel" name="telefone" placeholder="Telefone">
            <button type="submit">Cadastrar Advogado</button>
        </form>
        <a href="cadastro_funcionario.html">Cadastrar Funcionário</a>
    </div>
</body>
</html>
