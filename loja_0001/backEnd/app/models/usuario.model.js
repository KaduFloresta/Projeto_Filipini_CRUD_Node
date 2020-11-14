const sql = require("./db.js");

// Construtor
const Usuario = function (usuario) {
    this.login = usuario.login;
    this.senha = usuario.senha;
    this.tipo = usuario.tipo;
    this.nome = usuario.nome;
    this.fone = usuario.fone;
    this.cpf = usuario.cpf;
}

// Cria um novo usuario no BD
Usuario.create = (usuario, result) => {
    // Implementar criação de um novo usuario no BD
    sql.query("INSERT INTO usuarios SET ? ", usuario, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        else {
            result(null, "Usuário criado com sucesso!")
        }
    });
};

// Seleciona um usuario através do login
Usuario.findBylogin = (login, result) => {
    sql.query(`SELECT * FROM usuarios WHERE login = '${login}'`, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        // Verificar se o Usuario existe
        else if (res.length) {
            console.log("Usuario encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um usuario através do ID
Usuario.findById = (idUsuario, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id_usuarios = '${idUsuario}'`, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        // Verificar se o Usuario existe
        else if (res.length) {
            console.log("Usuario encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

module.exports = Usuario;
