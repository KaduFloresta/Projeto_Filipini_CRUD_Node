const sql = require("./db.js");

// Construtor
const Venda = function (venda) {
    this.formaPgto = venda.formaPgto;
}

// Cria um novo venda no BD
Venda.create = (venda, result) => {
    // Implementar criação de um novo venda no BD
    sql.query("INSERT INTO vendas SET ? ", venda, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("vendas criado: ", { id_vendas: res.insertid, ...venda });
        result(null, { id_vendas: res.insertid, ...venda });
    });
};

// Seleciona um venda através do ID
Venda.findById = (vendaId, result) => {
    sql.query("SELECT * FROM vendas WHERE id_vendas = " + vendaId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("vendas encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os vendas
Venda.getAll = (result) => {
    sql.query("SELECT * FROM vendas", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("vendas: ", res);
        result(null, res);
    });
};

// Atualizar o venda através do ID
Venda.updateById = (vendaId, venda, result) => {
    this.formaPgto = venda.formaPgto;
    sql.query(`UPDATE vendas 
               SET formaPgto = ?
               WHERE id_vendas = ?`, [venda.formaPgto, vendaId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("venda atualizado: ", { id_vendas: vendaId, ...venda });
            result(null, { id_vendas: vendaId, ...venda });
        }
    });
};

// Remover o venda através do ID
Venda.remove = (vendaId, result) => {
    sql.query("DELETE FROM vendas WHERE id_vendas = ?", vendaId, (err, re) => {
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

// Remover todos os vendas
Venda.remove = (result) => {
    sql.query("DELETE FROM vendas", (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = Venda;
