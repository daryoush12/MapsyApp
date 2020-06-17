<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Delete place"
      :md-content="question"
      md-confirm-text="Continue"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            active: true,
            test: "test world"
        }
    },
    props: {
        question: String,
    },
    methods: {
        onConfirm(){
           
            this.$emit('continue')
        },

        onCancel(){
             console.log("test");
            this.$emit('cancel')
        }
    }
}
</script>