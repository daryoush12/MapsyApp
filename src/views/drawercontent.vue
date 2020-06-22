<template>
<div>
<div class = "search-field-holder">
      
        <md-autocomplete
      v-model="searchvalue"
      :md-options="[]"
      v-on:md-changed="search"
      md-layout="box"
      md-dense>
      <label><md-icon>search</md-icon> search..
      </label>
    </md-autocomplete>
     
 
 
{{searchvalue}}

</div>
<md-divider></md-divider>

    <md-list v-for="place in places" :key="place._id">
      <md-list-item>
     
        <span class="md-list-item-text locateplace">{{place.title}}<br>{{place.coordinates.longitude}},
        {{place.coordinates.latitude}}</span>
          <md-button class="md-icon-button" @click="invokeLookAtPlace(place)">
          <md-icon>place</md-icon>
      </md-button>
      </md-list-item>
    </md-list>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {EventBus} from '../event-bus'
export default {
data(){
  return {
    searchvalue: null,
  }
},

methods: {
    ...mapActions('places',[
  'searchForPlaces'
  ]),
    search() {
      console.log('test'+this.searchvalue);
      this.searchForPlaces(this.searchvalue);
    },

    invokeLookAtPlace(place){
      EventBus.$emit("zoomAtPlace", place);
    }
},
computed: mapState({
     places: state => state.places.all,
 }),


}
</script>
<style lang="sass">
.search-field-holder
  margin: 10px

.locateplace
  padding-top: 5px !important

</style>