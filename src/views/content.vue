<template>
<div>
        <div v-if="!places"><md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner></div>
        <Map v-else v-on:placedeleted="alertShow"  v-on:addplace="addplace"></Map>

        <NewPlaceDialogue  v-bind:showDialog="cleanCoords.length != 0" v-on:cancel="cleanCoords" />
        <PromptPlaceDeletion />
</div>
</template>

<script>
import Map from '../components/Map'
import { mapState} from 'vuex'
import NewPlaceDialogue from '../components/Dialogues/NewPlaceDialogue'
import PromptPlaceDeletion from '../components/Dialogues/PromptPlaceDeletion'


export default {
 components: {
     Map,
     NewPlaceDialogue,
     PromptPlaceDeletion
 },
 data(){
   return {
        shouldDraw: false,
        currentab: "",
        newCoords: []
      }
 },
 computed: mapState({
     places: state => state.places.all
 }),

 compute: {
isCoordsEmpty(){
    if(this.cleanCoords.length == 0){
        return true;
    }else
    return false;
}
 },

created(){
    this.$store.dispatch('places/getAllPlaces')
},

updated(){
    
},
methods: {
addplace(value){
        this.newCoords = value;
},
cleanCoords(){
    this.coords = []
},

alertShow(){
      this.showAlert = true;
},

alertHide(){
      this.showAlert = false;
      this.getAllPlaces();
    },


}



}
</script>

<style>

</style>