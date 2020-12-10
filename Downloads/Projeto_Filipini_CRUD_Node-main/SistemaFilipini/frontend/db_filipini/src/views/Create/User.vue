<template>
  <v-card>
    <v-card-text class="pt-2">
      <v-form v-model="validForm">
        <b-row>
          <b-col cols="4">
            <v-select
              :items="t_cadastro"
              v-model="tipoCadastro"
              label="Tipo Cadastro"
              item-text="name1"
              item-valor="value1"
              :rules="typeCreateRules"
              width="500px"
            >
            </v-select>
          </b-col>
        </b-row>

        <h5>Dados Pessoais</h5>
        <hr />
        <b-row>
          <b-col cols="7">
            <v-text-field
              label="Nome"
              v-model="nome"
              :rules="nomeRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="5">
            <v-text-field
              label="Fone"
              v-model="fone"
              v-mask="foneMask"
              :rules="foneRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="4">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="3">
            <v-text-field
              label="Cpf"
              v-model="cpf"
              v-mask="cpfMask"
              :rules="cpfRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="5">
            <v-text-field
              label="Cnpj"
              v-model="cnpj"
              v-mask="cnpjMask"
              :rules="cnpjRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <hr />
        <h5>Endereço</h5>
        <b-row>
          <b-col cols="6">
            <v-text-field
              label="Rua"
              v-model="rua"
              :rules="ruaRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="2">
            <v-text-field
              label="Número"
              v-model="numero"
              v-mask="numeroMask"
              :rules="numeroRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="4">
            <v-text-field
              label="Bairro"
              v-model="bairro"
              :rules="bairroRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="6">
            <v-text-field
              label="Cidade"
              v-model="cidade"
              :rules="cidadeRules"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
          <b-col cols="3">
            <v-select
              :items="t_estado"
              v-model="estado"
              label="Estado"
              item-text="name3"
              item-valor="value3"
              :rules="estadoRules"
            >
            </v-select>
          </b-col>
          <b-col cols="3">
            <v-text-field
              label="CEP"
              v-model="cep"
              :rules="cepRules"
              v-mask="cepMask"
              required
              error-count="2"
            >
            </v-text-field>
          </b-col>
        </b-row>

        <!-- O botão será habilitado quando o formulário estiver OK -->
        <v-btn :disabled="!validForm" @click="adicionarUsuario" color="success"
          >Criar</v-btn
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
import UserService from "../../services/UserService.js";

export default {
  data() {
    return {
      tab: null,
      text: 'x.',
      // Export e Regras de cada campo do formulário
      tipoCadastro: "",
      t_cadastro: [
        { name1: "Cliente", value1: "cliente" },
        { name1: "Colaborador", value1: "colaborador" },
        { name1: "Fornecedor", value1: "fornecedor" },
      ],
      typeCreateRules: [
        (v) => !!v || "Selecione um tipo de cadastro!"
      ],     
      typeUserRules: [
        (v) => !!v || "Selecione um tipo de usuário!"
        ],
      nome: "",
      nomeRules: [
        (v) =>
          /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(
            v
          ) || "Digite o nome completo!",
      ],

      fone: "",
      foneMask: "(##) #####-####",
      foneRules: [
        // || "Telefone é inválido"],
      ],

      email: "",
      emailRules: [(v) => /.+@.+/.test(v) || "E-mail é inválido"],

      cpf: "",
      cpfMask: "###.###.###-##",
      cpfRules: [
        // || "CPF é inválido"],
      ],

      cnpjMask: "##.###.###/####-##",
      cnpj: "",
      cnpjRules: [
        // || "CNPJ é inválido"],
      ],

      rua: "",
      ruaRules: [
        (v) =>
          /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(
            v
          ) || "Digite o nome completo da rua!",
      ],

      numero: "",
      numeroMask: "####",
      numeroRules: [
        // (v) => /\D/g.test(v) || "Somente números!"
      ],

      bairro: "",
      bairroRules: [
        (v) =>
          /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(
            v
          ) || "Digite o nome do bairro!",
      ],

      cidade: "",
      cidadeRules: [(v) => !!v || "Digite o nome da cidade!"],

      estado: "",
      t_estado: [
        { name3: "Acre", value3: "AC" },
        { name3: "Alagoas", value3: "AL" },
        { name3: "Amapá", value3: "AP" },
        { name3: "Amazonas", value3: "AM" },
        { name3: "Bahia", value3: "BA" },
        { name3: "Ceará", value3: "CE" },
        { name3: "Distrito Federal", value3: "DF" },
        { name3: "Espírito Santo", value3: "ES" },
        { name3: "Goiás", value3: "GO" },
        { name3: "Maranhão", value3: "MA" },
        { name3: "Mato Grosso", value3: "MT" },
        { name3: "Mato Grosso do Sul", value3: "MS" },
        { name3: "Minas Gerais", value3: "MG" },
        { name3: "Pará", value3: "PA" },
        { name3: "Paraíba", value3: "PB" },
        { name3: "Paraná", value3: "PR" },
        { name3: "Pernambuco", value3: "PE" },
        { name3: "Piauí", value3: "PI" },
        { name3: "Rio de Janeiro", value3: "RJ" },
        { name3: "Rio Grande do Norte", value3: "RN" },
        { name3: "Rio Grande do Sul", value3: "RS" },
        { name3: "Rondônia", value3: "RO" },
        { name3: "Roraima", value3: "RR" },
        { name3: "Santa Catarina", value3: "SC" },
        { name3: "São Paulo", value3: "SP" },
        { name3: "Sergipe", value3: "SE" },
        { name3: "Tocantins", value3: "TO" },
      ],
      estadoRules: [(v) => !!v || "Selecione o estado!"],

      cep: "",
      cepMask: "#####-###",
      cepRules: [
        //   (v) => /\D/g.test(v)
        // (v) => /^(\d{2})(\d)/.test(v),
        // (v) => /\.(\d{3})(\d)/.test(v),
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
        tipoCadastro: this.tipoCadastro,
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