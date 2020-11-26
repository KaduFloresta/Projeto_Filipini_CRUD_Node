<template>
  <v-app>
    <div>
      <!-- v-if="isLogged" -->
      <b-navbar  toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="#">
          <img
            src="../src/assets/salame.png"
            class="d-inline-block align-top"
            alt="Kitten"
            width="50px"
          />
          Embutidos Filipini
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="">Home</b-nav-item>
            <b-nav-item href="#">Cadastro</b-nav-item>
            <b-nav-item href="#">Consulta</b-nav-item>
            <b-nav-item href="#">Vendas</b-nav-item>
            <b-nav-item href="#">Sobre</b-nav-item>
            <v-btn text @click="logOut">
          <v-icon left dark>mdi-sign-out-alt</v-icon>

          Sair

        </v-btn>
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
import AuthService from "./services/AuthService.js";

export default {
  name: "App",
  components: {},

  datax: () => ({
    icons: ["mdi-facebook", "mdi-gmail", "mdi-whatsapp"],
  }),

  mounted() {
    this.verifySignedIn();
  },

  method: {
    logout() {
      AuthService.logOut();
      this.verifySignedIn();
      this.$router.push({name:"Home"});
    },

    verifySignedIn() {
      if (AuthService.isSignedIn()) 
        this.islogged = true;
      else 
        this.islogged = false;
    },
  },

  data() {
    return {
      islogged: false,
    };
  },
};
</script>
