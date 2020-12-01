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
              :rules="nomeRules"
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
              :rules="marcaRules"
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
              :rules="fornecedorRules"
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
              v-mask="validadeMask"
              :rules="validadeRules"
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
              v-mask="valorMask"
              :rules="valorRules"
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
  name: "create-product",
  data() {
    return {
      nome: "",
      nomeRules: [   
        (v) => !!v || "Descreva o produto!",     
      ],
      marca: "",
      marcaRules: [   
        (v) => !!v || "Digite a marca do produto!",     
      ],
      fornecedor: "",
      fornecedorRules: [  
        (v) => !!v || "Digite o fornecedor do produto!",       
      ],
      validade: "",
      validadeMask: "##/##/####",
      validadeRules: [   
        (v) => !!v || "Digite a validade do produto!",      
      ],
      valor: "",
      valorRules: [   
        (v) => !!v || "Digite o valor do produto!",      
      ],
      validForm: "",
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
         })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>