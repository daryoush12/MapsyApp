<template>
<div>
<div class = "md-layout search-field-holder">
      <md-autocomplete
      v-model="searchvalue"
      :md-options="[]"
      v-on:md-changed="search"
      md-layout="box"
      class = "search-field"
      md-dense>
      <label><md-icon>search</md-icon> search.. </label>
    </md-autocomplete>
    <md-select v-model="placefilter" name="filter-option" id="place-filter">
            <md-option default value="title">Title</md-option>
              <md-option value="description">Description</md-option>
            <md-option value="keyword">Keyword</md-option>
    </md-select>
  
     
 
 


</div>
<md-divider></md-divider>

<div class="scrollablelist">
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
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {EventBus} from '../event-bus'
export default {
data(){
  return {
    searchvalue: null,
    placefilter: "title"
  }
},

methods: {
    ...mapActions('places',[
  'searchForPlaces'
  ]),
    search() {
      console.log('test'+this.searchvalue);
      this.searchForPlaces(this.searchvalue, this.placefilter);
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

.search-field
  width: 250px !important
.locateplace
  padding-top: 5px !important

.scrollablelist
    max-height: 700px
    overflow: auto

.md-select
    height: 50px
    margin-top: 4px



</style>