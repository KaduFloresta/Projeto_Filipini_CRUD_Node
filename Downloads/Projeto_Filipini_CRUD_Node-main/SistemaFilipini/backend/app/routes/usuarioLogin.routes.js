module.exports = app => {
    const usuarioLoginController = require("../controllers/usuarioLogin.controller.js");

    // Padrões do HTTP

    // [authJwt.verifyToken, authJwt.isAdmin],

    // POST = Criar um nova conta
    app.post("/signup", usuarioLoginController.signUp);
    // POST = Logar no sistema
    app.post("/signin", usuarioLoginController.signIn);
    // GET = "Buscando" um usuario no BD pelo ID
    app.get("/userlogin/:idUserAcess", usuarioLoginController.findOne);
    // GET = "Buscando" todos os usuarios no BD
    app.get("/userlogin", usuarioLoginController.findAll);
    // PUT = Alterar os dados do usuario pelo ID 
    app.put("/userlogin/:idUserAcess", usuarioLoginController.update);
    // DELETE = Deletar o usuario do BD pelo ID
    app.delete("/userlogin/:idUserAcess", usuarioLoginController.delete);
    // DELETE = Deletar todos os usuarios no BD
    app.delete("/userlogin", usuarioLoginController.deleteAll);
}