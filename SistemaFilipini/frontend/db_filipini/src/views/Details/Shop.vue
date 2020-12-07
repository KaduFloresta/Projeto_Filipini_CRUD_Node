<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5 class="text-danger">Atualizar Produto</h5>
        <hr />
        <b-row>
          <b-col cols="4">
            <v-text-field
              label="ID da Venda"
              v-model="vendas.idVendas"
              :rules="[
              (v) => /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(v) || 'Digite o nome completo do produto!',
              (v) => !!v || 'ID é um campo obrigatório']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              label="Forma de Pagto"
              v-model="vendas.formaPgto"
              :rules="[(v) => !!v || 'Forma de Pagto é um campo obrigatório']"
              required
            >
            </v-text-field>
          </b-col>
        
          <b-col cols="4">
            <v-text-field
              label="ID do Cliente"
              v-model="Vendas.User_idUser"
              :rules="[(v) => !!v || 'ID do Cliente é um campo obrigatório']"
              required
            >
            </v-text-field>
          </b-col>
        </b-row>

        <div class="mx-auto" style="width: 380px">          
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
            :disabled="!validForm"
            color="warning"
            small
            @click="atualizarVenda"
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
import ShopService from "../../services/ShopService.js";

export default {
  data() {
    return {
      validForm: "",
      vendas: null,
      msgSucesso: "",
      msgErro: "",
    };
  },

  mounted() {
    this.buscarVenda(this.$route.params.id);
  },

  methods: {
    buscarVenda(id) {
      ShopService.get(id)
        .then((response) => {
          this.vendas = response.data;
        })
        .catch((e) => console.log(e));
    },
    atualizarVenda() {
      ShopService.update(this.vendas.idVendas, this.vendas)
        .then((response) => {
          this.msgSucesso = "A venda " + response.data.nome + " foi atualizada!";
          this.$router.push({ name: 'CreateShop' });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    voltar() {
      this.$router.push("CreateShop");
    }
  },
};
</script>