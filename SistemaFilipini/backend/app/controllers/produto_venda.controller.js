const Produto_VendaModel = require("../models/produto_Venda.model.js");

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.Produto_idProduto && !req.body.Vendas_idVendas) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produtoVenda = new Produto_VendaModel({
            Produto_idProduto: req.body.Produto_idProduto,
            Vendas_idVendas: req.body.Vendas_idVendas,
        });

        Produto_VendaModel.create(produtoVenda, (err, data) => {
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
    Produto_VendaModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            });
        }
        else
            res.send(data);
    });
};

// Encontra um registro produto_venda
exports.findOne = (req, res) => {
    Produto_VendaModel.findById(req.params.produtoVendaId, (err, data) => {
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
exports.findByVenda = (req, res) => {
    Produto_VendaModel.getByVenda(req.params.vendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Venda não encontrado! ID: " + req.params.vendaId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar a venda com ID: " + req.params.vendaId
                });
            }
        }
        else
            res.send(data);
    });
};

// Retorna um Array ou não!
exports.findByProduto = (req, res) => {
    Produto_VendaModel.getByProduto(req.params.produtoId, (err, data) => {
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

// Deleta uma venda 
exports.delete = (req, res) => {
    Produto_VendaModel.remove(req.params.produtoVendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrado!" });
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

// Deleta uma venda
exports.deleteByVenda = (req, res) => {
    Produto_VendaModel.removeByVenda(req.params.vendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrado!" });
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

// Deleta um produto
exports.deleteByProduto = (req, res) => {
    Produto_VendaModel.removeByProduto(req.params.produtoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Venda não encontrado!" });
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