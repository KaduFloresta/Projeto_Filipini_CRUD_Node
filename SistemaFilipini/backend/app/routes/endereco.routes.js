module.exports = app => {
    const enderecoController = require("../controllers/endereco.controller.js");

    // Padrões do HTTP
    // POST = Criando um novo endereco no BD
    app.post("/enderecos", enderecoController.create);
    // GET = "Buscando" um endereco no BD pelo ID
    app.get("/enderecos/:enderecoId", enderecoController.findOne);
    // GET = "Buscando" todos os enderecos no BD
    app.get("/enderecos", enderecoController.findAll);
    // PUT = Alterar os dados do endereco pelo ID 
    app.put("/enderecos/:enderecoId", enderecoController.update);
    // DELETE = Deletar o endereco do BD pelo ID
    app.delete("/enderecos/:enderecoId", enderecoController.delete);
    // DELETE = Deletar todos os enderecos no BD
    app.delete("/enderecos", enderecoController.deleteAll);
}