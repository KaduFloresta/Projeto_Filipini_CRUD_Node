module.exports = app => {
    const produtoController = require("../controllers/produto.controller.js");
    const authJwt = require("../middlewares/auth_jwt.middleware.js");

    // Padrões do HTTP
    // POST = Enviando dados para a API
    app.post("/produtos", [authJwt.verifyToken, authJwt.isAdmin], produtoController.create);
    // GET = Resgatando dados da API
    app.get("/produtos", produtoController.findAll);

    app.get("/produtos/:produtoId", produtoController.findOne);
    // PUT = Enviar dados de atualização
    app.put("/produtos/:produtoId", produtoController.update);
    // DELETE = Deletar dados 
    app.delete("/produtos/:produtoId", produtoController.delete);

    app.delete("/produtos", produtoController.deleteAll);
}