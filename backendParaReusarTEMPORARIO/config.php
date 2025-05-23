<?php
// ================== CONEXÃO COM O BANCO DE DADOS ==================
//$host = "db"; // <<< se for usar o docker
 $host = "localhost"; // <<< se for usar o xampp
$user = "root";           // Usuário (padrão do XAMPP)
$password = "";           // Senha (vazia por padrão no XAMPP)
$database = "ecommerceusados"; // Nome do banco de dados

// Tenta conectar
$conn = new mysqli($host, $user, $password, $database);

// Verifica erros na conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}