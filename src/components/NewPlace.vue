<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

        <div>Hello World</div>
    </md-dialog>

  </div>
</template>

<script>
  export default {
    name: 'DialogCustom',
     Data(){
         return {
            showDialog: true,
          
        }
    }
  }
</script>

<style>
  .md-dialog /deep/.md-dialog-container {
    max-width: 768px;
  }
</style>