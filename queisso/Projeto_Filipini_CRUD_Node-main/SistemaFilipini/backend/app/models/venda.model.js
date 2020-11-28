const sql = require("./db.js");

const newLocal = function (venda) {
    this.formaPgto = venda.formaPgto;
    this.User_idUser = venda.User_idUser;
};
//Construtor
const Venda = newLocal

//Cria um novo venda no BD
Venda.create = (venda, result) => {
    //Implementar criação de um novo venda no BD
    sql.query("INSERT INTO Vendas SET ? ", venda, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Vendas criado: ", { id_vendas: res.insertid, ...venda });
        result(null, { id_vendas: res.insertid, ...venda });
    });
};

//Seleciona um venda através do ID
Venda.findById = (vendaId, result) => {
    sql.query("SELECT * FROM Vendas WHERE idVendas = " + vendaId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        else if (res.length) {
            console.log("Vendas encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

//Seleciona todos os Vendas
Venda.getAll = (result) => {
    sql.query("SELECT * FROM Vendas", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Vendas: ", res);
        result(null, res);
    });
};


//Remover o venda através do ID
Venda.removeById = (vendaId, result) => {
    sql.query("DELETE FROM Vendas WHERE idVendas = ?", vendaId, (err, res) => {
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

module.exports = Venda;
