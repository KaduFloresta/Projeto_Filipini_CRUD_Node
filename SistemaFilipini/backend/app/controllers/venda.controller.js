const VendaModel = require("../models/venda.model.js");

exports.create = (req, res) => {
    if (!req.body.formaPgto || !req.body.User_idUser) {
        res.status(400).send({
            message: "Dados NÃO enviados."
        });
    }
    else {
        const venda = new VendaModel({
            formaPgto: req.body.formaPgto,
            User_idUser: req.body.User_idUser
        });

        VendaModel.create(venda, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro, nao foi possivel criar um usuário!"
                });
            }
            else {
                res.send(data);
            }
        });
    }
}

exports.findOne = (req, res) => {
    VendaModel.findById(req.params.vendaId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Venda não encontrada! ID: " + req.params.vendaId
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

exports.findAll = (req, res) => {
    console.log("erro X")
    VendaModel.getAll((err, data) => {
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
    if (!req.body.formaPgto && !req.body.User_idUser) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const venda = new VendaModel({
            formaPgto: req.body.formaPgto,
            User_idUser: req.body.User_idUser
        });

        VendaModel.updateById(req.params.vendaId, venda, (err, data) => {
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

exports.delete = (req, res) => {
    VendaModel.removeById(req.params.vendaId, (err, data) => {
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

exports.deleteAll = (req, res) => {
    VendaModel.remove((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todas as vendas" });
        }
        else {
            res.send({ message: "Todas oas vendas deletadas com sucesso!" });
        }
    });
};