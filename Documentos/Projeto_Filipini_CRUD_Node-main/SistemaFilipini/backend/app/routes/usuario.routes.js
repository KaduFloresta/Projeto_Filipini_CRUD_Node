module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    // Padrões do HTTP

    // POST = Criar um nova conta
    app.post("/user", usuarioController.create);
    // GET = "Buscando" um usuario no BD pelo ID
    app.get("/user/:usuarioId", usuarioController.findOne);
    // GET = "Buscando" todos os usuarios no BD
    app.get("/user", usuarioController.findAll);
    // PUT = Alterar os dados do usuario pelo ID 
    app.put("/user/:usuarioId", usuarioController.update);
    // DELETE = Deletar o usuario do BD pelo ID
    app.delete("/user/:usuarioId", usuarioController.delete);
    // DELETE = Deletar todos os usuarios no BD
    app.delete("/user", usuarioController.deleteAll);
}