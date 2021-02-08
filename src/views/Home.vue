<template>
  <div>
    <MainView msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import MainView from '@/components/MainView.vue';

export default {
  name: 'Home',
  components: {
    MainView
  }
};
</script>
