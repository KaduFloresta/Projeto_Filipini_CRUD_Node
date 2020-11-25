<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <h5>Dados do Produto</h5>
        <hr />
        <b-row>
          <b-col cols="7">
            <v-text-field
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
              label="Preço"
              v-model="preco"
              v-mask="precoMask"
              :rules="precoRules"
              type="number"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <hr />
        <!-- O botão será habilitado quando o formulário estiver OK -->
        <v-btn :disabled="!validForm" @click="adicionarProduto" color="success"
          >Criar Produto</v-btn
        >
      </v-form>
    </v-card-text>

    <v-alert
      v-if="msgSucesso != ''"
      color="green"
      icon="$mdiAccount"
      type="success"
      >{{ msgSucesso }}
    </v-alert>

    <v-alert 
      v-if="msgErro != ''" 
      type="error"
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
      ],
      marca: "",
      marcaRules: [        
      ],
      fornecedor: "",
      fornecedorRules: [        
      ],
      validade: "",
      validadeMask: "##/##/####",
      validadeRules: [        
      ],
      preco: "",
      precoMask: "R$ ##,##",
      precoRules: [        
      ],
    };
  },
  methods: {
    adicionarProduto() {
      var produto = {
        nome: this.nome,
        marca: this.marca,
        fornecedor: this.fornecedor,
        validade: this.validade,
        preco: this.preco,
      };
      ProductService.create(produto)
        .then(response => {
          this.msgSucesso = "O Produto " + response.data.nome + " foi criado!";
        })
        .catch(e => {
          this.msgErro = e;
          console.log(e);
        });
    },
  },
};
</script>