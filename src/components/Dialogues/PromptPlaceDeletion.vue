<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Delete place"
      :md-content="msg"
      md-confirm-text="Continue"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import {EventBus} from '../../event-bus';
export default {
    data() {
        return {
            active: false,
            place: null,
            msg: null
        }
    },
    methods: {
        onConfirm(){
            this.$emit('continue')
        },

        onCancel(){
            this.active = false;
            this.$emit('cancel')
        }
    },

mounted(){
    EventBus.$on("deleteplace", place => {

    console.log(place);

    this.place = place;
    this.active = true;
    this.msg = "Do you want to delete "+place.title+" ?";
  });
    }
}
</script>