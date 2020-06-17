<template>
 <div class="page-container md-layout-row">
              <AlertDialog v-if="showAlert" v-on:hide="alertHide" tabid="" message="Place was deleted"/>
              <NewPlaceDialogue :showDialog="shouldAddPlace" v-on:cancel="hideAddPlace" />
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Mapsy App</span>

    <md-tabs class="md-primary" v-on:md-changed="checkDraw" v-bind:value="value">
      <md-tab id="tab-draw" md-label="Add Place" md-icon="room"></md-tab>
      <md-tab id="tab-pages" md-label="Pages" md-icon="pages"></md-tab>
      <md-tab id="tab-posts" md-label="Posts" md-icon="/assets/icon-whatshot.svg"></md-tab>
      <md-tab id="tab-favorites" md-label="Favorites" md-icon="favorite"></md-tab>
    </md-tabs>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        {{count}}
      </md-app-drawer>

      <md-app-content>
     

        <br/>
        <div v-if="loading"><md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner></div>

          <Map v-bind:places = "places" v-on:placedeleted="alertShow"  v-on:addplace="setAddPlace" v-bind:isdrawing="shouldDraw"></Map>
  
      </md-app-content>
    </md-app>
    </div>
</template>

<script>

import axios from 'axios'
import Map from './components/Map'
import AlertDialog from './components/Dialogues/AlertDialog'
import NewPlaceDialogue from './components/Dialogues/NewPlaceDialogue'

export default {
  name: 'App',
  components: {
    Map,
    AlertDialog,
    NewPlaceDialogue
  },
    data(){
      return {
        places: [],
        errored: false,
        loading: true,
        showAlert: false,
        shouldAddPlace: false,
        shouldDraw: false,
        currentab: "",
      }
    },
  created () { 

console.log("test");

  },


  mounted() {
    this.getAllPlaces();
    console.log(this.showAlert);
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    getAllPlaces() {
           axios
      .get('http://localhost:8080/API/V1/places/all')
      .then(response => {
        this.places = response.data,
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },

    checkDraw(value) {
      console.log(value);
        if(value == "tab-draw"){
          this.shouldDraw = true;
        }else{
          this.shouldDraw = false;
        }
    },
    alertShow(){

      this.showAlert = true;
    },

    alertHide(){
      this.showAlert = false;
      this.getAllPlaces();
    },

    setAddPlace(){
        this.shouldAddPlace = true;
    },

    hideAddPlace(){
        this.shouldAddPlace = false;
  
   
    },


  }

}
</script>

<style  scoped>
  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
.load {
   min-height: 100px;
    width: 100px;
    background-color: green;
}

.search-input {
 border-radius: 100px;
}


</style>