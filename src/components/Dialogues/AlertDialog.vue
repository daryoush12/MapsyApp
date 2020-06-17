<template>
        <md-dialog-alert
      :md-active.sync="showAl"
      :md-content=message
      md-confirm-text="OK" 
      v-on:md-confirm="hideAlert"/>
</template>
<script>
export default {
    props: {
        message: String
    },
    data(){
    return {
        showAl: true
        }
    },

    methods: {
        hideAlert(){
            this.$emit('hide')
        }
    }
}
</script>
<style lang="sass">

</style>