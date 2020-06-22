import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-select/dist/vue-select.css';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import vSelect from 'vue-select'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import store from './store/'
import VueOpenLayers from './plugins/VueOpenLayer'

Vue.config.productionTip = false
Vue.use(VueMaterial);
Vue.use(VueOpenLayers);
Vue.use(VueFilterDateFormat);

Vue.component('vue-timepicker',VueTimepicker);
Vue.component('v-select', vSelect)


new Vue({
  Data(){
    return {
     
   }
},
store,
  render: h => h(App),
}).$mount('#app')
