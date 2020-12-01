const UsuarioModel = require("../models/usuario.model.js");
const EnderecoModel = require("../models/endereco.model.js");

exports.create = (req, res) => {
    if (!req.body.tipoUser || !req.body.nome || !req.body.email || !req.body.fone || !req.body.cpf || !req.body.cnpj) {
        res.status(400).send({
            message: "Dados NÃO enviados."
        });
    }
    else {
        // 1ª maneira de criar o usuario sem incriptação da senha
        // const usuario = new UsuarioModel(req.body);
        const endereco = new EnderecoModel({
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep
        });

        // Promise = promessa de execução
        const result = function(_, value) {
            const usuario = new UsuarioModel({
                tipoUser: req.body.tipoUser,
                nome: req.body.nome,
                email: req.body.email,
                fone: req.body.fone,
                cpf: req.body.cpf,
                cnpj: req.body.cnpj,
                Endereco_idEndereco: value.idEndereco
            });

            UsuarioModel.create(usuario, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Ocorreu um erro, nao foi possivel criar um usuário!"
                    });
                }
                else {
                    res.send(data);
                }
            });
        };
        EnderecoModel.create(endereco, result);
    }
}

exports.findOne = (req, res) => {
    UsuarioModel.findById(req.params.usuarioId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Usuário não encontrado! ID: " + req.params.usuarioId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o usuário com ID: " + req.params.usuarioId
                });
            }
        }
        else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    UsuarioModel.getAll((err, data) => {
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
    if (!req.body.tipoUser || !req.body.nome || !req.body.email || !req.body.fone || !req.body.cpf || !req.body.cnpj) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const usuario = new UsuarioModel({
            tipoUser: req.body.tipoUser,
            nome: req.body.nome,
            email: req.body.email,
            fone: req.body.fone,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
            Endereco_idEndereco: req.body.Endereco_idEndereco
        });

        UsuarioModel.updateById(req.params.usuarioId, usuario, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Usuário não encontrado!"
                    });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao atualizar o usuário!"
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
    UsuarioModel.remove(req.params.usuarioId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Usuário não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o usuário!" });
            }
        }
        else {
            res.send({ message: "Usuário deletado com sucesso!" });
        }
    });
};

exports.deleteAll = (req, res) => {
    UsuarioModel.removeAll((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os usuários!" });
        }
        else {
            res.send({ message: "Todos os usuários deletados com sucesso!" });
        }
    });
};