<template>
        <md-card>
          <md-card-header>
            <div class = "speech-triangle"></div>
        <md-card-header-text class = "head-text">
          <div class="md-title">{{place.title}}</div>
        </md-card-header-text>

           <md-card-actions>
          <md-button @click="invokeClose" class="md-icon-button">
            <md-icon>close</md-icon>
            </md-button>
          </md-card-actions>

          </md-card-header>

          
          <md-card-content>
          {{place.description}}
        </md-card-content>

         <md-card-actions>
         <md-button class="md-icon-button" @click="invokeClose">
            <md-icon>delete</md-icon>
          </md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
props: {
    place: Object
},
methods: {
    invokeClose(){
        this.$emit("close");
    },

    invokeDelete(){
        this.$emit("delete")
    }
}
}
</script>

<style lang="sass">
 .head-text
  margin: 3px 0px 0px
</style>