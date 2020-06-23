<template>
<div>
 <div class="md-layout-item">
 
 <div class="md-layout md-gutter app-searchbar">
   <div class="md-layout-item md-size-70">
    <md-field>  
     <label><md-icon>search</md-icon> search.. </label>  
      <md-input :v-model="searchvalue">
      </md-input>
       </md-field>
  </div>
 <div class="md-layout-item md-size-30">    
     <md-field>  
      <label for="movies">Filter</label>
            <md-select :v-model="placefilter" name="filters" id="place-filter">
            <md-option default value="title">Title</md-option>
              <md-option value="description">Description</md-option>
            <md-option value="keyword">Keyword</md-option>
    </md-select>
    </md-field>
  </div>
  </div>
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
  'searchForPlacesByTitle',
  'searchForPlacesByKeyword'
  ]),
    search() {
      switch(this.placefilter){
        case "Title": {
           this.searchForPlacesByTitle(this.searchvalue, this.placefilter);
           break;
        }
        case "Keyword": {
          this.searchForPlacesByKeyword(this.searchvalue, this.placefilter);
          break;
        }
        default:
        break;
      }
     
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
   
    margin-top: 4px

.app-searchbar
  padding-left: 30px
  padding-right: 30px   



</style>