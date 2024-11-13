<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Funcionário Comum</title>
    <link rel="stylesheet" href="../styles/tela-SitePhp/CadastroFuncionario.css">
</head>
<body>
    <div class="container">
        <h1>Cadastro de Funcionário Comum</h1>
        <form action="../Php/cadastro_funcionario.php" method="POST">
            <input type="text" name="nome" placeholder="Nome" required>
            <input type="text" name="perfil" placeholder="Perfil" required>
            <input type="email" name="email" placeholder="E-mail" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <input type="tel" name="telefone" placeholder="Telefone">
            <button type="submit">Cadastrar Funcionário</button>
        </form>
        <a href="cadastro_advogado.html">Cadastrar Advogados</a>
    </div>
</body>
</html>
