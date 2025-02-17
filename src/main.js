import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './registerServiceWorker';
import VuetifyDialog from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.css';

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});
Vue.config.productionTip = false;

Vue.config.errorHandler = (err, vm, info) => { 
  vm.$dialog.error({
    title: err.toString(),
    text: `Autoscriber encountered an error in ${info}.`
  });
};

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
