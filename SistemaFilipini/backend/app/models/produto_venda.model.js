const sql = require("./db.js");

// Construtor
const ProdutoVenda = function (produtoVendas) {
    this.Vendas_idVendas = produtoVendas.Vendas_idVendas;
    this.Produto_idProduto = produtoVendas.Produto_idProduto;
}

// Cria um nova relação produto_pedido no BD
ProdutoVenda.create = (produtoVenda, result) => {
    // Implementar criação de um novo pedido no BD
    sql.query("INSERT INTO produtos_vendas SET ? ", produtoVenda, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Pedido criado: ", { idProduto_Vendas: res.insertid, ...produtoVenda });
        result(null, { idProduto_Vendas: res.insertid, ...produtoVenda });
    });
};

// Seleciona todos os produtos do pedido
ProdutoVenda.getAll = (result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_vends
               INNER JOIN pedidos vends ON (vends.idVendas = prods_vends.vendas_idVendas)
               INNER JOIN produtos prods ON (prods.idprodutos = prods_vends.produto_idProduto)`, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("vendas: ", res);
        result(null, res);
    });
};

// Seleciona um produto dentro do pedido através do ID do relacionamento
ProdutoVenda.findById = (produtoVendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_vends
    INNER JOIN vendas vends ON (vends.idVendas = prods_vends.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_vends.produto_idProduto)
    WHERE prods_vends.idprodutos_vendas = ? ` + produtoVendaId, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Produto encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um produto dentro do pedido através do ID do pedido
ProdutoVenda.findById = (vendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_vends
    INNER JOIN vendas vends ON (vends.idVendas = prods_vends.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_vends.produto_idProduto)
    WHERE vends.idVendas = ? ` + vendaId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Venda encontrada: ", res);
            result(null, res);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um produto dentro do pedido através do ID do produto
ProdutoVenda.findById = (produtoId, result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_vends
    INNER JOIN vendas vends ON (vends.idVendas = prods_vends.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_vends.produto_idProduto)
    WHERE vends.idProdutos = ? ` + produtoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Produto encontrado: ", res);
            result(null, res);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};


// Atualizar o produto dentro do pedido através do ID
ProdutoVenda.updateById = (produtoVenda, result) => {
    sql.query("UPDATE produtos SET produtos_vendas SET = ?", produtoVenda, (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Produto atualizado: ", { idProdutos: produtoVenda, ...produto });
            result(null, { idProdutos: produtoVenda, ...produto });
        }
    });
};

// Remover o pedido através do ID
ProdutoVenda.remove = (produtoVendaId, result) => {
    sql.query("DELETE FROM produtos_vendas WHERE idProduto_Vendas = ?", produtoVendaId, (err, res) => {
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

// Remover o pedido através do ID
ProdutoVenda.removeByPedido = (vendaId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE Vendas_idVendas = ? `
        + vendaId, (err, res) => {
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

// Remover o produto através do ID
ProdutoVenda.removeByProduto = (produtoId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE produto_idProduto = ? `
        + produtoId, (err, res) => {
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

// Remover todos os produtos de um pedido
ProdutoVenda.removeAll = (result) => {
    sql.query("DELETE FROM produtos_vendas", (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = ProdutoVenda;