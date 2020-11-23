const sql = require("./db.js");

// Construtor
const Produto = function (produto) {
    this.nome = produto.nome;
    this.marca = produto.marca;
    this.fornecedor = produto.fornecedor;
    this.validade = produto.validade;
    this.preco = produto.preco;
}

// Cria um novo produto no BD
Produto.create = (produto, result) => {
    // Implementar criação de um novo produto no BD
    sql.query("INSERT INTO produtos SET ? ", produto, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Produto criado: ", { idProdutos: res.insertid, ...produto });
        result(null, { idProdutos: res.insertid, ...produto });
    });
};

// Seleciona um produto através do ID
Produto.findById = (produtoId, result) => {
    sql.query("SELECT * FROM produtos WHERE idProdutos = " + produtoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("produtos encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os produtos
Produto.getAll = (result) => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("produtos: ", res);
        result(null, res);
    });
};

// Atualizar o produto através do ID
Produto.updateById = (produtoId, produto, result) => {
    this.nome = produto.nome;
    this.marca = produto.marca;
    this.fornecedor = produto.fornecedor;
    this.validade = produto.validade;
    this.preco = produto.preco;
    sql.query(`UPDATE produtos 
               SET nome = ?, marca = ?, fornecedor = ?,  validade = ?, preco = ? 
               WHERE idProdutos = ?`, [produto.nome, produto.marca, produto.fornecedor, produto.validade, produto.preco, produtoId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Produto atualizado: ", { idProdutos: produtoId, ...produto });
            result(null, { idProdutos: produtoId, ...produto });
        }
    });
};

// Remover o produto através do ID
Produto.remove = (produtoId, result) => {
    sql.query("DELETE FROM produtos WHERE idProdutos = ?", produtoId, (err, res) => {
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

// Remover todos os produtos
Produto.removeAll = (result) => {
    sql.query("DELETE FROM produtos", (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = Produto;
