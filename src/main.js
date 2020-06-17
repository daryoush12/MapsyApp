import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'
import 'vuelayers/lib/style.css'
import { CircleStyle } from 'vuelayers'
import Vuex from 'vuex'

Vue.use(VueLayers)
Vue.use(Map)
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(Geoloc)
Vue.use(CircleStyle)

Vue.config.productionTip = false
Vue.use(VueMaterial);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
      count: "hello world"
  }
});


new Vue({
  Data(){
    return {
     
   }
},
store,
  render: h => h(App),
}).$mount('#app')
