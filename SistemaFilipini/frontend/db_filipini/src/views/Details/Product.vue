<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5 class="text-danger">Atualizar Produto</h5>
        <hr />
        <b-row>
          <b-col cols="7">
            <v-text-field
              v-model="produto.nome"
              :rules="[(v) => !!v || 'Nome é um campo obrigatório']"
              label="Nome"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="5">
            <v-text-field
              v-model="produto.marca"
              :rules="[(v) => !!v || 'Marca é um campo obrigatório']"
              label="Marca"
              required
            >
            </v-text-field>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="5">
            <v-text-field
              v-model="produto.fornecedor"
              :rules="[(v) => !!v || 'Fornecedor é um campo obrigatório']"
              label="Fornecedor"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              v-model="produto.validade"
              :rules="[(v) => !!v || 'Validade é um campo obrigatório']"
              v-mask="validadeMask"
              label="Validade"
              required
            >
            </v-text-field>
          </b-col>
          <b-col cols="3">
            <v-text-field
              v-model="produto.valor"
              :rules="[(v) => !!v || 'Preço é um campo obrigatório']"
              label="Valor"
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

          <!-- O botão será habilitado quando o formulário estiver OK -->
          <v-btn
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
      produto: null,
      msgSucesso: "",
      msgErro: "",
      validadeMask: "##/##/####",
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
          this.$router.push({ name: "ListProduct" });
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    voltar() {
      this.$router.push('ListProduct')
    }
  },
};
</script>