const produto_VendaModel = require("../models/produto_venda.model.js");

exports.create = (req, res) => {
    if (!req.body.produtos_idprodutos && !req.body.vendas_idVendas) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produtoVenda = new produto_VendaModel({
            produtos_idprodutos: req.body.produtos_idprodutos,
            vendas_idVendas: req.body.vendas_idVendas
        });

        produto_VendaModel.create(produtoVenda, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro!"
                });
            }
            else {
                res.send(data);
            }
        });
    }
}

exports.findAll = (req, res) => {
    produto_VendaModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            });
        }
        else
            res.send(data);
    });
};

// Encontra um registro produto_pedido
exports.findOne = (req, res) => {
    produto_VendaModel.findById(req.params.produtoVendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Registro não encontrado! ID: " + req.params.produtoVendaId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o registro com ID: " + req.params.produtoVendaId
                });
            }
        }
        else
            res.send(data);
    });
};

// Retorna um Array ou não!
exports.findByPedido = (req, res) => {
    produto_VendaModel.getByPedido(req.params.vendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Pedido não encontrado! ID: " + req.params.vendaId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o pedido com ID: " + req.params.vendaId
                });
            }
        }
        else
            res.send(data);
    });
};

// Retorna um Array ou não!
exports.findByProduto = (req, res) => {
    produto_VendaModel.getByProduto(req.params.produtoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Produto não encontrado! ID: " + req.params.produtoId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o produto com ID: " + req.params.produtoId
                });
            }
        }
        else
            res.send(data);
    });
};

// Altera o dados do produto_pedido
exports.update = (req, res) => {
    if (!req.body.produtos_idprodutos && !req.body.vendas_idVendas) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produtoVenda = new produto_VendaModel({
            produtos_idprodutos: req.body.produtos_idprodutos,
            vendas_idVendas: req.body.vendas_idVendas
        });

        produto_VendaModel.updateById(req.params.produtoVendaId, produtoVenda, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Venda não encontrada!"
                    });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao atualizar a venda!"
                    });
                }
            }
            else {
                res.send(data);
            }
        });
    }
};

// Deleta um pedido 
exports.delete = (req, res) => {
    produto_VendaModel.remove.apply(req.params.produtoVendaId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrada!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar a venda!" });
            }
        }
        else {
            res.send({ message: "Venda deletada com sucesso!" });
        }
    });
};

// Deleta um pedido
exports.deleteByPedido = (req, res) => {
    produto_VendaModel.remove.apply(req.params.vendaId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrada!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar a venda!" });
            }
        }
        else {
            res.send({ message: "Venda deletada com sucesso!" });
        }
    });
};

// Deleta um produto
exports.deleteByProduto = (req, res) => {
    produto_VendaModel.remove.apply(req.params.produtoId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrada!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar a venda" });
            }
        }
        else {
            res.send({ message: "Venda deletada com sucesso!" });
        }
    });
};

// Deleta todos os pedidos
exports.deleteAll = (req, res) => {
    produto_VendaModel.remove((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todas as vendas!" });
        }
        else {
            res.send({ message: "Todas as vendas deletadas com sucesso!" });
        }
    });
};