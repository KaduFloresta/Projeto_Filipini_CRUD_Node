const express = require("express");
const bodyParser = require("body-parser");

// APP = APLICATION
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Embutidos Filipini LTDA" });
});

require("./app/routes/produto.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);

app.listen(3000, () => {
    console.log("Servidor Rodando!");
});
