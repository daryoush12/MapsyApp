<template>
 <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Mapsy App</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
      <md-field>
      <label>Initial Value</label>
      <md-card class = "search-input">
        <md-autocomplete
          class="search"
          md-layout="box">
          <label>Search...</label>
        </md-autocomplete>
      </md-card>
    </md-field>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <p>test</p>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
     

        <br/>
        <div class = "load" v-if="loading">Loading...</div>

        <div class ="test" v-else>
          <Map v-bind:places = "places"></Map>
        </div>
        
      </md-app-content>
    </md-app>
    </div>
</template>

<script>

import axios from 'axios'
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Map
  },
    data(){
      return {
        places: [],
        errored: false,
        loading: true
      }
    },
    created () {
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