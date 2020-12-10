const sql = require("./db.js");

// Construtor
const ProdutoVenda = function (produtoVenda) {
    this.Produto_idProduto = produtoVenda.Produto_idProduto;
    this.Vendas_idVendas = produtoVenda.Vendas_idVendas;
}

// Cria um nova relação produto_vendapedido no BD
ProdutoVenda.create = (produtoVenda, result) => {
    // Implementar criação de uma nova venda no BD
    sql.query("INSERT INTO produtos_vendas SET ? ", produtoVenda, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Venda criada: ", { idVendas: res.insertid, ...pedido });
        result(null, { idProduto_Vendas: res.insertid, ...produtoVenda });
    });
};

// Seleciona todos os Produto da venda
ProdutoVenda.getAll = (result) => {
    sql.query(`SELECT * FROM produtos_vendas pv
                NNER JOIN vendas veds ON (veds.idVendas = pv.Vendas_idVendas)
                INNER JOIN produto prods ON (prods.idProduto = pv.Produto_idProduto)`, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Vendas: ", res);
        result(null, res);
    });
};

// Seleciona um produto dentro da venda através do ID do relacionamento
ProdutoVenda.findById = (produtoVendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas pv
    INNER JOIN vendas veds ON (veds.idVendas = pv.vendas_idVendas)
    INNER JOIN produto prods ON (prods.idProduto = pv.Produto_idProduto)
    WHERE pv.idProduto_vendas = ${produtoVendaId}`, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        else if (res.length) {
            console.log("Produto encontrados: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um produto dentro da venda através do ID do relacionamento
ProdutoVenda.getByProduto = (produtoVendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas pv
    INNER JOIN vendas veds ON (veds.idVendas = pv.Vendas_idVendas)
    INNER JOIN produto prods ON (prods.idProduto = pv.Produto_idProduto)
    WHERE pv.idProduto_Vendas = ${produtoVendaId}`, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        else if (res.length) {
            console.log("Produto encontrados: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um produto dentro da venda através do ID do relacionamento
ProdutoVenda.getByVenda = (produtoVendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas pv
    INNER JOIN vendas veds ON (veds.idVendas = pv.Vendas_idVendas)
    INNER JOIN produto prods ON (prods.idProduto = pv.Produto_idProduto)
    WHERE pv.idProduto_Vendas = ${produtoVendaId}`, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        else if (res.length) {
            console.log("Produto encontrados: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};



// Remover atráves da PK da tabela de relação
ProdutoVenda.remove = (vendaId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE idProduto_vendas = ${vendaId}`, (err, res) => {
        if (err) {
            console.log("Erro,", err);
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


// Remover a venda através do ID
ProdutoVenda.removeByVenda = (vendaId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE vendas_idVendas = ${vendaId} `, (err, res) => {
        if (err) {
            console.log("Erro,", err);
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

// Remover o produto através do ID
ProdutoVenda.removeByProduto = (produtoId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE vendas_idVendas = ${produtoId}`, (err, res) => {
        if (err) {
            console.log("Erro, produto nao encontrado", err);
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

module.exports = ProdutoVenda;
