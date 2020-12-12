module.exports = app => {
    const vendaController = require("../controllers/venda.controller.js");

    // Padrões do HTTP
    // POST = Criando um novo venda no BD
    app.post("/vendas", vendaController.create);
    // GET = "Buscando" um venda no BD pelo ID
    app.get("/vendas/:vendaId", vendaController.findOne);
    // GET = "Buscando" todos os vendas no BD
    app.get("/vendas", vendaController.findAll);
    // // PUT = Alterar os dados do venda pelo ID 
    // app.put("/vendas/:vendaId", vendaController.update);
    // // DELETE = Deletar o venda do BD pelo ID
    // app.delete("/vendas/:vendaId", vendaController.delete);
    // // DELETE = Deletar todos os vendas no BD
    // app.delete("/vendas", vendaController.deleteAll);
}