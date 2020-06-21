import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

/*

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'
import 'vuelayers/lib/style.css'
import { CircleStyle } from 'vuelayers'
import { IconStyle } from 'vuelayers'
*/

import store from './store/'
import VueOpenLayers from './plugins/VueOpenLayer'



Vue.config.productionTip = false
Vue.use(VueMaterial);
Vue.use(VueOpenLayers);
Vue.use(VueFilterDateFormat);


new Vue({
  Data(){
    return {
     
   }
},
store,
  render: h => h(App),
}).$mount('#app')
