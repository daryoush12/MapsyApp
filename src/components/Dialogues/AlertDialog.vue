<template>
    <md-dialog-alert
        :md-active.sync="show"
        :md-content="message"
        md-confirm-text="OK"
        v-on:md-confirm="hideAlert"
    />
</template>
<script>
export default {
    props: {
        message: String,
    },
    data() {
        return {
            show: true,
        }
    },

    methods: {
        hideAlert() {
            this.show = false
        },
    },
}
</script>
<style lang="sass"></style>
