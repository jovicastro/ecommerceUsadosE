-- Garante que o script pare em caso de erro e comece do zero
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- 1. Cria o banco de dados se ele não existir e o seleciona para uso
CREATE DATABASE IF NOT EXISTS `ecommerceusados` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ecommerceusados`;

-- --------------------------------------------------------

--
-- Apaga a tabela antiga se ela existir, para evitar conflitos
--
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `products`;


-- --------------------------------------------------------

--
-- Estrutura para tabela `users` (CORRIGIDA)
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL, -- CORREÇÃO: Aumentado para 60 caracteres para o hash do bcrypt
  `email` varchar(50) NOT NULL,
  `telephoneN` varchar(20) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `addressN` varchar(10) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0, -- Assumindo que 0 = não admin, 1 = admin
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Adicionando um usuário de exemplo (a senha 'senha123' precisa ser criptografada na aplicação)
-- NOTA: Este INSERT é apenas um exemplo. O registro real deve ser feito pela sua API para criptografar a senha.
--
INSERT INTO `users` (`id`, `fullname`, `password`, `email`, `isAdmin`) VALUES
(13, 'eniac', '$2a$10$3fG.q6G8f.P9g.Z3p8lX5uY2R1Q.Z4lX8n.Y2n.Z3p8lX5uY2R1Q', 'eniac@eniac', 1);


-- --------------------------------------------------------

--
-- Estrutura para tabela `products` (CORRIGIDA)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `products`
--
INSERT INTO `products` (`id`, `name`, `description`, `price`, `img`, `date`, `status`, `category`) VALUES
(2, 'notebook samsung', 'i3 14100F', 3200, 'https://samsungbrshop.vtexassets.com/arquivos/ids/244153-600-auto?v=638755106410700000&width=600&height=auto&aspect=true', '2025-05-25', 'novo', 'comutador'),
(3, 'S21', 'Celular', 1200, 'https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/232306', '2025-05-08', 'uso', 'comutador'),
(4, 'Livro', 'We teste', 17.5, 'https://m.media-amazon.com/images/I/51hLO3-QV1L._SY445_SX342_.jpg', '2025-06-06', 'new', 'Computador'),
(5, 'Projetor Epson PowerLite U32 +', 'rojetor Epson PowerLite U32 ? Resolução WUXGA (1920x1200) - Qualidade Full HD com nitidez impressio', 2800, 'https://img.olx.com.br/thumbs120x120/15/157531658814433.webp', '2025-06-06', 'used', 'Projetor'),
(6, 'Smartphone Samsung Galaxy S24', 'Smartphone com IA, Câmera Tripla de 50MP, 256GB de armazenamento e 8GB de RAM.', 4100.00, 'https://img.olx.com.br/images/69/693576534953421.webp', '2025-06-13', 'new', 'Celular'),
(7, 'Notebook Dell Inspiron 15', 'Notebook com processador Intel Core i7, 16GB RAM, 512GB SSD e tela de 15.6 polegadas Full HD.', 4899.90, 'https://img.olx.com.br/images/76/769519539992428.webp', '2025-06-13', 'new', 'Computador'),
(8, 'Monitor Gamer LG UltraGear 27', 'Monitor de 27 polegadas, resolução QHD, 144Hz, 1ms, compatível com G-Sync.', 1850.00, 'https://img.olx.com.br/images/20/209559653328436.webp', '2025-06-14', 'new', 'Monitor'),
(9, 'Câmera Canon EOS R6', 'Câmera mirrorless full-frame com sensor de 20.1MP, gravação de vídeo 4K.', 13500.00, 'https://img.olx.com.br/images/46/469500533156329.webp', '2025-06-14', 'used', 'Câmera'),
(10, 'Fone de Ouvido Bluetooth JBL Tune 510BT', 'Fone de ouvido on-ear sem fio, com até 40 horas de bateria e som JBL Pure Bass.', 215.00, 'https://img.olx.com.br/images/22/226514766090118.webp', '2025-06-15', 'new', 'Acessório de Áudio'),
(11, 'Smart TV Samsung Crystal 50"', 'Smart TV com resolução 4K, processador Crystal, HDR e plataforma Tizen.', 2300.00, 'https://img.olx.com.br/images/27/279509284824915.webp', '2025-06-15', 'new', 'Televisor'),
(12, 'Console PlayStation 5 Slim', 'Versão Slim do console de última geração da Sony, com leitor de disco.', 3799.00, 'https://img.olx.com.br/images/71/716510296375306.webp', '2025-06-15', 'new', 'Videogame'),
(13, 'Impressora Multifuncional HP DeskJet 2774', 'Imprime, copia e digitaliza. Conexão sem fio e configuração fácil com o app HP Smart.', 340.00, 'https://img.olx.com.br/images/67/678513743239712.webp', '2025-06-16', 'used', 'Impressora'),
(14, 'Teclado Mecânico Redragon Kumara K552', 'Teclado mecânico ABNT2 com switches Outemu Blue e retroiluminação vermelha.', 229.90, 'https://img.olx.com.br/images/10/104535170480916.webp', '2025-06-16', 'new', 'Acessório de PC'),
(15, 'Cadeira de Escritório Presidente', 'Cadeira ergonômica com ajuste de altura, encosto reclinável e apoio para os braços.', 799.00, 'https://img.olx.com.br/images/36/362556160555575.webp', '2025-06-16', 'new', 'Móveis');

--
-- Índices para tabelas despejadas
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14; -- CORREÇÃO: Começa depois do último ID inserido

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16; -- CORREÇÃO: Começa depois do último ID inserido

COMMIT;