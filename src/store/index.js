import Vue from 'vue';
import Vuex from 'vuex';
import places from './modules/places'
import map from './modules/map'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        places,
        map
    },

})

