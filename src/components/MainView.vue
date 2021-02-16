<template>
  <v-app>
    <v-app-bar dark color="blue" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ APPNAME }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-switch
        class="navSwitch"
        v-model="$vuetify.theme.dark"
        color="white"
        label="Dark Theme"
      ></v-switch>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item v-for="(item, index) in navbarItems" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-row dense>
        <v-col cols="12">
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
        </v-col>
      </v-row>
    </v-content>
  </v-app>
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
.card {
  --margin: 10px;
  width: calc(100% - 2 * var(--margin));
  margin: var(--margin) auto var(--margin) auto;
}

.navSwitch {
  transform: translateY(25%);
}

html {
  overflow-y: auto !important;
}
</style>