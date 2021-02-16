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
          <router-link tag="span" v-for="(item, index) in navbarItems" :key="index" :to="item.href">
            <v-list-item>
              <v-list-item-title style="color: unset; text-decoration: none;">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
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
        title: 'Home',
        href: '/'
      },
      {
        title: 'About',
        href: '/about'
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
