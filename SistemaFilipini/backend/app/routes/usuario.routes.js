module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    // Padrões do HTTP

    // POST = Criar um nova conta
    app.post("/signup", usuarioController.signUp);
    // POST = Logar no sistema
    app.post("/signin", usuarioController.signIn);

    // GET = "Buscando" um usuario no BD pelo ID
    app.get("/usuarios/:usuarioId", usuarioController.findOne);
    // GET = "Buscando" todos os usuarios no BD
    app.get("/usuarios", usuarioController.findAll);
    // PUT = Alterar os dados do usuario pelo ID 
    app.put("/usuarios/:usuarioId", usuarioController.update);
    // DELETE = Deletar o usuario do BD pelo ID
    app.delete("/usuarios/:usuarioId", usuarioController.delete);
    // DELETE = Deletar todos os usuarios no BD
    app.delete("/usuarios", usuarioController.deleteAll);
}