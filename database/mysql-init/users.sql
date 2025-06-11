CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(155) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephoneN` varchar(11) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `addressN` varchar(255) NOT NULL,
  `admin` char(50) NOT NULL, 
  `date` DATETIME
); ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci