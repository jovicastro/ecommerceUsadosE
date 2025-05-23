<?php

require_once 'config.php';
// ================== RECEBE DADOS DO FORMULÁRIO ==================
$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$preco = $_POST['preco'];
$img = $_POST['img'];
$data = $_POST['data'];
$estado = $_POST['estado'];
$categoria = $_POST['categoria'];

// ================== PREPARA E EXECUTA O SQL ==================
$sql = "INSERT INTO produtos 
        (nome, descricao, preco, img, data, estado, categoria) 
        VALUES 
        ('$nome', '$descricao', '$preco', '$img', '$data', '$estado', '$categoria')";

// Tenta inserir e verifica se deu certo
if ($conn->query($sql) === TRUE) {
    echo "Produto cadastrado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

// Fecha a conexão
$conn->close();
?>