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
                <v-card-text class="pt-2">
                  <v-form v-model="validForm">
                    <h5 class="text-danger">Dados do Usuário</h5>
                    <hr />
                    <b-row>
                      <b-col cols="4">
                        <v-text-field
                          class="py-0"
                          label="Email"
                          v-model="email"
                          :rules="emailRules"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>
                      <b-col cols="4">
                        <v-text-field
                          class="py-0"
                          label="Senha"
                          v-model="senha"
                          min="8"
                          counter
                          :rules="passwrodRules"
                          type="password"
                          error-count="2"
                          required
                        >
                        </v-text-field>
                      </b-col>
                      <b-col cols="4">
                        <v-select
                          class="py-0"
                          :items="t_usuario"
                          v-model="tipoUser"
                          label="Tipo Usuário"
                          item-text="name2"
                          item-valor="value2"
                          :rules="typeUserRules"
                        >
                        </v-select>
                      </b-col>
                    </b-row>

                    <div class="mx-auto" style="width: 150px">
                      <!-- O botão será habilitado quando o formulário estiver OK -->
                      <v-btn
                        :disabled="!validForm"
                        @click="adicionarUsuario"
                        color="success"
                        >Criar Usuário</v-btn
                      >
                    </div>
                  </v-form>
                </v-card-text>

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
import User from "../Create/User.vue";
import Product from "../Create/Product.vue";

export default {
  name: "CreateUser",
  components: {
    User,
    Product,
  },
  data() {
    return {
      // Tabulação das pages
      tabIndex: 0,
      // Export e Regras de cada campo do formulário
      email: "",
      emailRules: [(v) => /.+@.+/.test(v) || "E-mail é inválido"],

      senha: "",
      passwrodRules: [
        (v) => !!v || "Campo Vazio!",
        (v) => (v && v.length >= 8) || "Senha com pelo menos 8 caracteres!",
      ],

      tipoUser: "",
      t_usuario: [
        { name2: "Administrador", value2: "admin" },
        { name2: "Colaborador", value2: "colaborador" },
        { name2: "Fornecedor", value2: "fornecedor" },
      ],
      validForm: "",
      msgSucesso: "",
      msgErro: "",
    };
  },

  methods: {
    adicionarUsuario: function () {
      this.msgSucesso = "";
      this.msgErro = "";
      let dados = {
        email: this.email,
        senha: this.senha,
        tipoUser: this.tipoUser,
      };
      UserLoginService.signup(dados)
        .then((response) => {
          this.msgSucesso = "O usuário " + response.data.nome + " foi criado!";
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>