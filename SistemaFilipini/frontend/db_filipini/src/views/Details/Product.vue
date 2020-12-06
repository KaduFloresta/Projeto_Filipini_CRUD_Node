<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5 class="text-danger">Atualizar Produto</h5>
        <hr />
        <b-row>
          <b-col cols="7">
            <v-text-field
              label="Nome do Produto"
              v-model="produto.nome"
              :rules="[
              (v) => /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(v) || 'Digite o nome completo do produto!',
              (v) => !!v || 'Nome do Produto é um campo obrigatório']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="5">
            <v-text-field
              label="Marca"
              v-model="produto.marca"
              :rules="[(v) => !!v || 'Marca é um campo obrigatório']"
              required
            >
            </v-text-field>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="5">
            <v-text-field
              label="Fornecedor"
              v-model="produto.fornecedor"
              :rules="[(v) => !!v || 'Fornecedor é um campo obrigatório']"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              label="Validade"
              v-model="produto.validade"
              v-mask="['##/##/####']"
              :rules="[(v) => !!v || 'Validade é um campo obrigatório']"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="3">
            <v-text-field
              label="Valor"
              v-model="produto.valor"
              :rules="[(v) => !!v || 'Preço é um campo obrigatório']"
              type="number"
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
            @click="atualizarProduto"
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
import ProductService from "../../services/ProductService.js";

export default {
  data() {
    return {
      validForm: "",
      produto: null,
      msgSucesso: "",
      msgErro: "",
    };
  },

  mounted() {
    this.buscarProduto(this.$route.params.id);
  },

  methods: {
    buscarProduto(id) {
      ProductService.get(id)
        .then((response) => {
          this.produto = response.data;
        })
        .catch((e) => console.log(e));
    },
    atualizarProduto() {
      ProductService.update(this.produto.idProduto, this.produto)
        .then((response) => {
          this.msgSucesso = "O Produto " + response.data.nome + " foi atualizado!";
          this.$router.push({ name: "ListUser" });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    voltar() {
      this.$router.push({ name: "ListUser" });
    }
  },
};
</script>