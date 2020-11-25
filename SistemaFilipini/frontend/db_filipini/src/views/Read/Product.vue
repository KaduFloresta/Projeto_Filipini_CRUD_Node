<template>
  <v-card class="mx-auto">
    <v-card-title>Produtos</v-card-title>

    <v-data-table
      :headers="cabecalho"
      :items="produtos"
      disable-pagination
      :hide-default-footer="true"
    >
      <template v-slot:[`item.acoes`]="{ item }">
        <v-icon small class="mr-2" @click="editarProduto(item.id)"
          >mdi-pencil</v-icon
        >
        <v-icon @click="deletarProduto(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ProductService from "../../services/ProductService.js";

export default {
  data() {
    return {
      produtos: [],
      cabecalho: [
        { text: "Nome", align: "start", sortable: true, value: "nome" },
        { text: "Marca", sortable: true, value: "marca" },
        { text: "Fornecedor", sortable: true, value: "fornecedor" },
        { text: "Validade", sortable: true, value: "validade" },
        { text: "Preço", sortable: true, value: "preco" },
        { text: "Alterar/Deletar", sortable: false, value: "acoes" },
      ],
    };
  },

  mounted() {
    this.buscaProdutos();
  },

  methods: {
    buscaProdutos() {
      ProductService.getAll()
        .then((response) => {
          this.produtos = response.data.map(this.formatarProduto);
        })
        .catch((e) => console.log(e));
    },

    formatarProduto(produto) {
      return {
        id: produto.produtoId,
        nome: produto.nome,
        marca: produto.marca,
        fornecedor: produto.fornecedor,
        validade: produto.validade,
        preco: produto.preco,
      };
    },

    deletarProduto(id) {
      ProductService.delete(id).then((response) => {
        console.log(response);
        this.buscaProdutos();
      })
      .catch(e => {
        console.log(e);
      })
    },

    editarProduto(id){
      this.$route.push({name: "DetailProduct", params: {id: id}});
    }
  },
};
</script>