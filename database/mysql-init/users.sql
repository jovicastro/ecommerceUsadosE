CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fullname` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL, -- Para armazenar o hash da senha
  `email` VARCHAR(255) NOT NULL UNIQUE, -- E-mails devem ser únicos
  `telephoneN` VARCHAR(15) NULL, -- Pode ser nulo e ter mais caracteres
  `cep` VARCHAR(9) NULL, -- CEP pode ter hífen
  `addressN` VARCHAR(255) NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0, -- 0 para não, 1 para sim
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Define a data de criação automaticamente
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;