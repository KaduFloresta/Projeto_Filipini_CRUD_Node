<template>
  <div class="about">
    <h1 class="text-center">SABOR é o nosso lema!</h1>
    <v-row class="pl-16">
      <v-col cols="6" sm="4">
        <b-img
          v-bind="mainProps"
          :src="require('../assets/peperone.jpg')"
          rounded
          alt="Rounded image"
          width="250"
          height="140"
        >
        </b-img>
      </v-col>

      <v-col cols="6" sm="4">
        <b-img
          v-bind="mainProps"
          :src="require('../assets/salame.jpg')"
          rounded
          alt="Rounded image"
          width="250"
        >
        </b-img>
      </v-col>

      <v-col cols="6" sm="4">
        <b-img
          v-bind="mainProps"
          :src="require('../assets/murcilha.jpg')"
          rounded
          alt="Rounded image"
          width="250"
          height="140"
        >
        </b-img>
      </v-col>
    </v-row>

    <h5 class="text-center">
      Somos uma empresa familiar que atua no mercado alimentício há mais de 10
      anos, sempre visando a qualidade e produzindo com todo carinho e cuidado
      aquele prazer em forma de comida que estará na mesa da sua família.
    </h5>

    <v-row class="pl-1">
      <v-col cols="6" sm="4">
        <b-img
          center
          v-bind="mainProps"
          :src="require('../assets/torresmo1.jpg')"
          rounded
          alt="Rounded image"
          width="250"
        >
        </b-img>
      </v-col>

      <v-col cols="6" sm="4">
        <b-img
          center
          v-bind="mainProps"
          :src="require('../assets/torresmo.jpg')"
          rounded
          alt="Rounded image"
          width="250"
        >
        </b-img>
      </v-col>

      <b-img
        center
        v-bind="mainProps"
        :src="require('../assets/torresmo2.jpg')"
        rounded
        alt="Rounded image"
        width="250"
        height="160"
      >
      </b-img>
    </v-row>

    <h4 class="text-center">Que tal um torresminho crocante?</h4>
  </div>
</template>
