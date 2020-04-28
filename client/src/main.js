import Vue from 'vue';
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
  connection: 'http://localhost:3000'
}));

new Vue({
  el: '#app',
  render: h => h(App)
});
