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
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            active: false,
            place: null,
            msg: null
        }
    },
    methods: { 
    ...mapActions('places', [
        'deletePlace'
    ]),
        onConfirm(){
            this.deletePlace(this.place);
            this.active = false;
        },

        onCancel(){
            this.$emit('cancel')
            this.active = false;
        }
    },

mounted(){
    EventBus.$on("placedelete", place => {

    this.place = place;
    this.active = true;
    this.msg = "Do you want to delete "+place.title+" ?";
  });
}
}
</script>