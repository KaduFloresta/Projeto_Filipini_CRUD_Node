<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5 class="text-danger">Dados do Produto</h5>
        <hr />

        <b-row>
          <b-col cols="7">
            <v-text-field
              class="py-0"
              label="Nome do Produto"
              v-model="nome"
              :rules="[
              (v) => /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(v) || 'Digite o nome completo do produto!',
              (v) => !!v || 'Nome do Produto é um campo obrigatório!']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="5">
            <v-text-field
              class="py-0"
              label="Marca"
              v-model="marca"
              :rules="[(v) => !!v || 'Marca é um campo obrigatório']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="5">
            <v-text-field
              class="py-0"
              label="Fornecedor"
              v-model="fornecedor"
              :rules="[(v) => !!v || 'Fornecedor é um campo obrigatório']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              class="py-0"
              label="Validade"
              v-model="validade"
              v-mask="['##/##/####']"
              :rules="[(v) => !!v || 'Validade é um campo obrigatório']"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="3">
            <v-text-field
              class="py-0"
              label="Preço"
              v-model="valor"
              :rules="[(v) => !!v || 'Preço é um campo obrigatório']"
              type="number"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <div class="mx-auto" style="width: 150px">
          <!-- O botão será habilitado quando o formulário estiver OK -->
          <v-btn
            :disabled="!validForm"
            @click="adicionarProduto"
            color="success"
            >Criar Produto
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
  name: "CreateProduct",
  data() {
    return {
      validForm: "",
      nome: "",
      marca: "",
      fornecedor: "",
      validade: "",
      valor: "",
      msgSucesso: "",
      msgErro: "",
    };
  },
  methods: {
    adicionarProduto() {
      this.msgSucesso = "";
      this.msgErro = "";
      let dados = {
        nome: this.nome,
        marca: this.marca,
        fornecedor: this.fornecedor,
        validade: this.validade,
        valor: this.valor,
      };
      ProductService.create(dados)
        .then((response) => {
          this.msgSucesso = "O Produto " + response.data.nome + " foi criado!";
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