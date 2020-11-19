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
    sql.query(`SELECT * FROM usuarios WHERE idUsuarios = '${idUsuario}'`, (err, res) => {
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

// Seleciona todos os usuarios
Usuario.getAll = (result) => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("usuarios: ", res);
        result(null, res);
    });
};

// Atualizar o usuario através do ID
Usuario.updateById = (usuarioId, usuario, result) => {

    this.login = usuario.login;
    this.senha = usuario.senha;
    this.tipo = usuario.tipo;
    this.nome = usuario.nome;
    this.fone = usuario.fone;
    this.cpf = usuario.cpf;
    sql.query(`UPDATE usuarios 
               SET login = ?, senha = ?, tipo = ?,  nome = ?, fone = ?,  cpf = ?  
               WHERE idUsuarios = ?`, [usuario.login, usuario.senha, usuario.tipo, usuario.nome, usuario.fone, usuario.cpf, usuarioId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("usuario atualizado: ", { idUsuarios: usuarioId, ...usuario });
            result(null, { idUsuarios: usuarioId, ...usuario });
        }
    });
};

// Remover o usuario através do ID
Usuario.remove = (usuarioId, result) => {
    sql.query("DELETE FROM usuarios WHERE idUsuarios = ?", usuarioId, (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            result(null, res);
        }
    });
};

// Remover todos os usuarios
Usuario.removeAll = (result) => {
    sql.query("DELETE FROM usuarios", (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = Usuario;
