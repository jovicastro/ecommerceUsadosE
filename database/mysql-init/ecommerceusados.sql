-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/06/2025 às 16:47
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecommerceusados`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `img` varchar(224) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `img`, `date`, `status`, `category`) VALUES
(2, 'notebook samsung', 'i3 14100F', 3200, 'https://samsungbrshop.vtexassets.com/arquivos/ids/244153-600-auto?v=638755106410700000&width=600&height=auto&aspect=true', '2025-05-25', 'novo', 'comutador'),
(3, 'S21', 'Celular', 1200, 'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/232306', '2025-05-08', 'uso', 'comutador'),
(4, 'Livro', 'We teste', 17.5, 'https://m.media-amazon.com/images/I/51hLO3-QV1L._SY445_SX342_.jpg', '2025-06-06', 'new', 'Computador'),
(5, 'Projetor Epson PowerLite U32 +', 'rojetor Epson PowerLite U32  ? Resolução WUXGA (1920x1200) - Qualidade Full HD com nitidez impressio', 2800, 'https://img.olx.com.br/thumbs120x120/15/157531658814433.webp', '2025-06-06', 'used', 'Projetor');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
