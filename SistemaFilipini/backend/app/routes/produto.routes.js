module.exports = app => {
    const produtoController = require("../controllers/produto.controller.js");

    // Padrões do HTTP
    // POST = Criando um novo produto no BD
    app.post("/produtos", produtoController.create);
    // GET = "Buscando" um produto no BD pelo ID
    app.get("/produtos/:produtoId", produtoController.findOne);
    // GET = "Buscando" todos os produtos no BD
    app.get("/produtos", produtoController.findAll);
    // PUT = Alterar os dados do produto pelo ID 
    app.put("/produtos/:produtoId", produtoController.update);
    // DELETE = Deletar o produto do BD pelo ID
    app.delete("/produtos/:produtoId", produtoController.delete);
    // DELETE = Deletar todos os produtos no BD
    app.delete("/produtos", produtoController.deleteAll);
}