<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <b-row>
          <b-col cols="4">
            <v-text-field
              label="Login"
              v-model="email"
              :rules="emailRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
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
              :items="t_usuario"
              v-model="tipoUsuario"
              label="Tipo Usuário"
              item-text="name2"
              item-valor="value2"
              :rules="typeUserRules"
            >
            </v-select>
          </b-col>
        </b-row>

        <!-- O botão será habilitado quando o formulário estiver OK -->
        <v-btn :disabled="!validForm" @click="adicionarUsuario" color="success"
          >Criar Usuário</v-btn
        >
      </v-form>
    </v-card-text>

    <v-alert
        v-if="msgSucesso != ''"
        color="green"
        icon="$mdiAccount"
        type="success"
        >{{ msgSucesso }}
      </v-alert
    >

    <v-alert 
        v-if="msgErro != ''"
        type="error" 
        >{{ msgErro }}
    </v-alert
    >
  </v-card>
</template>

<script>
import UserAccessService from "../../services/UserAccessService.js";

export default {
  data() {
    return {
      // Export e Regras de cada campo do formulário
      email: "",
      emailRules: [
        (v) => /.+@.+/.test(v) || "E-mail é inválido"
        ],

      senha: "",
      passwrodRules: [
        (v) => !!v || "Campo Vazio!",
        (v) => (v && v.length >= 8) || "Senha com pelo menos 8 caracteres!",
      ],

      tipoUsuario: "",
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
        tipoUsuario: this.tipoUsuario
      };
      UserService.signup(dados)
        .then((response) => {
          this.msgSucesso = response.data;
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>