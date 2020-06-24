import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vuelayers/lib/style.css'
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'
import 'vuelayers/lib/style.css'
import { CircleStyle } from 'vuelayers'
import { IconStyle } from 'vuelayers'
import Vue from 'vue'
import VueLayers from 'vuelayers'

Vue.use(IconStyle)
Vue.use(CircleStyle)
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(Geoloc)
Vue.use(Map)
Vue.use(VueLayers)

export default {}
