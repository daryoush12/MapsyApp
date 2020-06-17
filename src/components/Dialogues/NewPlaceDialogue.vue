<template>
   <md-dialog :md-active.sync="showDialog" @md-cancel="onCancel">
      <md-dialog-title>Add Place</md-dialog-title>
     <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-field>
      <label>Title</label>
      <md-input v-model="type"></md-input>
      <span class="md-helper-text">Helper text</span>
    </md-field>
      <md-field>
      <label>Description</label>
      <md-input v-model="textarea"></md-input>
      <span class="md-helper-text">Helper text</span>
    </md-field>
    </form>


      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
export default {

props: {
    showDialog: Boolean
},
data(){
return {
    place: undefined,
    form: {
        title: null,
        description: null,
        coordinates: {
            longitude: null,
            latitude: null,
        },
      }
}
},
methods: {
      
        onConfirm(){
           
            this.$emit('continue')
        },

        onCancel(){
           
            this.$emit('cancel')
        },
    
        add() {
            this.$emit('add', this.place)
    }
}
}
</script>

<style>

</style>