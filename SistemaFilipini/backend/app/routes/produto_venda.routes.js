module.exports = app => {
    const produto_vendaController = require("../controllers/produto_venda.controller.js");

    // Padrões do HTTP

    // POST = Enviando dados para a API 
    app.post("/produtos_vendas", produto_vendaController.create);

    // GET = Resgatando dados da API
    app.get("/produtos_vendas", produto_vendaController.findAll);

    // Select a partir do ID da tabela, do ID do pedido e do ID do produto
    // Localhost:3000/produtos/venda/4 = seleciona todos os produtos ID=4 dentro dos pedidos 
    app.get("/produtos_vendas/:produtoVendaId", produto_vendaController.findOne);

    // Localhost:3000/produtos/venda/10 = seleciona o produtos_vendas do produto com ID=10
    app.get("/produtos_vendas/venda/:vendaId", produto_vendaController.findByPedido);

    // Localhost:3000/produtos/venda/2 = seleciona o produtos_vendas do produto com ID=2
    app.get("/produtos_vendas/venda/:produtoId", produto_vendaController.findByProduto);

    // PUT = Enviar dados de atualização
    app.put("/produtos_vendas/:produtoVendaId", produto_vendaController.update);

    // DELETE = Deletar dados 
    // Localhost:3000/produtos/venda/4 = deleta todos os produtos ID=4 dentro dos pedidos 
    app.delete("/produtos_vendas/:produtoVendaId", produto_vendaController.delete);

    // Localhost:3000/produtos/venda/10 = deleta o produtos_vendas do produto com ID=10
    app.delete("/produtos_vendas/venda/:vendaId", produto_vendaController.deleteByPedido);
    
    // Localhost:3000/produtos/venda/2 = deleta o produtos_vendas do produto com ID=2
    app.delete("/produtos_vendas/venda/:produtoId", produto_vendaController.deleteByProduto);

    app.delete("/produtos_vendas", produto_vendaController.deleteAll);
}