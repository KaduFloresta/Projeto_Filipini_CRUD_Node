const sql = require("./db.js");

// Construtor
const Endereco = function (endereco) {
    this.rua = endereco.rua;
    this.numero = endereco.numero;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.estado = endereco.estado;
    this.cep = endereco.cep;
}

// Cria um novo endereco no BD
Endereco.create = (endereco, result) => {
    // Implementar criação de um novo endereco no BD
    sql.query("INSERT INTO endereco SET ? ", endereco, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Enderecos criado: ", { idEndereco: res.insertid, ...endereco });
        result(null, { idEndereco: res.insertid, ...endereco });
    });
};

// Seleciona um endereco através do ID
Endereco.findById = (enderecoId, result) => {
    sql.query("SELECT * FROM endereco WHERE idEndereco = " + enderecoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Endereco encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os enderecos
Endereco.getAll = (result) => {
    sql.query("SELECT * FROM endereco", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Endereços: ", res);
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
    this.cep = endereco.cep;
    sql.query(`UPDATE endereco 
               SET rua = ?, numero = ?, bairro = ?,  cidade = ?, estado = ?, cep = ?
               WHERE idEndereco = ?`, [endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep, enderecoId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Endereço atualizado: ", { idEndereco: enderecoId, ...endereco });
            result(null, { idEndereco: enderecoId, ...endereco });
        }
    });
};

// Remover o endereco através do ID
Endereco.remove = (enderecoId, result) => {
    sql.query("DELETE FROM endereco WHERE idEndereco = ?", enderecoId, (err, res) => {
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
Endereco.removeAll = (result) => {
    sql.query("DELETE FROM endereco", (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null,);
        }
    });
};

module.exports = Endereco;
