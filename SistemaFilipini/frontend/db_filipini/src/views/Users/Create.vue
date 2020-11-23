<template>
  <v-layout d-flex align-center justify-center fill-height>
    <v-flex xs12 align-center justify-center>
      <v-card>
        <v-card-text class="pt-2">
          <v-form v-model="validForm">
            <v-text-field
              label="login"
              v-model="login"
              :rules="loginRules"
              required
              error-count="2"
            >
            </v-text-field>

            <v-text-field
              label="senha"
              v-model="senha"
              min="8"
              counter
              :rules="passwrodRules"
              type="password"
              error-count="2"
              required
            >
            </v-text-field>

            <v-select
              :items="itens"
              v-model="tipo"
              label="Tipo de Usuário"
              item-text="name"
              item-valor="value"
              :rules="typeUserRules"
            >
            </v-select>

            <!-- O botão será habilitado quando o formulário estiver OK -->
            <v-btn
              :disabled="!validForm"
              @click="adicionarUsuario"
              color="success"
              >Criar Usuário</v-btn
            >
          </v-form>
        </v-card-text>
        <v-alert v-if="msgSucesso != ''" text dense color="teal" icon="account-check-outline" border="left">
          {{msgSucesso}}
        </v-alert>
        <v-alert v-if="msgErro != ''" text prominent type="error" icon="alert-circle-outline">
          {{msgErro}}
        </v-alert>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from "../../services/UserService.js";

export default {
  data() {
    return {
      email: "",
      senha: "",
      tipo: "",
      validForm: "",
      msgSucesso: "",
      msgErro: "",
      itens: [
        { name: "Administrador", value: "admin" },
        { name: "Funcionário", value: "funcionario" },
        { name: "Fornecedor", value: "fornecedor" },
      ],

      // Regras de cada campo do formulário
      loginRules: [
        (v) => !!v || "Campo Vazio!",
        (v) => (v && v.length >= 5) || "Login com pelo menos 5 caracteres!",
      ],

      passwrodRules: [
        (v) => !!v || "Campo Vazio!",
        (v) => (v && v.length >= 8) || "Senha com pelo menos 8 caracteres!",
      ],

      typeUserRules: [(v) => !!v || "Selecione um tipo de usuário!"],
    };
  },

  methods: {
    adicionarUsuario: function () {
      this.msgSucesso = "";
      this.msgErro = "";
      let dados = {
        login: this.login,
        senha: this.senha,
        tipo: this.tipo,
      };
      UserService.signup(dados)
        .then((response) => {
          this.msgSucesso = response.data;
        })
        .catch((e) => {
          this.msgErro = e;
        });
    },
  },
};
</script>