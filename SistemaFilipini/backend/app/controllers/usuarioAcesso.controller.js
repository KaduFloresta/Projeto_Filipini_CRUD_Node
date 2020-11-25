const bcrypt = require("bcryptjs");
const UsuarioAcessoModel = require("../models/usuario.model.js");
const config = require("../configs/auth.config.js");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
    if (!req.body.email || !req.body.senha || !req.body.tipoUser) {
        res.status(400).send({
            message: "Email, Senha ou TipoUser NÃO enviados."
        });
    }
    else {
        // 1ª maneira de criar o usuario sem incriptação da senha
        // const usuario = new UsuarioAcessoModel(req.body);

        // 2ª maneira de criar o usuario
        const usuario = new UsuarioAcessoModel({
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipoUser: req.body.tipoUser
        });

        UsuarioAcessoModel.create(usuario, (err, data) => {
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

exports.signIn = (req, res) => {
    UsuarioAcessoModel.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err = "not_found") {
                res.status(404).send({
                    message: "Não há usuário com esse email!."
                });
            }
            else {
                res.status(500).send({
                    message: "Ocorreu um erro ao buscar o email do usuário."
                });
            }
        }
        else {
            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
            if (!validPassword) {
                res.status(401).send({
                    accessToken: null,
                    message: "Senha Inválida!"
                });
            }
            else {
                let token = jwt.sign({ id: data.idUsuarios }, config.secret, {
                    expiresIn: 86400 // 24 Horas em segundos
                });

                res.status(200).send({
                    accessToken: token,
                    id: data.idUsuarios,
                    email: data.email,
                    tipoUser: data.data
                });
            }
        }
    });
}

exports.findOne = (req, res) => {
    UsuarioAcessoModel.findById(req.params.usuarioId, (err, data) => {
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
    UsuarioAcessoModel.getAll((err, data) => {
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
    if (!req.body.email && !req.body.senha && !req.body.tipoUser && !req.body.nome && !req.body.fone && !req.body.cpf) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const usuario = new UsuarioAcessoModel({
            email: req.body.email,
            senha: req.body.senha,
            tipoUser: req.body.tipoUser,
        });

        UsuarioAcessoModel.updateById(req.params.usuarioId, usuario, (err, data) => {
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
    UsuarioAcessoModel.remove(req.params.usuarioId, (err, data) => {
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
    UsuarioAcessoModel.removeAll((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os usuários!" });
        }
        else {
            res.send({ message: "Todos os usuários deletados com sucesso!" });
        }
    });
};