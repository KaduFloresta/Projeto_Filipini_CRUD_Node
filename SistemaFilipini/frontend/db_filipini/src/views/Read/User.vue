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

            <b-tab title="Usuários">
              <b-card>
                <v-card-text class="mx-auto mt2">
                  <v-form>
                    <h5 class="text-danger">Lista de Usuários</h5>
                    <hr />
                    <v-data-table
                      :headers="cabecalho"
                      :items="usuarios"
                      disable-pagination
                      :hide-default-footer="true"
                    >
                      <template v-slot:[`item.acoes`]="{ item }">
                        <v-btn
                          color="warning"
                          small
                          class="mr-2"
                          @click="editarUsuario(item.id)"
                          ><v-icon small class="mr-1">mdi-pencil</v-icon
                          >Atualizar
                        </v-btn>

                        <v-btn
                          color="error"
                          small
                          class="mr-2"
                          @click="deletarUsuario(item.id)"
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
              </b-card>
            </b-tab>

            <b-tab title="Produtos">
              <Product />
            </b-tab>

            <b-tab title="User Login">
              <UserLogin />
            </b-tab>

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
import UserService from "../../services/UserService.js";
import UserLogin from "../Read/UserLogin.vue";
import Product from "../Read/Product.vue";

export default {
  components: {
    UserLogin,
    Product,
  },
  data() {
    return {
      tabIndex: 0,
      name: "ListProduct",
      msgSucesso: "",
      msgErro: "",

      usuarios: [],
      cabecalho: [
        {
          text: "Tipo Usuário",
          align: "center",
          sortable: true,
          value: "tipoUser",
        },
        {
          text: "Nome",
          align: "center",
          sortable: true,
          value: "nome",
        },
        {
          text: "CPF",
          align: "center",
          sortable: true,
          value: "cpf",
        },
        {
          text: "CNPJ",
          align: "center",
          sortable: true,
          value: "cnpj",
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
    this.buscarUsuario();
  },

  methods: {
    buscarUsuario() {
      UserService.getAll()
        .then((response) => {
          this.usuarios = response.data.map(this.formatarUsuario);
        })
        .catch((e) => console.log(e));
    },

    formatarUsuario(user) {
      return {
        id: user.idUser,
        tipoUser: user.tipoUser,
        nome: user.nome,
        email: user.email,
        fone: user.fone,
        cpf: user.cpf,
        cnpj: user.cnpj,
        cep: user.cep,
        rua: user.rua,
        numero: user.numero,
        bairro: user.bairro,
        cidade: user.cidade,
        estado: user.estado,
      };
    },

    deletarUsuario(id) {
      UserService.delete(id)
        .then((response) => {
          if (confirm("Tem certeza que deseja excluir esse usuário?")) {
            console.log(response);
            this.buscarUsuario();
            this.msgSucesso = "O Usuário foi deletado com sucesso!";
          }
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    editarUsuario(id) {
      this.$router.push({ name: "DetailUser", params: { id: id } });
    },
  },
};
</script>