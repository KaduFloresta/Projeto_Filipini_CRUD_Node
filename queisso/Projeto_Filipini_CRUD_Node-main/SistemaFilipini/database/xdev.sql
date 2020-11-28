-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Nov-2020 às 04:50
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
-- Banco de dados: `xdev`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedidos` int(11) NOT NULL,
  `hora` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`idpedidos`, `hora`, `status`) VALUES
(1, '2020-11-18 18:00:00', 0),
(2, '2020-11-18 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `idprodutos` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `valor` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`idprodutos`, `nome`, `valor`) VALUES
(1, 'x salada completo', 10),
(2, 'X salada completo', 5),
(3, 'X simples', 1.5),
(4, 'X coração', 9),
(5, 'X egg', 9.2),
(6, 'Coca-cola lata', 3),
(7, 'Coca-cola 2 litros', 8),
(8, 'soda lata', 3),
(9, 'sprite lata', 3),
(10, 'suco', 3.5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos_pedidos`
--

CREATE TABLE `produtos_pedidos` (
  `idprodutos_pedidos` int(11) NOT NULL,
  `observacao` varchar(100) DEFAULT NULL,
  `produtos_idprodutos` int(11) NOT NULL,
  `pedidos_idpedidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos_pedidos`
--

INSERT INTO `produtos_pedidos` (`idprodutos_pedidos`, `observacao`, `produtos_idprodutos`, `pedidos_idpedidos`) VALUES
(1, 'Coca Light...', 7, 1),
(2, 'sem cebola', 2, 1),
(3, 'sem ovo', 5, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `email`, `senha`, `tipo`) VALUES
(1, 'renan@gmail.com', '$2a$08$YK1zaKGPxB6Sl9qWKb3uz.w.Xe5FXMN0jI21uusPcD8PR4mmZDyGi', 3),
(2, 'kadu@hotmail.com', '$2a$08$T6jJ/n1k7l/HDAYDUqP3B.lq76eFvSLWB9bubqHgicI1YkHVy7uAi', 1),
(3, 'leonardo@uol.com', '$2a$08$J7Y9nAYn6GoYFGJs5FM68uxUFZfV0oXj.byA9sB9sdXlOPgcm9hrS', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedidos`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`idprodutos`);

--
-- Índices para tabela `produtos_pedidos`
--
ALTER TABLE `produtos_pedidos`
  ADD PRIMARY KEY (`idprodutos_pedidos`),
  ADD KEY `fk_produtos_pedidos_produtos_idx` (`produtos_idprodutos`),
  ADD KEY `fk_produtos_pedidos_pedidos1_idx` (`pedidos_idpedidos`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedidos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idprodutos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `produtos_pedidos`
--
ALTER TABLE `produtos_pedidos`
  MODIFY `idprodutos_pedidos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `produtos_pedidos`
--
ALTER TABLE `produtos_pedidos`
  ADD CONSTRAINT `fk_produtos_pedidos_pedidos1` FOREIGN KEY (`pedidos_idpedidos`) REFERENCES `pedidos` (`idpedidos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_produtos_pedidos_produtos` FOREIGN KEY (`produtos_idprodutos`) REFERENCES `produtos` (`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
