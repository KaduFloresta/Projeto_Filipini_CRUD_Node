const express = require("express");
const bodyParser = require("body-parser");

// APP = APLICATION
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao Sistema Filipini!" });
});

require("./app/routes/produto.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);
require("./app/routes/endereco.routes.js")(app);
require("./app/routes/venda.routes.js")(app);
require("./app/routes/produto_venda.routes.js")(app);

app.listen(3000, () => {
    console.log("Servidor Rodando!");
});
