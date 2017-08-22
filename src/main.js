import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App';


Vue.config.productionTip = false;

// mount with global
Vue.use(VueAwesomeSwiper);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
