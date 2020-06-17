<template>
 
  <div>
     <div v-if="showPrompt">
       <PromptPlaceDeletion v-on:cancel="setHideDialogue" v-on:continue="deletePlace" v-bind:question="msg"></PromptPlaceDeletion>
     </div>
    <vl-map  @click="coordinate = $event.coordinate" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 600px">
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

       <vl-interaction-select :features.sync="selectedFeatures" v-if="drawType == null">
        
        <vl-layer-vector>
        <vl-feature v-for="item in places" :key="item._id" :properties="item">

          <vl-geom-point :coordinates="[item.coordinates.longitude, 
            item.coordinates.latitude]">
          </vl-geom-point>

          <vl-style-box>
            <vl-style-circle :radius="20">
              <vl-style-fill color="white"></vl-style-fill>
              <vl-style-stroke color="red"></vl-style-stroke>
            </vl-style-circle>
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
            v-on:delete="setShowDialogue" 
            :place="feature.properties"/>
           </template>
          </vl-overlay>

        </vl-feature>
      </vl-layer-vector>
       </vl-interaction-select>
    </vl-map>
    <div style="padding: 20px">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}<br>
      ClickCoordinates:{{coordinate}} <br>
      ID: {{showByKey}}<br>
      Features: {{selectedFeatures}} <br>
      Drawn : {{drawnFeatures}} <br>
      confirmD: {{confirmDelete}}
    </div>
  </div>
</template>

<script>
   import {findPointOnSurface} from 'vuelayers/lib/ol-ext'
   import PromptPlaceDeletion from './Dialogues/PromptPlaceDeletion'
   import PlaceCard from './Cards/PlaceCard'
   import axios from 'axios'

  export default {
components: {
PromptPlaceDeletion,
PlaceCard
},
props: {
  places: Array,
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
        drawType: null,
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
    setShowDialogue(){
      this.showPrompt = true;
    },
    setHideDialogue(){
     this.showPrompt = false;
    },

    deleteOperationDone() {
      this.$emit('placedeleted', {message:"Place was deleted successfully"})
    },
    deletePlace(){
      var feature = this.selectedFeatures[0];
  

      console.log(feature);
          axios
      .delete('http://localhost:8080/API/V1/places/delete?id='+feature.properties._id)
      .then(() => {
        this.deleteOperationDone();
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)



      
    }
  },
  mounted(){

  }
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
      bottom: 110px
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