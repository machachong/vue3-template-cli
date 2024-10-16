import BokeButton from './button/index.vue';
import BokeForm from './form/index.vue';
export default {
  install(Vue) {
    Vue.component('BokeButton', BokeButton);
    Vue.component('BokeForm', BokeForm);
  },
};
