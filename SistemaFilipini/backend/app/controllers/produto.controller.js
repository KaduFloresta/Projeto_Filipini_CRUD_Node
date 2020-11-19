const ProdutoModel = require("../models/produto.model.js");

exports.create = (req, res) => {
    if (!req.body.nome && !req.body.marca && !req.body.fornecedor && !req.body.validade && !req.body.preco) {
        res.status(400).send({
            message: "Conteúdo da Requisição está Vazio."
        });
    }
    else {
        const produto = new ProdutoModel({
            nome: req.body.nome,
            marca: req.body.marca,
            fornecedor: req.body.fornecedor,
            validade: req.body.validade,
            preco: req.body.preco
        });

        ProdutoModel.create(produto, (err, data) => {
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

exports.findOne = (req, res) => {
    ProdutoModel.findById(req.params.produtoId, (err, data) => {
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

exports.findAll = (req, res) => {
    ProdutoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            });
        }
        else
            res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body.nome && !req.body.marca && !req.body.fornecedor && !req.body.validade && !req.body.preco) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produto = new ProdutoModel({
            nome: req.body.nome,
            marca: req.body.marca,
            fornecedor: req.body.fornecedor,
            validade: req.body.validade,
            preco: req.body.preco
        });

        ProdutoModel.updateById(req.params.produtoId, produto, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Produto não encontrado!"
                    });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao atualizar o produto!"
                    });
                }
            }
            else {
                res.send(data);
            }
        });
    }
};

exports.delete = (req, res) => {
    ProdutoModel.remove(req.params.produtoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Produto não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o produto" });
            }
        }
        else {
            res.send({ message: "Produto deletado com sucesso!" });
        }
    });
};

exports.deleteAll = (req, res) => {
    ProdutoModel.removeAll((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os produtos" });
        }
        else {
            res.send({ message: "Todos os produtos deletados com sucesso!" });
        }
    });
};