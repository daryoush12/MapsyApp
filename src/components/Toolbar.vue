<template>
 <div>
        <span class="md-title">Mapsy App</span>
        <md-button class="md-primary" @click="setDrawingState(true)">
        <md-icon>add_location</md-icon>
        Add Place
      </md-button>
        <md-button class="md-primary" @click="setDrawingState(false)">
        <md-icon>clear</md-icon>
        Clear
      </md-button>

          <md-button class="md-primary" @click="invokeMapResetEvent">
        <md-icon>zoom_out_map</md-icon>
        Reset Map
      </md-button>

</div>
</template>

<script>

import {mapActions} from 'vuex'
import {EventBus} from '../event-bus';

export default {

methods:{
  ...mapActions('map',[
    'setDrawingState'
]),
   invokeMapResetEvent(){
     EventBus.$emit("mapreset");
   }
},

}
</script>

<style>

</style>