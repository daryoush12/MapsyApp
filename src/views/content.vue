<template>
<div>
        <div v-if="!places"><md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner></div>
        <Map v-else v-on:addplace="addplace"></Map>

        <NewPlaceDialogue  v-bind:showDialog="cleanCoords.length != 0" v-on:cancel="cleanCoords" />
        <PromptPlaceDeletion />

        <md-snackbar :md-active.sync="deleteStatus">Place was deleted with success!</md-snackbar>
        <md-snackbar :md-active.sync="addStatus">Place was added successfully</md-snackbar>
        <md-snackbar :md-active.sync="editStatus">Place was edited successfully</md-snackbar>
        
</div>
</template>

<script>
import Map from '../components/Map'
import { mapState, mapActions} from 'vuex'
import NewPlaceDialogue from '../components/Dialogues/NewPlaceDialogue'
import PromptPlaceDeletion from '../components/Dialogues/PromptPlaceDeletion'
import {EventBus} from '../event-bus'


export default {

components: {
     Map,
     NewPlaceDialogue,
     PromptPlaceDeletion,
},
 data(){
   return {
        shouldDraw: false,
        currentab: "",
        newCoords: []
      }
 },
 computed: mapState({
     places: state => state.places.all,
     deleteStatus: state => state.places.deleteStatus,
     addStatus: state => state.places.addStatus,
     editStatus: state => state.places.editStatus
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
...mapActions('places', [
'getAllPlaces'
]),
addplace(value){
        this.newCoords = value;
},
cleanCoords(){
    this.coords = []
},

alertShow(){
      this.showAlert = true;
},
},

mounted(){
EventBus.$on("refreshMapPlaces", () => {
       this.getAllPlaces();
  }); 
}

}
</script>

<style>

</style>