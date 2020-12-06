<template>
  <v-layout flex align-center justify-center fill-height>
    <v-flex xs12 sm4 align-center justify-center>
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="3">
          <img
            src="../assets/salame.png"
            class="d-inline-block align-top"
            alt="Kitten"
            width="150px"
          />
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
          <h2 class="text-danger text-center py-3">Login Sistema Filipini</h2>
      <v-card>
        <v-card-text class="pt-5">
          <v-form v-model="validForm">
            <v-text-field label="E-mail" v-model="email" required>
            </v-text-field>

            <v-text-field
              label="Senha"
              v-model="senha"
              min="8"
              counter
              type="password"
              required
            >
            </v-text-field>

            <v-btn :disabled="!validForm" @click="login" color="primary"
              >Login
            </v-btn>
          </v-form>
        </v-card-text>

        <v-alert
          v-if="msgErro != ''"
          text
          prominent
          type="error"
          icon="mdi-account-remove"
        >
          {{ msgErro }}
        </v-alert>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
  data() {
    return {
      email: "",
      senha: "",
      msgErro: "",
      validForm: "",
    };
  },

  methods: {
    login() {
      this.msgErro = "";

      let dataUser = {
        email: this.email,
        senha: this.senha,
      };

      AuthService.signIn(dataUser)
        .then((response) => {
          AuthService.setUserData(response.data);
          this.$router.push({ name: "Home" });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>t>
