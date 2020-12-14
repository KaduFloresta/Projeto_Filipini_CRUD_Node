const sql = require("./db.js");

const Venda = function (venda) {
    this.formaPgto = venda.formaPgto;
    this.User_idUser = venda.User_idUser;
};

// Cria um nova venda no BD
Venda.create = (vendas, result) => {
    // Implementa a criação de uma nova venda no BD
    sql.query("INSERT INTO vendas SET ? ", vendas, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Venda criada: ", { idVendas: res.idVendas, ...vendas });
        result(null, { idVendas: res.idVendas, ...vendas });
    });
};

// Seleciona uma venda através do ID
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

// Seleciona todos as vendas
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

// Atualiza as vendas através do ID
Venda.updateById = (idVendas, venda, result) => {
    sql.query(`UPDATE vendas 
               SET formaPgto = ?
               WHERE idVendas = ?`, [venda.formaPgto, idVendas], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("vendas encontrado: ", res[0]);
            console.log("venda atualizado: ", { idVendas: idVendas, ...venda });
            result(null, { idVendas: idVendas, ...venda });
        }
    });
};


// Remove a venda através do ID
Venda.remove = (idVendas, result) => {
    sql.query("DELETE FROM vendas WHERE idVendas = ?", idVendas, (err, res) => {
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

// Remove todos as vendas
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
