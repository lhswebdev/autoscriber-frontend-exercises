import Vue from 'vue';
import VueRouter from 'vue-router';
import JoinView from '../views/JoinView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Join',
    component: JoinView
  },
  {
    path: '/session/:sessionID',
    name: 'Session',
    component: () => import(/* webpackChunkName: "session" */ '../views/SessionView.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: () => import()
    // TODO
    // Look at the /session/:sessionID route above.
    // `component` is a function, and it returns an import.
    // The `webpackChunkName` is for our bundler, to specify a name for the route.
    // In `/about` (this route), we want to import `../views/About.vue` and call the chunk `about`.
    //
    // TASK
    // Write the appropriate import statement for `/about` (which imports `../views/About.vue`).
  }
];

const router = new VueRouter({
  routes,
  base: '/'
});

export default router;
