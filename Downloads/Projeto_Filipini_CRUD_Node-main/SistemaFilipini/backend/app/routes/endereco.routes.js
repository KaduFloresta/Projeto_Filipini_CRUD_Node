module.exports = app => {
    const enderecoController = require("../controllers/endereco.controller.js");

    // Padrões do HTTP
    // POST = Criando um novo endereco no BD
    app.post("/endereco", enderecoController.create);
    // GET = "Buscando" um endereco no BD pelo ID
    app.get("/endereco/:enderecoId", enderecoController.findOne);
    // GET = "Buscando" todos os enderecos no BD
    app.get("/endereco", enderecoController.findAll);
    // PUT = Alterar os dados do endereco pelo ID 
    app.put("/endereco/:enderecoId", enderecoController.update);
    // DELETE = Deletar o endereco do BD pelo ID
    app.delete("/endereco/:enderecoId", enderecoController.delete);
    // DELETE = Deletar todos os enderecos no BD
    app.delete("/endereco", enderecoController.deleteAll);
}