import api from '../../api/placeapi'

const state = () => ({
        all: [],
        addStatus: null,
        deleteStatus: null
})

const getters = {};

const actions =  {
 getAllPlaces({commit}){
    api.getPlaces(places => {commit('setPlaces', places)});
 },

 searchForPlaces({commit}, searchvalue){
    console.log(searchvalue);
   api.searchPlace(places => {commit('setPlaces', places)}, searchvalue);
},
 addNewPlace({commit}, place){
    console.log(place);
   api.addPlace(status => {commit('didAddSucceed', status)}, place);
 },

 deletePlace({commit}, place) {
   api.deletePlace(status => {commit('didAddSucceed', status)}, place);
 }

}

const mutations =  {
 setPlaces(state, places){
    console.log(places);
    state.all = places;
 },
 didAddSucceed(state, status){
   console.log(status);
   switch(status){
      case 200:
         state.addStatus = true
         break;
      default:
         state.addStatus = false;
   }
  
},

didDeleteSucceed(state, status){
   switch(status){
      case 200:
         state.deleteStatus = true
         break;
      default:
         state.deleteStatus = false;
   }
}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}