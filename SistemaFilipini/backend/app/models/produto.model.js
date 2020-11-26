const sql = require("./db.js");

// Construtor
const Produto = function (produto) {
    this.nome = produto.nome;
    this.marca = produto.marca;
    this.fornecedor = produto.fornecedor;
    this.validade = produto.validade;
    this.valor = produto.valor;
}

// Cria um novo produto no BD
Produto.create = (produto, result) => {
    // Implementar criação de um novo produto no BD
    sql.query("INSERT INTO produto SET ? ", produto, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("Produto criado: ", { idProduto: res.insertid, ...produto });
        result(null, { idProduto: res.insertid, ...produto });
    });
};

// Seleciona um produto através do ID
Produto.findById = (produtoId, result) => {
    sql.query("SELECT * FROM produto WHERE idProduto = " + produtoId, (err, res) => {
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

// Seleciona todos os produtos
Produto.getAll = (result) => {
    sql.query("SELECT * FROM produto", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("Produtos: ", res);
        result(null, res);
    });
};

// Atualizar o produto através do ID
Produto.updateById = (produtoId, produto, result) => {
    this.nome = produto.nome;
    this.marca = produto.marca;
    this.fornecedor = produto.fornecedor;
    this.validade = produto.validade;
    this.valor = produto.valor;
    sql.query(`UPDATE produto 
               SET nome = ?, marca = ?, fornecedor = ?,  validade = ?, valor = ? 
               WHERE idProduto = ?`, [produto.nome, produto.marca, produto.fornecedor, produto.validade, produto.valor, produtoId], (err, res) => {
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
    sql.query("DELETE FROM produto WHERE idProduto = ?", produtoId, (err, res) => {
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
    sql.query("DELETE FROM produto", (err, res) => {
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
