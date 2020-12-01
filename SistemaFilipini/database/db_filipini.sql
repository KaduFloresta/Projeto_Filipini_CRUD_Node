-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Nov-2020 às 20:15
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_filipini`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

CREATE TABLE `endereco` (
  `idEndereco` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` varchar(45) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `cep` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `endereco`
--

INSERT INTO `endereco` (`idEndereco`, `rua`, `numero`, `bairro`, `cidade`, `estado`, `cep`) VALUES
(1, 'Rua Antonio', '10', 'America', 'Joinville', 'SC', '89206000'),
(2, 'Rua Beatriz Seagal', '502', 'Iririu', 'Joinville', 'SC', '89003 010'),
(3, 'Rua Carlos', '30', 'Boa VIsta', 'Joinville', 'SC', '89206000'),
(4, 'Rua Denise', '40', 'Ademar Garcia', 'Joinville', 'SC', '89000 000'),
(5, 'Rua Joao Teste', '401', 'Centro', 'Joinville', 'SC', '89300 001'),
(6, 'Rua Horta da Mamãe', '1001', 'Comasa', 'Joinville', 'SC', '89503 100');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `idProduto` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `fornecedor` varchar(100) NOT NULL,
  `validade` varchar(45) NOT NULL,
  `valor` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`idProduto`, `nome`, `marca`, `fornecedor`, `validade`, `valor`) VALUES
(1, 'Linguiça Carne Bovina', 'Seara', 'Seara Ltda', '10/12/2020', 2.5),
(2, 'Apresuntado sem Gordura', 'Sadia', 'Sadia Ltda', '02/02/2021', 2),
(3, 'Salame 500g ', 'Aurora', 'Aurora Ltda', '03/03/2021', 4),
(4, 'Mortadela Bexiga 350gr', 'Filipini', 'Filipini Ltda', '01/01/2021', 5),
(6, 'Peperoni Peça', 'Filipini', 'Filipini Ltda', '12/11/2020', 2.5),
(7, 'Peperoni Peça', 'Filipini', 'Filipini Ltda', '12/11/2020', 2.5),
(8, 'Peperoni Peça 200gr', 'Filipini', 'Filipini Ltda', '12/11/2021', 2.5),
(9, 'Peperoni Peça 200gr', 'Filipini', 'Filipini Ltda', '12/11/2021', 2.5),
(10, 'Pepperoni Peça 250gr', 'Filipini', 'FIlipini Ltda', '10/12/2020', 3.99),
(11, 'Chouriço temperado 450gr', 'Filipini', 'FIlipini Ltda', '05/02/2021', 4.89);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos_vendas`
--

CREATE TABLE `produtos_vendas` (
  `idProduto_Vendas` int(11) NOT NULL,
  `Vendas_idVendas` int(11) NOT NULL,
  `Produto_idProduto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos_vendas`
--

INSERT INTO `produtos_vendas` (`idProduto_Vendas`, `Vendas_idVendas`, `Produto_idProduto`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 1, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `tipoUser` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fone` varchar(50) NOT NULL,
  `cpf` varchar(50) DEFAULT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `Endereco_idEndereco` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`idUser`, `tipoUser`, `nome`, `email`, `fone`, `cpf`, `cnpj`, `Endereco_idEndereco`) VALUES
(1, 'Cliente', 'Alisson Wenceslau', 'alisson@gmail.com', '47 9999 9999', '111.111.111-11', NULL, 1),
(2, 'Colaborador', 'Kadu Floresta', 'kadu@gmail.com', '47 8888 8888', '444.444.444-44', NULL, 2),
(3, 'Fornecedor', 'Leonardo Filipini', 'leo@gmail.com', '47 7777 7777', '222.222.222-22', NULL, 3),
(4, 'Fornecedor', 'Jamal Martins', 'jamal@gmail.com', '47 5555 5555', '', '11.111.111/1111-11', 4),
(10, 'Cliente', 'Joao', 'joao@gmail.com', '48 7894 7894', '951.951.959-95', '777777777777777777', 3),
(11, 'Colaborador', 'Pedro', 'teste@teste.com', '47 8888 9999', '121.121.121-21', '11.111.111/1111-11', 5),
(12, 'Cliente', 'Maria da Conceição', 'maria@gmail.com', '48 7894 7894', '100.100.100-10', '777777777777777777', 6),
(13, 'Cliente', 'Lidia', 'lidia@gmail.com', '41 1212 1212', '321.321.321-21', '12121/121212/212127', 2),
(15, 'Cliente', 'Janaina Lipe', 'janaina@teste.com', '47 8888 9999', '121.121.121-21', '11.111.111/1111-11', 4),
(16, 'Cliente', 'Janaina Lipe', 'janaina@teste.com', '47 8888 9999', '121.121.121-21', '11.111.111/1111-11', 3),
(17, 'Cliente', 'Janaina Lipe', 'janaina@teste.com', '47 8888 9999', '121.121.121-21', '11.111.111/1111-11', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `userlogin`
--

CREATE TABLE `userlogin` (
  `idUserAcess` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipoUser` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `userlogin`
--

INSERT INTO `userlogin` (`idUserAcess`, `email`, `senha`, `tipoUser`) VALUES
(1, 'kadu@gmail.com', '123123', 1),
(2, 'leo@uol.com', '123456', 2),
(3, 'alisson@uol.com', '789456', 2),
(4, 'jamal222@gmail.com', '321321', 3),
(5, 'teste@gmail.com', '$2a$08$FkpvjO/rG4Osw5WSI4rsmO.ORnAxbj0Ja9PoYaQF7auxX0fP30m92', 3),
(6, 'teste1@gmail.com', '$2a$08$00qbH/UPK/DCfxaDtKT.Dun6vTlAry9kMObaQnBqGta37dBdjVnfy', 1),
(7, 'teste2@gmail.com', '$2a$08$LNAu/SOc3j8Xcstk3EaGGepUxfzqZ/7ltM3Rq1w2ieaRvbGMbbhwa', 2),
(8, 'teste3@gmail.com', '$2a$08$Wad.Z1lfB8PwhQEKPaJ.0uyoCWKUIe2IaJlaM5ZaXuRz7GRrUVIsq', 3),
(10, 'kadu@senac.com', '$2a$08$JERzXQH6iupxQi2dg4s42u4WMOcPS5EgqVsFMM1yrzNku1wKVHKDy', 1),
(11, 'leo@senac.com', '$2a$08$tRH0nmH4lgMC2eS4usBua.9NlwzOcM0S.QGqNcUWJVlpr3IAh53pK', 0),
(12, 'alisson@senac.com', '$2a$08$HK0.CmXPV/dYSnuxZvskQ.TsnbA3Lrxz1jn/KftytN7L24BYO7dP.', 0),
(13, 'jamal@senac.com', '$2a$08$FMHbj/ztrGZIUJgY/hNbTOE0O.wlxBfxBtzqZtqrM7CEQZi5le2Z.', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `idVendas` int(11) NOT NULL,
  `formaPgto` varchar(100) NOT NULL,
  `User_idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`idVendas`, `formaPgto`, `User_idUser`) VALUES
(1, 'Débito', 2),
(2, 'Crédito', 2),
(3, 'Dinheiro', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`idEndereco`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`idProduto`);

--
-- Índices para tabela `produtos_vendas`
--
ALTER TABLE `produtos_vendas`
  ADD PRIMARY KEY (`idProduto_Vendas`),
  ADD KEY `fk_Produto_has_Vendas_Vendas1_idx` (`Vendas_idVendas`),
  ADD KEY `fk_Produto_has_Vendas_Produto1_idx` (`Produto_idProduto`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `fk_CreateUser_Endereco1_idx` (`Endereco_idEndereco`);

--
-- Índices para tabela `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`idUserAcess`);

--
-- Índices para tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`idVendas`),
  ADD KEY `fk_Vendas_User1_idx` (`User_idUser`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `idEndereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `idProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `produtos_vendas`
--
ALTER TABLE `produtos_vendas`
  MODIFY `idProduto_Vendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `idUserAcess` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `idVendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `produtos_vendas`
--
ALTER TABLE `produtos_vendas`
  ADD CONSTRAINT `fk_Produto_has_Vendas_Produto1` FOREIGN KEY (`Produto_idProduto`) REFERENCES `produto` (`idProduto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Produto_has_Vendas_Vendas1` FOREIGN KEY (`Vendas_idVendas`) REFERENCES `vendas` (`idVendas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_CreateUser_Endereco1` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `endereco` (`idEndereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `fk_Vendas_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
