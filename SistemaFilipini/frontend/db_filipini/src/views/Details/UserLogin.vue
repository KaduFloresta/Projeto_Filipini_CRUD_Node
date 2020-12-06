<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5 class="text-danger">Atualizar Usuário</h5>
        <hr />
        <b-row>
          <b-col cols="4">
            <v-text-field
              v-model="usuario.email"
              :rules="[(v) => !!v || 'Email é um campo obrigatório']"
              label="Login"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              v-model="usuario.senha"
              :rules="[(v) => !!v || 'Senha é um campo obrigatório']"
              label="Senha"
              required
            >
            </v-text-field>
          </b-col>
        
          <b-col cols="4">
            <v-select
              label="Tipo de Usuário de Acesso"
              :items="t_usuario"
              v-model="usuario.tipoUser"
              :rules="[(v) => !!v || 'Tpo de Usuário é um campo obrigatório']"
              item-text="name"
              item-valor="value"
            >
            </v-select>        
          </b-col>
        </b-row>

        <div class="mx-auto" style="width: 380px">
          <!-- O botão será habilitado quando o formulário estiver OK -->
          <v-btn
            color="success"
            small
            class="mr-2"
            @click="voltar()"
            width="150"
            height="40px"
            >Voltar
          </v-btn>

          <v-btn
            color="warning"
            small
            @click="atualizarUsuario"
            width="150"
            height="40px"
            >Atualizar
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

    <v-alert 
      v-if="msgErro != ''" 
      type="error" 
      icon="mdi-alert-circle"
      >{{ msgErro }}
    </v-alert>
  </v-card>
</template>

<script>
import UserLoginService from "../../services/UserLoginService.js";

export default {
  data() {
    return {
      usuario: null,
      msgSucesso: "",
      msgErro: "",

      tipoUser: "",
      t_usuario: [
        { name: "Administrador", value: 1 },
        { name: "Colaborador", value: 2 },
        { name: "Fornecedor", value: 3 },
      ],
    };
  },

  mounted() {
    this.buscarUsuario(this.$route.params.id);
  },

  methods: {
    buscarUsuario(id) {
      UserLoginService.get(id)
        .then((response) => {
          this.usuario = response.data;
        })
        .catch((e) => console.log(e));
    },
    atualizarUsuario() {
      UserLoginService.update(this.usuario.idUserAcess, this.usuario)
        .then((response) => {
          this.msgSucesso = "O usuário " + response.data.email + " foi atualizado!";
          this.$router.push({ name: "ListUser" });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    voltar() {
      this.$router.push('ListUser')
    }
  },
};
</script>