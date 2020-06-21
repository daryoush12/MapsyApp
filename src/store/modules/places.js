import places from '../../api-connectors/places'

const state = () => ({
        all: [],
        addStatus: null,
        deleteStatus: null
})

const getters = {};

const actions =  {
 getAllPlaces({commit}){
    places.getPlaces(places => {commit('setPlaces', places)});
 },

 searchForPlaces({commit}, searchvalue){
    console.log(searchvalue);
   places.searchPlace(places => {commit('setPlaces', places)}, searchvalue);
},
 addNewPlace({commit}, place){
    console.log(place);
   places.addPlace(status => {commit('didAddSucceed', status)}, place);
 },

 deletePlace({commit}, place) {
   places.deletePlace(status => {commit('didAddSucceed', status)}, place);
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