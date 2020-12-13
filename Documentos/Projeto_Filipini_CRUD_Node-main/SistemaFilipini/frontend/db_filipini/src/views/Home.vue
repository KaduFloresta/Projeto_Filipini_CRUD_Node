<template>
  <div>

    <v-img src="assets\salame.png" width="300" borderradius="5px">
      <div class="fill-height repeating-gradient"></div>
    </v-img>

    <b-container fluid class="p-4 bg-dark">
  <b-row>
    <b-col>
        <b-img
        thumbnail fluid
          :src="require('../assets/produtos.jpg')"
          alt="Image 1"
          width="300">
          </b-img>
   </b-col>

   <b-col>
        <b-img
        thumbnail fluid
          :src="require('../assets/produtos1.jpg')"
          alt="Image 1"
          width="300">
          </b-img>
   </b-col>

   <b-col>
        <b-img
        thumbnail fluid
          :src="require('../assets/produtos2.jpg')"
          alt="Image 2"
          width="300">
          </b-img>
   </b-col>

   <b-col>
        <b-img
        thumbnail fluid
          :src="require('../assets/produtos3.jpg')"
          alt="Image 3"
          width="300">
          </b-img>
   </b-col>
  </b-row>
</b-container>

      <v-col class="mb-4">
        <h3 class="display-2 font-weight-bold my-3">
          Bem Vindo!
        </h3>

        <h5 class="subheading font-weight-regular">
          Empresa da família Filipini, salame colônial, banha, torresmo e murcilha.
        </h5>
      </v-col>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
