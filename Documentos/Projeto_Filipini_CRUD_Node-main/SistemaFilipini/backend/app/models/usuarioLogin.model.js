const sql = require("./db.js");

// Construtor
const UsuarioLogin = function (usuario) {
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.tipoUser = usuario.tipoUser;
}

// Cria um novo usuario no BD
UsuarioLogin.create = (usuario, result) => {
    // Implementar criação de um novo usuario no BD
    sql.query("INSERT INTO userlogin SET ? ", usuario, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        else {
            result(null, "Login criado com sucesso!")
        }
    });
};

// Seleciona um usuario através do login
UsuarioLogin.findByEmail = (emailUser, result) => {
    sql.query(`SELECT * FROM userlogin WHERE email = '${emailUser}'`, (err, res) => {
        if (err) {
            result(err, null);
        }
        //Verificar se usuário existe
        else if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }

    });
};

// Seleciona um usuario através do ID
UsuarioLogin.findById = (userId, result) => {
    sql.query(`SELECT * FROM userlogin WHERE idUserAcess = '${userId}'`, (err, res) => {
        if (err) {
            result(err, null);
        }
        //Verificar se usuário existe
        else if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    })
}

// Seleciona todos os userlogin
UsuarioLogin.getAll = (result) => {
    sql.query("SELECT * FROM userlogin", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Login: ", res);
        result(null, res);
    });
};

// Atualizar o usuario através do ID
UsuarioLogin.updateById = (usuarioId, usuario, result) => {

    this.email = usuario.email;
    this.senha = usuario.senha;
    this.tipoUser = usuario.tipoUser;
    sql.query(`UPDATE userlogin 
               SET email = ?, senha = ?, tipoUser = ?  
               WHERE idUserAcess = ?`, [usuario.email, usuario.senha, usuario.tipoUser, usuarioId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Login atualizado: ", { idUserAcess: usuarioId, ...usuario });
            result(null, { idUserAcess: usuarioId, ...usuario });
        }
    });
};

// Remover o usuario através do ID
UsuarioLogin.remove = (usuarioId, result) => {
    sql.query("DELETE FROM userlogin WHERE idUserAcess = ?", usuarioId, (err, res) => {
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

// Remover todos os userlogin
UsuarioLogin.removeAll = (result) => {
    sql.query("DELETE FROM userlogin", (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = UsuarioLogin;
