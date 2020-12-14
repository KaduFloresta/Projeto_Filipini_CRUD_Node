<template>
  <v-card>
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
              :rules="[
                (v) => !!v || 'Email é um campo obrigatório',
                (v) => /.+@.+/.test(v) || 'E-mail é inválido',
              ]"
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
              :rules="[
                (v) => !!v || 'Campo Vazio!',
                (v) => (v && v.length >= 8) || 'Senha com pelo menos 8 caracteres!']"
              type="password"
              error-count="2"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-select
              class="py-0"
              label="Tipo Usuário"
              :items="t_usuario"
              v-model="tipoUser"
              item-text="name2"
              item-valor="value2"
              :rules="[
                (v) => !!v || 'Número é um campo obrigatório']"
              required
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
            >Criar Usuário
          </v-btn>
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

    <v-alert v-if="msgErro != ''" type="error" icon="mdi-alert-circle"
      >{{ msgErro }}
    </v-alert>
  </v-card>
</template>

<script>
import UserLoginService from "../../services/UserLoginService.js";

export default {
  name: "CreateLogin",

  data() {
    return {
      // Tabulação das pages
      tabIndex: 0,
      // Export e Regras de cada campo do formulário
      validForm: "",
      msgSucesso: "",
      msgErro: "",
      
      email: "",
      senha: "",

      tipoUser: "",
      t_usuario: [
        { name2: "Administrador", value2: "1" },
        { name2: "Colaborador", value2: "2" },
        { name2: "Fornecedor", value2: "3" },
      ],
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
          this.msgSucesso = "O usuário " + response.data.email + " foi criado!";
          this.$router.push({ name: "CreateUser" });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>