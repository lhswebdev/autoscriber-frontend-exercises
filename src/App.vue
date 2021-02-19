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
      <v-col cols="12">
        <v-card color="pink accent-4" dark class="card" v-if="prompt && !installed">
          <v-card-title class="headline"
            >Install the Autoscriber App</v-card-title
          >

          <v-card-subtitle>Autoscriber works best when installed on your device.</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="install()" target="_blank">
              Install App
            </v-btn>
          </v-card-actions>
        </v-card>
        <router-view/>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    APPNAME: 'Autoscriber App',
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
    ],
    prompt: null,
    installed: false
  }),
  created() {
    document.title = this.APPNAME;

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.prompt = e;
    });
  },
  methods:{
    async install() {
      this.prompt.prompt();
      if (await this.prompt.userChoice === 'accepted') this.installed = true;
    }
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

.v-navigation-drawer--bottom {
  position: fixed !important;
}

@media all and (display-mode: standalone) {
  #install-prompt {
    display: none;
  }
}
</style>
