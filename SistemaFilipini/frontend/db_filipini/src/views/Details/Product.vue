<template>
  <div class="form-produto mt-3 mx-auto">
    <p class="headline">Adicionar Produto</p>

    <div>
      <v-form v-model="formValidado">
        <v-text-field
          v-model="produto.nome"
          :rules="[(v) => !!v || 'Nome é um campo obrigatório']"
          label="Nome"
          required>
        </v-text-field>

        <v-text-field
          v-model="produto.marca"
          :rules="[(v) => !!v || 'Marca é um campo obrigatório']"
          label="Nome"
          required>
        </v-text-field>
        
        <v-text-field
          v-model="produto.fornecedor"
          :rules="[(v) => !!v || 'Fornecedor é um campo obrigatório']"
          label="Nome"
          required>
        </v-text-field>

        <v-text-field
          v-model="produto.validade"
          :rules="[(v) => !!v || 'Validade é um campo obrigatório']"
          label="Nome"
          required>
        </v-text-field>

        <v-text-field
          v-model="produto.preco"
          :rules="[(v) => !!v || 'Preço é um campo obrigatório']"
          type="number"
          label="Valor"
          required>
        </v-text-field>

        <v-divider class="my-5"></v-divider>

        <v-btn color="error" small class="mr-2" @click="deletarProduto">
            Excluir
        </v-btn>

        <v-btn color="success" small @click="atualizarProduto">
            Atualizar 
        </v-btn>

        <v-alert text
            v-if="msgSucesso != ''"
            color="teal"
            icon="mdi-account-check">
            {{ msgSucesso }}
        </v-alert>

        <v-alert v-if="msgErro != ''" text type="error" icon="mdi-account-remove">
            {{ msgErro }}
        </v-alert>

      </v-form>
    </div>
  </div>
    
</template>

<script>
import ProductService from "../../services/ProductService.js";
export default {
    data() {
        return {
            produto: null,
            msgSucesso: "",
            msgErro: ""
        }
    },
    mounted(){
        this.buscarProduto(this.$route.params.id);
    },
    methods: {
        buscarProduto(id){
            ProductService.get(id)
            .then(response => {
                this.produto = response.data;
            })
            .catch(e => console.log(e));
        },
        atualizarProduto(){
            ProductService.update(this.produto.id, this.produto)
            .then(response => {
                this.msgSucesso = response.data;
                this.$router.push({name: "ListProducts"});
            })
            .catch(e => {
                this.msgErro = e;
                console.log(e);
            });
        },
        deletarProduto(){
            ProductService.delete(this.$route.params.id)
            .then((response) => {
                console.log(response);
                this.$router.push({name: "ListProducts"});
            })
            .catch(e => {
                console.log(e);
            })
        },
    }
    
}