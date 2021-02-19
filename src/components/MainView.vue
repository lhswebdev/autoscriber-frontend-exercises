<template>
  <v-card color="#385F73" dark class="card">
    <v-card-title class="headline"
      >Welcome to LHS WebDev's PWA Demo</v-card-title
    >

    <v-card-subtitle>More content will be added soon.</v-card-subtitle>

    <v-card-actions>
      <v-btn text href="http://lhswebdev.github.io/" target="_blank"
        >Visit Website</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    APPNAME: 'WebDev PWA',
    drawer: false,
    navbarItems: [
      {
        title: 'Menu Item'
      }
    ]
  }),
  created() {
    document.title = this.APPNAME;
  }
};
</script>

<style>
</style>