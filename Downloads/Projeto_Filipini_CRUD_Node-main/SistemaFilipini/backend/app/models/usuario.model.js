const sql = require("./db.js");

// Construtor
const Usuario = function (usuario) {
    this.tipoUser = usuario.tipoUser;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.fone = usuario.fone;
    this.cpf = usuario.cpf;
    this.cnpj = usuario.cnpj;
    this.Endereco_idEndereco = usuario.Endereco_idEndereco;

    // endereço: cliente, colaborador, fornecedor
}

// Dessa classe vai herdar:
// - Cliente 
// - Funcionario
// - Fornecedor

// Cria um novo usuario no BD
Usuario.create = (usuario, result) => {
    // Implementar criação de um novo usuario no BD
    sql.query("INSERT INTO user SET ? ", usuario, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Usuário criado: ", { idUser: res.insertid, ...usuario });
        result(null, { idUser: res.insertid, ...usuario });
    });
};

// Seleciona um endereco através do ID
Usuario.findById = (usuarioId, result) => {
    sql.query("SELECT * FROM user INNER JOIN endereco ON user.Endereco_idEndereco = endereco.idEndereco WHERE idUser = " + usuarioId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Usuário encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os usuarios
Usuario.getAll = (result) => {
    sql.query("SELECT * FROM user INNER JOIN endereco ON user.Endereco_idEndereco = endereco.idEndereco", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Usuários: ", res);
        result(null, res);
    });
};

// Atualizar o usuario através do ID
Usuario.updateById = (usuarioId, usuario, result) => {
    this.tipoUser = usuario.tipoUser;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.fone = usuario.fone;
    this.cpf = usuario.cpf;
    this.cnpj = usuario.cnpj;
    this.Endereco_idEndereco = usuario.Endereco_idEndereco;
    sql.query(`UPDATE user
               SET tipoUser = ?, nome = ?, email = ?,  fone = ?, cpf = ?,  cnpj = ?,  Endereco_idEndereco = ?
               WHERE idUser = ?`, [usuario.tipoUser, usuario.nome, usuario.email, usuario.fone, usuario.cpf, usuario.cnpj, usuario.Endereco_idEndereco, usuarioId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Usuário atualizado: ", { idUser: usuarioId, ...usuario });
            result(null, { idUser: usuarioId, ...usuario });
        }
    });
};

// Remover o usuario através do ID
Usuario.remove = (usuarioId, result) => {
    sql.query("DELETE FROM user WHERE idUser = ?", usuarioId, (err, res) => {
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
    sql.query("DELETE FROM user", (err, res) => {
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