const sql = require("./db.js");

// Construtor
const ProdutoVenda = function (produtoVenda) {
    this.produtos_idProdutos = produtoVenda.produtos_idProdutos;
    this.vendas_idVendas = produtoVenda.vendas_idVendas;
}

// Cria um nova relação produto_vendapedido no BD
ProdutoVenda.create = (produtoVenda, result) => {
    // Implementar criação de uma nova venda no BD
    sql.query("INSERT INTO produtos_vendas SET ? ", produtoPedido, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Venda criada: ", { idVendas: res.insertid, ...pedido });
        result(null, { idProdutosvendas: res.insertid, ...produtoVenda });
    });
};

// Seleciona todos os produtos da venda
ProdutoVenda.getAll = (result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_veds
               INNER JOIN vendas veds ON (veds.idVendas = prods_veds.vendas_idVendas)
               INNER JOIN produtos prods ON (prods.idProdutos = prods_veds.produtos_idProdutos)`, (err, res) => {
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
    sql.query(`SELECT * FROM produtos_vendas prods_veds
    INNER JOIN vendas veds ON (veds.idVendas = prods_veds.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idProdutos = prods_veds.produtos_idProdutos)
    WHERE prods_veds.idProdutos_vendas = ? ` + produtoVendaId, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Produtos encontrados: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona um produto dentro da venda através do ID do venda
ProdutoVenda.findById = (vendaId, result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_veds
    INNER JOIN vendas veds ON (veds.idVendas = prods_veds.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idProdutos = prods_veds.produtos_idProdutos)
    WHERE veds.idVendas = ? ` + vendaId, (err, res) => {
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

// Seleciona um produto dentro da venda através do ID do produto
ProdutoVenda.findById = (produtoId, result) => {
    sql.query(`SELECT * FROM produtos_vendas prods_veds
    INNER JOIN vendas veds ON (veds.idVendas = prods_veds.vendas_idVendas)
    INNER JOIN produtos prods ON (prods.idProdutos = prods_veds.produtos_idProdutos)
    WHERE veds.idrodutos = ? ` + produtoId, (err, res) => {
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


// Atualizar o produto dentro da venda através do ID
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

// Remover a venda através do ID
ProdutoVenda.remove = (produtoVendaId, result) => {
    sql.query("DELETE FROM vendas WHERE idVendas = ?", produtoVendaId, (err, re) => {
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

// Remover a venda através do ID
ProdutoVenda.removeByPedido = (vendaId, result) => {
    sql.query(`DELETE FROM produtos_vendas WHERE vendas_idVendas = ? `
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
    sql.query(`DELETE FROM produtos_vendas WHERE produtos_idProdutos = ? `
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
