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

          <vl-overlay  class="feature-popup" id="overlay" v-for="feature in selectedFeatures" :key="feature.id"
                      :position="pointOnSurface(feature.geometry)" :auto-pan="true" :auto-pan-animation="{ duration: 50 }">
          <template slot-scope="scope">
        <md-card>
          <md-card-header>

        <md-card-header-text>
          <div class="md-title">{{feature.properties.title}}</div>
           <div class="md-subhead">{{scope.position}}</div>
        </md-card-header-text>

           <md-card-actions>
          <md-button @click="selectedFeatures=[]" class="md-icon-button">
            <md-icon >close</md-icon>
          </md-button>
      </md-card-actions>

          </md-card-header>
          <md-card-content>
          {{feature.properties.description}}
        </md-card-content>

         <md-card-actions>
         <md-button class="md-icon-button" @click="setShowDialogue">
            <md-icon>delete</md-icon>
          </md-button>
      </md-card-actions>
    </md-card>


               
              

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
   import PromptPlaceDeletion from './PromptPlaceDeletion'
   import axios from 'axios'

  export default {
components: {
PromptPlaceDeletion
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
      this.$emit('placedeleted')
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
      left: +0px
      bottom: 12px
      width: 20em
      max-width: none


  
</style>