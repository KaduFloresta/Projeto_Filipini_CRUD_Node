<template>
  <v-card>
    <v-card-text class="mx-auto mt2">
      <v-form>
        <h5 class="text-danger">Lista de Produtos</h5>
        <hr />
        <v-data-table
          :headers="cabecalho"
          :items="produtos"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.acoes`]="{ item }">
            <v-btn
              color="warning"
              small
              class="mr-2"
              @click="editarProduto(item.id)"
              ><v-icon small class="mr-1">mdi-pencil</v-icon>Atualizar
            </v-btn>

            <v-btn
              color="error"
              small
              class="mr-2"
              @click="deletarProduto(item.id)"
              width="120"
              ><v-icon small class="mr-1">mdi-delete</v-icon>Excluir
            </v-btn>
          </template>
        </v-data-table>
      </v-form>
      <v-alert
        v-if="msgSucesso != ''"
        color="green"
        icon="mdi-account-check"
        type="success"
        >{{ msgSucesso }}
      </v-alert>

      <v-alert 
        v-if="msgErro != ''" 
        type="error" 
        icon="mdi-alert-circle"
        >{{ msgErro }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import ProductService from "../../services/ProductService.js";

export default {
  data() {
    return {
      name: "ListUser",
      msgSucesso: "",
      msgErro: "",

      produtos: [],
      cabecalho: [
        {
          text: "Nome",
          align: "center",
          sortable: true,
          value: "nome",
        },
        {
          text: "Marca",
          align: "center",
          sortable: true,
          value: "marca",
        },
        {
          text: "Fornecedor",
          align: "center",
          sortable: true,
          value: "fornecedor",
        },
        {
          text: "Validade",
          align: "center",
          sortable: true,
          value: "validade",
        },
        {
          text: "Preço",
          align: "center",
          sortable: true,
          value: "valor",
        },
        {
          text: "Ação",
          align: "center",
          sortable: false,
          value: "acoes",
        },
      ],
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    buscarProduto() {
      ProductService.getAll()
        .then((response) => {
          this.produtos = response.data.map(this.formatarProduto);
        })
        .catch((e) => console.log(e));
    },

    formatarProduto(produto) {
      return {
        id: produto.idProduto,
        nome: produto.nome,
        marca: produto.marca,
        fornecedor: produto.fornecedor,
        validade: produto.validade,
        valor: produto.valor,
      };
    },

    deletarProduto(id) {
      ProductService.delete(id)
        .then((response) => {
          if (confirm("Tem certeza que deseja excluir esse produto?")) {
            console.log(response);
            this.buscarProduto();
            this.msgSucesso = "O Produto foi deletado com sucesso!";
          }
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    editarProduto(id) {
      this.$router.push({ name: "DetailProduct", params: { id: id } });
    },
  },
};
</script>