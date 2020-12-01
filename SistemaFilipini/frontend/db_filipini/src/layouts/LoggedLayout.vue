<template>
  <v-app>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="#">
          <img
            src="../assets/salame.png"
            class="d-inline-block align-top"
            alt="Kitten"
            width="50px"
          />
          Embutidos Filipini
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href='/home'>
              <v-icon left dark>mdi-home</v-icon>Home
            </b-nav-item>
            <b-nav-item href="/createlogin">
              <v-icon left dark>mdi-form-select</v-icon>Cadastro
            </b-nav-item>
            <b-nav-item href="/listlogin">
              <v-icon left dark>mdi-list-status</v-icon>Consulta
            </b-nav-item>
            <b-nav-item href="/sends">
              <v-icon left dark>mdi-food</v-icon>Vendas
            </b-nav-item>
            <b-nav-item href="/about">
              <v-icon left dark>mdi-information</v-icon>Sobre
            </b-nav-item>
            <b-nav-item @click="logOut" href="#">
              <v-icon left dark>mdi-exit-to-app</v-icon>SAIR
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="red accent-4">
          <strong class="subheading">Fone: (46) 99909-9002</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-8" dark icon>
            <v-icon size="30px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Embutidos Filipini ®</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
  name: "App",

  components: {},

  mounted() {},

  methods: {
    logout() {
      AuthService.logOut();
      this.$router.push({ name: "Login" });
    },
  },

  data: () => ({
    icons: ["mdi-facebook", "mdi-gmail", "mdi-whatsapp"],
  }),
};
</script>
