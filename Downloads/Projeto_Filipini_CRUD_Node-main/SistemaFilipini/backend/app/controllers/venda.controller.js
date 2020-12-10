const VendaModel = require("../models/venda.model.js");

exports.create = (req, res) => {
    if (!req.body.formaPgto) {
        res.status(400).send({
            message: "Conteúdo da Requisição está Vazio."
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


exports.deleteById = (req, res) => {
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
