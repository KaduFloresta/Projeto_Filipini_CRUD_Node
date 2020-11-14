const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/usuario.model.js");
const config = require("../configs/auth.config.js");
const jwt = require ("jsonwebtoken");

exports.signUp = (req, res) => {
    if (!req.body.login || !req.body.senha || !req.body.tipo) {
        res.status(400).send({
            message: "Login, Senha ou Tipo NÃO enviados."
        });
    }
    else {
        // 1ª maneira de criar o usuario sem incriptação da senha
        // const usuario = new UsuarioModel(req.body);

        // 2ª maneira de criar o usuario
        const usuario = new UsuarioModel({
            login: req.body.login,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipo: req.body.tipo
        });

        UsuarioModel.create(usuario, (err, data) => {
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
    UsuarioModel.findBylogin(req.body.login, (err, data) => {
        if (err) {
            if (err = "not_found") {
                res.status(404).send({
                    message: "Não há usuário com esse login!."
                });
            }
            else {
                res.status(500).send({
                    message: "Ocorreu um erro ao buscar o login do usuário."
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
                let token = jwt.sign({id: data.idusuarios},config.secret, {
                    expiresIn: 86400 // 24 Horas em segundos
                });

                res.status(200).send({
                    accessToken: token,
                    id: data.idusuarios,
                    login: data.login,
                    tipo: data.data
                });
            }
        }
    });
}