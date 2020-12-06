<template>
  <div>
    <div>
      <!-- Tabs with card integration -->
      <b-card no-body>
        <b-tabs
          active-nav-item-class="font-weight-bold text-uppercase text-danger"
          active-tab-class="font-weight-bold text-success"
          content-class="mt-2"
          v-model="tabIndex"
          medium
          card
        >
          <v-card>
            <b-tab title="Usuários">
              <b-card>
                <v-card-text class="py-0">
                  <v-form v-model="validForm">
                    <h5 class="text-danger">Cadastro do Usuário</h5>
                    <hr />
                    <b-row>
                      <b-col cols="4">
                        <v-select
                          class="py-0"
                          :items="t_cadastro"
                          v-model="tipoUser"
                          label="Tipo Cadastro"
                          item-text="name1"
                          item-valor="value1"
                          :rules="[
                            (v) =>!!v || 'Selecione um tipo de Usuário para cadastro!',
                          ]"
                          width="500px"
                        >
                        </v-select>
                      </b-col>
                    </b-row>

                    <h5 class="text-danger">Dados Pessoais</h5>
                    <hr />
                    <b-row>
                      <b-col cols="7">
                        <v-text-field
                          class="py-0"
                          label="Nome"
                          v-model="nome"
                          :rules="[
                            (v) => !!v || 'Nome é um campo obrigatório!',
                            (v) => /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(v) || 'Digite o nome completo!',
                          ]"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>
                      <b-col cols="5">
                        <v-text-field
                          class="py-0"
                          label="Fone"
                          v-model="fone"
                          v-mask="['(##) # ####-####']"
                          :rules="[(v) => !!v || 'Fone é um campo obrigatório']"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="4">
                        <v-text-field
                          class="py-0"
                          label="E-mail"
                          v-model="email"
                          :rules="[
                            (v) => !!v || 'Email é um campo obrigatório',
                            (v) => /.+@.+/.test(v) || 'E-mail é inválido',
                          ]"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>
                      <b-col cols="3">
                        <v-text-field
                          class="py-0"
                          label="CPF"
                          v-model="cpf"
                          v-mask="['###.###.###-##']"
                          :disabled="tipoUser == 'Fornecedor'"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>

                      <b-col cols="5">
                        <v-text-field
                          class="py-0"
                          label="CNPJ"
                          v-model="cnpj"
                          v-mask="['##.###.###/####-##']"
                          :disabled="tipoUser != 'Fornecedor'"
                          required
                          error-count="2"
                        >
                        </v-text-field>
                      </b-col>
                    </b-row>

                    <hr />
                    <h5 class="text-danger">Endereço</h5>
                    <form>
                      <b-row>
                        <b-col cols="3">
                          <v-text-field
                            class="py-0"
                            label="CEP"
                            v-model="cep"
                            :rules="[
                              (v) => !!v || 'CEP é um campo obrigatório',
                            ]"
                            v-mask="['#####-###']"
                            v-on:change="loadCep"
                            required
                            error-count="2"
                          >
                          </v-text-field>
                        </b-col>

                        <b-col cols="7">
                          <v-text-field
                            class="py-0"
                            label="Rua"
                            v-model="rua"
                            :rules="[
                              (v) => !!v || 'Rua é um campo obrigatório',
                              (v) => /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(v) || 'Digite o nome completo da rua!',
                            ]"
                            required
                            error-count="2"
                          >
                          </v-text-field>
                        </b-col>

                        <b-col cols="2">
                          <v-text-field
                            class="py-0"
                            label="Número"
                            v-model="numero"
                            :rules="[
                              (v) => !!v || 'Número é um campo obrigatório',
                            ]"
                            required
                            error-count="2"
                          >
                          </v-text-field>
                        </b-col>

                        <b-col cols="4">
                          <v-text-field
                            class="py-0"
                            label="Bairro"
                            v-model="bairro"
                            :rules="[
                              (v) => !!v || 'Bairro é um campo obrigatório',
                            ]"
                            required
                            error-count="2"
                          >
                          </v-text-field>
                        </b-col>

                        <b-col cols="4">
                          <v-text-field
                            class="py-0"
                            label="Cidade"
                            v-model="cidade"
                            :rules="[
                              (v) => !!v || 'Cidade é um campo obrigatório',
                            ]"
                            required
                            error-count="2"
                          >
                          </v-text-field>
                        </b-col>

                        <b-col cols="4">
                          <v-select
                            class="py-0"
                            label="Estado"
                            :items="t_estado"
                            v-model="estado"
                            :rules="[
                              (v) => !!v || 'Estado é um campo obrigatório',
                            ]"
                            item-text="name3"
                            item-valor="value3"
                          >
                          </v-select>
                        </b-col>
                      </b-row>
                    </form>

                    <div class="mx-auto" style="width: 120px">
                      <!-- O botão será habilitado quando o formulário estiver OK -->
                      <v-btn
                        class="mb-5"
                        :disabled="!validForm"
                        @click="adicionarUsuario"
                        color="success"
                        width="120px"
                        >Criar</v-btn
                      >
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
              </b-card>
            </b-tab>

            <b-tab title="Produtos">
              <Product />
            </b-tab>

            <b-tab title="User Login">
              <UserLogin />
            </b-tab>

            <b-tab title="Info" disabled>
              <b-card> </b-card>
            </b-tab>
          </v-card>
        </b-tabs>
      </b-card>

      <!-- Control buttons-->
      <div class="text-center">
        <b-button-group class="mt-2">
          <b-button @click="tabIndex--">Previous</b-button>
          <b-button @click="tabIndex++">Next</b-button>
        </b-button-group>
        <div class="text-muted mb-2">Page {{ tabIndex }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import UserService from "../../services/UserService.js";
import Product from "../Create/Product.vue";
import UserLogin from "../Create/UserLogin.vue";

export default {  
  components: {
    UserLogin,
    Product,
  },
  data() {
    return {
      name: "CreateUser",
      // Tabulação das pages
      tabIndex: 0,
      // EXPORT USER LOGIN
      // Export e Regras de cada campo do formulário
      validForm: "",
      msgSucesso: "",
      msgErro: "",

      tipoUser: "",
      t_cadastro: [
        { name1: "Cliente", value1: "cliente" },
        { name1: "Colaborador", value1: "colaborador" },
        { name1: "Fornecedor", value1: "fornecedor" },
      ],

      nome: "",
      fone: "",
      email: "",
      cpf: "",
      cnpj: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",

      estado: "",
      t_estado: [
        { name3: "AC", value3: "Acre" },
        { name3: "AL", value3: "Alagoas" },
        { name3: "AP", value3: "Amapá" },
        { name3: "AM", value3: "Amazonas" },
        { name3: "BA", value3: "Bahia" },
        { name3: "CE", value3: "Ceará" },
        { name3: "DF", value3: "Distrito Federal" },
        { name3: "ES", value3: "Espírito Santo" },
        { name3: "GO", value3: "Goiás" },
        { name3: "MA", value3: "Maranhão" },
        { name3: "MT", value3: "Mato Grosso" },
        { name3: "MS", value3: "Mato Grosso do Sul" },
        { name3: "MG", value3: "Minas Gerais" },
        { name3: "PA", value3: "Pará" },
        { name3: "PB", value3: "Paraíba" },
        { name3: "PR", value3: "Paraná" },
        { name3: "PE", value3: "Pernambuco" },
        { name3: "PI", value3: "Piauí" },
        { name3: "RJ", value3: "Rio de Janeiro" },
        { name3: "RN", value3: "Rio Grande do Norte" },
        { name3: "RS", value3: "Rio Grande do Sul" },
        { name3: "RO", value3: "Rondônia" },
        { name3: "RR", value3: "Roraima" },
        { name3: "SC", value3: "Santa Catarina" },
        { name3: "SP", value3: "São Paulo" },
        { name3: "SE", value3: "Sergipe" },
        { name3: "TO", value3: "Tocantins" },
      ],
    };
  },

  methods: {
    adicionarUsuario: function () {
      this.msgSucesso = "";
      this.msgErro = "";
      let dados = {
        tipoUser: this.tipoUser,
        nome: this.nome,
        email: this.email,
        fone: this.fone,
        cpf: this.cpf,
        cnpj: this.cnpj,
        rua: this.rua,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        estado: this.estado,
        cep: this.cep,
      };

      UserService.create(dados)
        .then((response) => {
          this.msgSucesso =
            "O Usuário " + response.data.nome + " foi criado com sucesso";
            this.$router.push({ tabIndex: 0})
        })
        .catch((e) => {
          this.msgErro = e;
          console.log(e);
        });
    },

    loadCep: function () {
      const url =
        "https://viacep.com.br/ws/" +
        this.cep.trim().replace(/[^0-9]/g, "") +
        "/json";
      Axios.get(url).then(
        function (response) {
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.cidade = response.data.localidade;
          this.estado = response.data.uf;
        }.bind(this)
      );
    },
  },
};
</script>