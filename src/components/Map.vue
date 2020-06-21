<template>
 
  <div>
     <div v-if="showPrompt">
       <PromptPlaceDeletion v-on:cancel="setHideDialogue" v-on:continue="deletePlace" v-bind:question="msg"></PromptPlaceDeletion>
     </div>
    <vl-map  @click="promptAddForm($event.coordinate); coordinate = $event.coordinate" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 750px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
        
      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile >

   

      <vl-layer-vector id="draw-pane" v-if="isdrawing">
        <vl-source-vector ident="draw-target" :features.sync="drawnFeatures"></vl-source-vector>
      </vl-layer-vector>

      <vl-interaction-draw v-if="drawType && isdrawing" source="draw-target" :type="drawType"></vl-interaction-draw>
       <vl-interaction-select :features.sync="selectedFeatures">
        
        <vl-layer-vector >
        <vl-feature v-for="place in places" :key="place._id" :properties="place">

          <vl-geom-point :coordinates="[place.coordinates.longitude, place.coordinates.latitude]">
          </vl-geom-point>

          <vl-style-box>
       
            <vl-style-icon src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png" :scale="0.2" :anchor="[0.5, 1]"> </vl-style-icon>
          </vl-style-box>

          <vl-overlay  class="feature-popup" 
          id="overlay" 
          v-for="feature 
          in selectedFeatures" 
          :key="feature.id"
          :position="pointOnSurface(feature.geometry)" 
          :auto-pan="true" 
          :auto-pan-animation="{ duration: 50 }">
          <template>
            <PlaceCard v-on:close="selectedFeatures=[]" 
            v-on:delete="promptPlaceDeletion(place)" 
            :place="feature.properties"/>
           </template>
          </vl-overlay>

        </vl-feature>
      </vl-layer-vector>
       </vl-interaction-select>
    </vl-map>
  </div>
</template>

<script>
   import {findPointOnSurface} from 'vuelayers/lib/ol-ext'
   import PromptPlaceDeletion from './Dialogues/PromptPlaceDeletion'
   import PlaceCard from './Cards/PlaceCard'
   import {mapState} from 'vuex'
   import { EventBus } from '../event-bus'


export default {

mounted(){
  EventBus.$on("addplacedialogueclosed", () => {
    this.drawnFeatures = [];
    this.selectedFeatures = [];
    console.log(this.drawnFeatures);
  });

  EventBus.$on("zoomAtPlace", place => {
     this.zoomToPlace(place);
  });

  EventBus.$on("mapreset", () => {
    this.resetZoomAndCenter();
  });
    
},
components: {
PromptPlaceDeletion,
PlaceCard
},
props: {
  tabid: String,
},
    data () {
      return { 
        zoom: 2,
        center: [0, 0],
        rotation: 0,
        geolocPosition: undefined,
        coordinate: [],
        showByKey: null,
        selectedFeatures: [],
        drawType: "Point",
        drawnFeatures: [],
        confirmDelete: false,
        showPrompt: false,
        msg: "Are you sure you want to delete this place?"

      }
    },

    checkData(properties){
      console.log(properties);
    },

  methods: {
    pointOnSurface: findPointOnSurface,

  zoomToPlace(place){
      var coords = [place.coordinates.longitude, 
      place.coordinates.latitude];

      this.center = coords;
      this.zoom = 6;

    },

    deleteOperationDone() {
      this.$emit('placedeleted', {message:"Place was deleted successfully"})
    },

    promptPlaceDeletion(place){
      EventBus.$emit("deleteplace", place);
    },
    promptAddForm(coord){
    if(this.isdrawing)
       EventBus.$emit("addplace", coord);
    },
  resetZoomAndCenter(){
    this.center = [0,0];
    this.zoom = 2;
  }
  },


 compute: {
   coordinateArray(coordinates){
     return [coordinates.longitude, coordinates.latitude];
   },

 },

   computed: mapState({
     places: state => state.places.all,
     isdrawing: state => state.map.isDrawing
 }),

 
 
  
  }
</script>


<style lang="sass">


.overlay-content 
  width: 150px
  height: 150px
  background-color: #eeeeee
  vertical-align: top


.feature-popup 
      position: absolute
      left: +40px
      bottom: 170px
      width: 20em
      max-width: none

.speech-triangle
	position: absolute
	left: 0
	top: 50%
	width: 0
	height: 0
	border: 20px solid transparent
	border-right-color: white
	border-left: 0
	margin-top: -20px
	margin-left: -20px
  content: ''
  
</style>