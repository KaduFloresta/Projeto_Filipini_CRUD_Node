const EnderecoModel = require("../models/endereco.model.js");

exports.create = (req, res) => {
    if (!req.body.rua || !req.body.numero || !req.body.bairro || !req.body.cidade || !req.body.estado || !req.body.cep) {
        res.status(400).send({
            message: "Conteúdo da Requisição está Vazio."
        });
    }
    else {
        const endereco = new EnderecoModel({
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep
        });

        EnderecoModel.create(endereco, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro, nao foi possivel criar um endereço!"
                });
            }
            else {
                res.send(data);
            }
        });
    }
}

exports.findOne = (req, res) => {
    EnderecoModel.findById(req.params.enderecoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Endereco não encontrado! ID: " + req.params.enderecoId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o ID do endereço: " + req.params.enderecoId
                });
            }
        }
        else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    EnderecoModel.getAll((err, data) => {
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
    if (!req.body.rua || !req.body.numero || !req.body.bairro || !req.body.cidade || !req.body.estado || !req.body.cep) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const endereco = new EnderecoModel({
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep

        });

        EnderecoModel.updateById(req.params.enderecoId, endereco, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Endereco não encontrado!"
                    });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao atualizar o endereco!"
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
    EnderecoModel.remove(req.params.enderecoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Endereco não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o endereco" });
            }
        }
        else {
            res.send({ message: "Endereco deletado com sucesso!" });
        }
    });
};

exports.deleteAll = (req, res) => {
    EnderecoModel.removeAll((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os enderecos" });
        }
        else {
            res.send({ message: "Todos os enderecos deletados com sucesso!" });
        }
    });
};