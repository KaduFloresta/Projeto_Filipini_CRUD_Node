const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao projeto" });
});

require("./app/routes/endereco.routes.js")(app);
require("./app/routes/produto_venda.routes.js")(app);//
require("./app/routes/produto.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);
require("./app/routes/usuarioLogin.routes.js")(app);
require("./app/routes/venda.routes.js")(app);//

app.listen(3000, () => {
    console.log("Servidor Rodando!");
});