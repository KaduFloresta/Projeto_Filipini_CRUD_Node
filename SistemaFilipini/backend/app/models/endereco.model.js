const sql = require("./db.js");

// Construtor
const Endereco = function (endereco) {
    this.rua = endereco.rua;
    this.numero = endereco.numero;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.estado = endereco.estado;
}

// Cria um novo endereco no BD
Endereco.create = (endereco, result) => {
    // Implementar criação de um novo endereco no BD
    sql.query("INSERT INTO enderecos SET ? ", endereco, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("enderecos criado: ", { id_enderecos: res.insertid, ...endereco });
        result(null, { id_enderecos: res.insertid, ...endereco });
    });
};

// Seleciona um endereco através do ID
Endereco.findById = (enderecoId, result) => {
    sql.query("SELECT * FROM enderecos WHERE id_enderecos = " + enderecoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("enderecos encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os enderecos
Endereco.getAll = (result) => {
    sql.query("SELECT * FROM enderecos", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("enderecos: ", res);
        result(null, res);
    });
};

// Atualizar o endereco através do ID
Endereco.updateById = (enderecoId, endereco, result) => {
    this.rua = endereco.rua;
    this.numero = endereco.numero;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.estado = endereco.estado;
    sql.query(`UPDATE enderecos 
               SET rua = ?, numero = ?, bairro = ?,  cidade = ?, estado = ? 
               WHERE id_enderecos = ?`, [endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, enderecoId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("endereco atualizado: ", { id_enderecos: enderecoId, ...endereco });
            result(null, { id_enderecos: enderecoId, ...endereco });
        }
    });
};

// Remover o endereco através do ID
Endereco.remove = (enderecoId, result) => {
    sql.query("DELETE FROM enderecos WHERE id_enderecos = ?", enderecoId, (err, re) => {
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

// Remover todos os enderecos
Endereco.remove = (result) => {
    sql.query("DELETE FROM enderecos", (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = Endereco;
