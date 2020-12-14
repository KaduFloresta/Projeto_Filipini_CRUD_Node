<template>
  <v-card>
    <v-card-text class="mx-auto mt2">
      <v-form>
        <h5 class="text-danger">Lista de Vendas</h5>
        <hr />
        <v-data-table
          :headers="cabecalho"
          :items="vendas"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.acoes`]="{ item }">
            <v-btn
              color="warning"
              small
              class="mr-2"
              @click="editarVendas(item.id)"
              ><v-icon small class="mr-1">mdi-pencil</v-icon>Atualizar
            </v-btn>

            <v-btn
              color="error"
              small
              class="mr-2"
              @click="deletarVenda(item.id)"
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
import ShopService from "../../services/ShopService.js";

export default {
  data() {
    return {
      name: "ListShop",
      msgSucesso: "",
      msgErro: "",

      vendas: [],
      cabecalho: [
        {
          text: "ID da Venda",
          align: "center",
          sortable: true,
          value: "idVendas"
        },
        {
          text: "Forma de Pgto",
          align: "center",
          sortable: true,
          value: "formaPgto",
        },
        {
          text: "ID do Cliente",
          align: "center",
          sortable: true,
          value: "User_idUser",
        },
        // {
        //   text: "Total",
        //   align: "center",
        //   sortable: true,
        //   value: "total",
        // },
        // {
        //   text: "Data",
        //   align: "center",
        //   sortable: true,
        //   value: "data",
        // },
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
    this.buscarVenda();
  },

  methods: {
    buscarVenda() {
      ShopService.getAll()
        .then((response) => {
          this.vendas = response.data.map(this.formatarVenda);
        })
        .catch((e) => console.log(e));
    },

    formatarVenda(vendas) {
      return {
        id: vendas.idVendas,
        formaPgto: vendas.formaPgto,
        User_idUser: vendas.User_idUser,
      };
    },

    deletarVenda(id) {
      ShopService.delete(id)
        .then((response) => {
          if (confirm("Tem certeza que deseja excluir essa venda?")) {
            console.log(response);
            this.buscarVenda();
            this.msgSucesso = "A venda foi deletada com sucesso!";
          }
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    editarVendas(id) {
      this.$router.push({ name: "DetailShop", params: { id: id } });
    },
  },
};
</script>