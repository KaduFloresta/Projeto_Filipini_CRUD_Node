-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Dez-2020 às 04:29
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
(2, 'Rua São Vicente', '440', 'Boa Vista', 'Joinville', 'SC', '89206-230'),
(3, 'Rua Erwino Menegotti', '145', 'Chico de Paulo', 'Jaraguá do Sul', 'SC', '89254-000'),
(4, 'Rua Walter Meyer', '500', 'Anita Garibaldi', 'Joinville', 'SC', '89202-140'),
(5, 'Rua Diogo S Pereira', '102', 'Guanabara', 'Joinville', 'SC', '89207-130'),
(6, 'Rua Nacar', '250', 'Guanabara', 'Joinville', 'SC', '89207-200'),
(7, 'Avenida Juscelino Kubitschek', '250', 'Centro', 'Joinville', 'SC', '89201-100'),
(8, 'Rua Albano Schmidt', '100', 'Boa Vista', 'Joinville', 'SC', '89205-100'),
(9, 'Rua Itapagé', '20', 'Atiradores', 'Joinville', 'SC', '89203-150'),
(10, 'Rua Prefeito Helmuth Fallgatter', '25', 'Boa Vista', 'Joinville', 'SC', '89206-100'),
(11, 'Rua Graciosa', '50', 'Guanabara', 'Joinville', 'SC', '89207-100'),
(12, 'Rua São Vicente', '440', 'Boa Vista', 'Joinville', 'SC', '89206-230'),
(13, 'Avenida Juscelino Kubitschek', '200', 'Centro', 'Joinville', 'SC', '89201-100'),
(14, 'Rua José Koerber Júnior', '250', 'Anita Garibaldi', 'Joinville', 'SC', '89202-150'),
(15, 'Rua Albano Schmidt', '120', 'Boa Vista', 'Joinville', 'SC', '89205-100'),
(16, 'Rua Prefeito Helmuth Fallgatter', '125', 'Boa Vista', 'Joinville', 'SC', '89206-100'),
(17, 'Rua São Vicente', '100', 'Boa Vista', 'Joinville', 'SC', '89206-230'),
(18, 'Rua São Miguel', '12', 'Boa Vista', 'Joinville', 'SC', '89206-200');

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
(1, 'Linguiça Carne Bovina', 'Seara', 'Seara SA', '10/02/2021', 3.99),
(2, 'Apresuntado sem Gordura', 'Sadia', 'Sadia SA', '02/02/2021', 2.99),
(3, 'Salame 500g ', 'Aurora', 'Aurora SA', '03/03/2021', 4.55),
(4, 'Mortadela Bexiga 350gr', 'Filipini', 'Filipini Ltda', '01/01/2021', 5.99),
(5, 'Torresmo Pacote 1,5kg', 'Tia Benta', 'Tia Benta Ltda', '14/02/2021', 16.99),
(6, 'Torresmo Pacote 150g', 'Tia Benta', 'Tia Benta Ltda', '10/10/2021', 12.89),
(7, 'Salame 450gr', 'Filipini', 'Filipini Ltda', '14/02/2022', 10.99),
(8, 'Peperoni Peça 200gr', 'Filipini', 'Filipini Ltda', '12/11/2021', 2.5),
(9, 'Salsicha Pacote 1,5Kg', 'Sadia', 'Sadia SA', '12/05/2021', 15.99),
(10, 'Linguiça Carne de Frango', 'Filipini', 'Filipini Ltda', '10/02/2022', 3.59),
(11, 'Chouriço temperado 450gr', 'Filipini', 'FIlipini Ltda', '05/02/2021', 4.89),
(12, 'Torresmo Pacote 400gr', 'Tia Benta', 'Tia Benta Ltda', '14/02/2021', 8.99),
(13, 'Torresmo Pacote 1kg', 'Tia Benta', 'Tia Benta Ltda', '14/02/2021', 14.99),
(14, 'Torresmo Pacote 2Kg', 'Tia Benta', 'Tia Benta Ltda', '14/02/2021', 18.99),
(15, 'Linguiça Mista', 'Filipini', 'Filipini Ltda', '10/02/2022', 3.59);

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
(2, 'Colaborador', 'Kadu Floresta', 'kadu@gmail.com', '(47) 8 8888-888', '125.125.125-12', '', 2),
(3, 'Colaborador', 'Alisson Wenceslau', 'alisson@uol.com', '(47) 2 1212-1212', '212.121.212-12', '', 3),
(4, 'Colaborador', 'Leonardo Balitski', 'leo@gmail.com', '(23) 2 3223-2323', '232.323.232-32', '', 4),
(5, 'Fornecedor', 'Lucas Jamal Martins', 'jamal@uol.com', '(56) 5 6565-6565', '', '56.565.656/5656-56', 5),
(6, 'Cliente', 'Jualiana Martins', 'Ju@uol.com', '(54) 4 5454-5454', '565.656.565-65', '', 6);

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
(1, 'teste@teste.com', '$2a$08$EmybFwGomhoLqq1N6zRdSudEN8.mxMeSQNMWNaxU1Yx0d3t0yOrUG', 1);

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
  MODIFY `idEndereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `idProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `produtos_vendas`
--
ALTER TABLE `produtos_vendas`
  MODIFY `idProduto_Vendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `idUserAcess` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
