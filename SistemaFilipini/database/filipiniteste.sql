-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Nov-2020 às 00:10
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
-- Banco de dados: `filipiniteste`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `idEnderecos` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `cep` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `enderecos`
--

INSERT INTO `enderecos` (`idEnderecos`, `rua`, `numero`, `bairro`, `cidade`, `estado`, `cep`) VALUES
(1, 'Rua Antonio', '10', 'America', 'Joinville', 'SC', '89206000'),
(2, 'Rua Beatriz ', '20', 'Atiradores', 'Joinville', 'SC', '89206000'),
(3, 'Rua Carlos', '30', 'Boa VIsta', 'Joinville', 'SC', '89206000'),
(4, 'Rua Denise', '40', 'Ademar Garcia', 'Joinville', 'SC', '89000 000');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `idProdutos` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `fornecedor` varchar(50) NOT NULL,
  `validade` varchar(50) NOT NULL,
  `preço` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`idProdutos`, `nome`, `marca`, `fornecedor`, `validade`, `preço`) VALUES
(1, 'Linguiça Carne Bovina', 'Seara', 'Seara Ltda', '10/12/2020', '2,50'),
(2, 'Apresuntado sem Gordura', 'Sadia', 'Sadia Ltda', '02/02/2021', '2,99'),
(3, 'Salame 500g ', 'Aurora', 'Aurora Ltda', '03/03/2021', '4,85');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos_vendas`
--

CREATE TABLE `produtos_vendas` (
  `idProduto_vendas` int(11) NOT NULL,
  `vendas_idVendas` int(11) NOT NULL,
  `produtos_idProdutos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos_vendas`
--

INSERT INTO `produtos_vendas` (`idProduto_vendas`, `vendas_idVendas`, `produtos_idProdutos`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 3),
(5, 3, 3),
(6, 3, 1),
(7, 3, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `fone` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `enderecos_idEnderecos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `login`, `senha`, `tipo`, `nome`, `fone`, `email`, `cpf`, `enderecos_idEnderecos`) VALUES
(1, 'floresta', '12345', 'Admin', 'Kadu Floresta', '47 9999 9999', 'carlos@gmail.com', '111.111.111-11', 1),
(2, 'alisson', '456', 'funcionario', 'Alisson Wenceslau', '47 8888 8888', 'alisson@gmail.com', '222.222.222-22', 2),
(3, 'leonardo', '789', 'funcionario', 'Leonardo FIlipini', '47 7777 7777', 'leonardo@uol.com', '333.333.333-33', 3),
(4, 'lucas', '159', 'funcionario', 'Lucas Elmer', '47 5555 5555', 'lucas@uol.com', '444.444.444-44', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `idVendas` int(11) NOT NULL,
  `formaPgto` varchar(50) NOT NULL,
  `usuarios_idVendedor` int(11) NOT NULL,
  `usuarios_idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`idVendas`, `formaPgto`, `usuarios_idVendedor`, `usuarios_idCliente`) VALUES
(1, 'debito', 2, 1),
(2, 'dinheiro', 2, 3),
(3, 'credito', 2, 4);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`idEnderecos`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`idProdutos`);

--
-- Índices para tabela `produtos_vendas`
--
ALTER TABLE `produtos_vendas`
  ADD PRIMARY KEY (`idProduto_vendas`),
  ADD KEY `fk_produtos_has_vendas_vendas1_idx` (`vendas_idVendas`),
  ADD KEY `fk_produtos_vendas_produtos1_idx` (`produtos_idProdutos`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`),
  ADD KEY `fk_usuarios_enderecos1_idx` (`enderecos_idEnderecos`);

--
-- Índices para tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`idVendas`),
  ADD KEY `fk_vendas_usuarios1_idx` (`usuarios_idVendedor`),
  ADD KEY `fk_vendas_cliente_idx` (`usuarios_idCliente`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `idEnderecos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idProdutos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `fk_produtos_has_vendas_vendas` FOREIGN KEY (`vendas_idVendas`) REFERENCES `vendas` (`idVendas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_produtos_vendas_produtos` FOREIGN KEY (`produtos_idProdutos`) REFERENCES `produtos` (`idProdutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_enderecos1` FOREIGN KEY (`enderecos_idEnderecos`) REFERENCES `enderecos` (`idEnderecos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `fk_vendas_cliente` FOREIGN KEY (`usuarios_idCliente`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vendas_vendedor` FOREIGN KEY (`usuarios_idVendedor`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
