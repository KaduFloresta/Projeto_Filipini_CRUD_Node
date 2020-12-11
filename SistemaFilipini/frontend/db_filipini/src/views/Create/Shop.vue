<template>
  <div>
    <div>
      <!-- Tabs with card integration -->
      <b-card no-body>
        <b-tabs
          active-nav-item-class="font-weight-bold text-uppercase text-danger"
          active-tab-class="font-weight-bold text-success"
          content-class="mt-2"
          v-model="tabIndex"
          medium
          card
        >
          <v-card>
            <b-tab title="Checkout">
              <b-card>
                <v-card-text class="py-0">
                  <v-form v-model="validForm">
                    <h5 class="text-danger">Venda</h5>
                    <hr />
                    <b-row>
                      <b-col cols="4">
                        <v-select
                          class="py-0"
                          :items="t_cliente"
                          v-model="tipoCliente"
                          label="Seleione o Cliente"
                          item-text="name"
                          item-valor="value"
                          :rules="[
                            (v) => !!v || 'Selecione um cliente cadastrado!',
                          ]"
                          width="500px"
                        >
                        </v-select>
                      </b-col>
                    </b-row>

                    <h5 class="text-danger">Lista de Produtos</h5>
                    <hr />
                    <!-- <v-data-table
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
			><v-icon small class="mr-1">mdi-pencil</v-icon>
		</v-btn>

		<v-btn
			color="error"
			small
			class="mr-2"
			@click="deletarProduto(item.id)"
			><v-icon small class="mr-1">mdi-delete</v-icon>
		</v-btn>
		</template>
	</v-data-table> -->

                    <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :items="desserts"
                      :single-select="singleSelect"
                      item-key="name"
                      show-select
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-switch
                          v-model="singleSelect"
                          label="Single select"
                          class="pa-3"
                        ></v-switch>
                      </template>
                    </v-data-table>

                    <div class="mx-auto" style="width: 120px">
                      <!-- O botão será habilitado quando o formulário estiver OK -->
                      <v-btn
                        class="m-3"
                        :disabled="!validForm"
                        @click="adicionarUsuario"
                        color="Primary"
                        width="120px"
                        >Fazer Venda</v-btn
                      >
                    </div>
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
              </b-card>
            </b-tab>

            <b-tab title="Lista de Vendas">
              <Shop />
            </b-tab>

            <!-- <b-tab title="User Login">
<UserLogin />
</b-tab> -->

            <b-tab title="Info" disabled>
              <b-card> </b-card>
            </b-tab>
          </v-card>
        </b-tabs>
      </b-card>

      <!-- Control buttons-->
      <div class="text-center">
        <b-button-group class="mt-2">
          <b-button @click="tabIndex--">Previous</b-button>
          <b-button @click="tabIndex++">Next</b-button>
        </b-button-group>
        <div class="text-muted mb-2">Page {{ tabIndex }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Axios from "axios";
import ProductService from "../../services/ProductService.js";
import Shop from "../Read/Shop.vue";

export default {
  components: {
    Shop,
  },
  data() {
    return {
      // Teste de Lista com Checkbox
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          text: "Ação",
          align: "center",
          sortable: false,
          value: "acoes",
        },
      ],

      name: "CreateShop",
      // Tabulação das pages
      tabIndex: 0,
      // EXPORT USER LOGIN
      // Export e Regras de cada campo do formulário
      validForm: "",
      msgSucesso: "",
      msgErro: "",

      tipoCliente: "",
      t_cliente: [
        { name1: "Cliente", value1: "cliente" },
        { name1: "Colaborador", value1: "colaborador" },
        { name1: "Fornecedor", value1: "fornecedor" },
      ],

      // produtos: [],
      // cabecalho: [
      //   {
      //     text: "Nome",
      //     align: "center",
      //     sortable: true,
      //     value: "nome",
      //   },
      //   {
      //     text: "Validade",
      //     align: "center",
      //     sortable: true,
      //     value: "validade",
      //   },
      //   {
      //     text: "Preço",
      //     align: "center",
      //     sortable: true,
      //     value: "valor",
      //   },
      //   {
      //     text: "Quantidade",
      //     align: "center",
      //     sortable: false,
      //     value: "qtde",
      //   },
      //   {
      //     text: "Ação",
      //     align: "center",
      //     sortable: false,
      //     value: "acoes",
      //   },
      // ],
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