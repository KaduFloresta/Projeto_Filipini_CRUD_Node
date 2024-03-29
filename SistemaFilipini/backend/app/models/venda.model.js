const sql = require("./db.js");

const Venda = function (venda) {
    this.formaPgto = venda.formaPgto;
    this.User_idUser = venda.User_idUser;
};

// Cria um novo venda no BD
Venda.create = (vendas, result) => {
    // Implementar criação de um novo venda no BD
    sql.query("INSERT INTO vendas SET ? ", vendas, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Venda criada: ", { idVendas: res.insertid, ...vendas });
        result(null, { idVendas: res.insertid, ...vendas });
    });
};

// Seleciona um venda através do ID
Venda.findById = (vendaId, result) => {
    sql.query("SELECT * FROM vendas WHERE idVendas = " + vendaId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        else if (res.length) {
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
        console.log("Vendas: ", res);
        result(null, res);
    });
};

// Atualizar o venda através do ID
Venda.updateById = (vendaId, venda, result) => {
    this.formaPgto = venda.formaPgto;
    sql.query(`UPDATE vendas 
               SET formaPgto = ?
               WHERE idVendas = ?`, [venda.formaPgto, vendaId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("venda atualizado: ", { idVendas: vendaId, ...venda });
            result(null, { idVendas: vendaId, ...venda });
        }
    });
};

// Remover o venda através do ID
Venda.remove = (vendaId, result) => {
    sql.query("DELETE FROM vendas WHERE idVendas = ?", vendaId, (err, re) => {
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
Venda.removeAll = (result) => {
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
