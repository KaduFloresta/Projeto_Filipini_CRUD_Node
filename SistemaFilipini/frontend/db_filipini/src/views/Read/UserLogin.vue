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
              <User />
            </b-tab>

            <b-tab title="Produtos">
              <Product />
            </b-tab>

            <b-tab title="User Login">
              <b-card>
                <v-card-text class="mx-auto mt2">
                  <v-form>
                    <h5 class="text-danger">Lista de Usuários Acesso</h5>
                    <hr />
                    <v-data-table
                      :headers="cabecalho"
                      :items="usuarios"
                      disable-pagination
                      :hide-default-footer="true"
                    >
                      <template v-slot:[`item.acoes`]="{ item }">
                        <div class="mx-auto" style="width: 200px">
                          <v-btn
                            color="warning"
                            small
                            class="mr-2"
                            @click="editarUsuario(item.id)"
                            ><v-icon small> mdi-pencil</v-icon>
                          </v-btn>

                          <v-btn
                            color="error"
                            small
                            class="mr-2"
                            @click="deletarUsuario(item.id)"
                            ><v-icon small> mdi-delete</v-icon>
                          </v-btn>
                        </div>
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
import UserLoginService from "../../services/UserLoginService.js";
import User from "../Read/User.vue";
import Product from "../Read/Product.vue";

export default {
  components: {
    User,
    Product,
  },
  data() {
    return {
      name: "ListLogin",
      msgSucesso: "",
      msgErro: "",
      tabIndex: 0,

      usuarios: [],
      cabecalho: [
        {
          text: "Email",
          align: "center",
          sortable: true,
          value: "email",
        },
        {
          text: "Senha",
          align: "center",
          sortable: true,
          value: "senha",
        },
        {
          text: "Tipo de Usuário",
          align: "center",
          sortable: true,
          value: "tipoUser",
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
      UserLoginService.getAll()
        .then((response) => {
          this.usuarios = response.data.map(this.formatarUsuario);
        })
        .catch((e) => console.log(e));
    },

    formatarUsuario(usuario) {
      return {
        id: usuario.idUserAcess,
        email: usuario.email,
        senha: usuario.senha,
        tipoUser: usuario.tipoUser,
      };
    },

    deletarUsuario(id) {
      UserLoginService.delete(id)
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
      this.$router.push({ name: "DetailLogin", params: { id: id } });
    },
  },
};
</script>