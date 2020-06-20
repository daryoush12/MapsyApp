<template>
 <div class="page-container md-layout-row">
              <AlertDialog v-if="showAlert" v-on:hide="alertHide" tabid="" message="Place was deleted"/>
             

    <md-app>
            <md-app-toolbar class="md-primary">
                <Toolbar />
            </md-app-toolbar>
      <md-app-drawer md-permanent="full">
      <drawercontent/>
      </md-app-drawer>
      <md-app-content>
        <Content/>
      </md-app-content>
    </md-app>
    </div>
</template>

<script>

import AlertDialog from './components/Dialogues/AlertDialog'
import Content from './views/content'
import Toolbar from './components/Toolbar'
import drawercontent from './views/drawercontent'
export default {
  name: 'App',
  components: {
    Content,
    AlertDialog,
    Toolbar,
    drawercontent
  },
    data(){
      return {
        errored: false,
        loading: true,
        showAlert: false,
        shouldAddPlace: false,
        shouldDraw: false,
        currentab: "",
      }
    },
 

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