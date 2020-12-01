module.exports = app => {
    const produtoController = require("../controllers/produto.controller.js");
    const authJwt = require("../middlewares/auth_jwt.middleware.js");

    // Padrões do HTTP
    // POST = Criando um novo produto no BD
    app.post("/produto", produtoController.create);
    // GET = "Buscando" um produto no BD pelo ID
    app.get("/produto/:produtoId", produtoController.findOne);
    // GET = "Buscando" todos os produtos no BD
    app.get("/produto", [authJwt.verifyToken] ,produtoController.findAll);
    // PUT = Alterar os dados do produto pelo ID 
    app.put("/produto/:produtoId", produtoController.update);
    // DELETE = Deletar o produto do BD pelo ID
    app.delete("/produto/:produtoId", produtoController.delete);
    // DELETE = Deletar todos os produtos no BD
    app.delete("/produto", [authJwt.verifyToken] ,produtoController.deleteAll);
}