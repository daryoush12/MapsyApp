<template>
    <md-card v-if="place != null">
        <div v-if="editModeOn && editForm != null">
            <PlaceEdit
                :place="editForm"
                v-on:editdone="stopEdit"
                v-on:editcancel="invokeClose"
            />
        </div>
        <div v-else>
            <md-card-header>
                <div class="speech-triangle"></div>
                <md-card-header-text class="head-text">
                    <div class="md-title">{{ place.title }}</div>
                </md-card-header-text>
                <md-card-actions>
                    <md-button @click="invokeClose" class="md-icon-button">
                        <md-icon>close</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card-header>
            <md-divider></md-divider>
            <md-card-content>
                <div class="opening-hours">
                    <md-icon>schedule</md-icon>
                    {{ dateHourFrom | dateFormat('HH') }} -
                    {{ dateHourTo | dateFormat('HH') }}
                    <span v-if="isPlaceOpen" class="place-open">Open</span>
                    <span v-if="!isPlaceOpen" class="place-closed">Closed</span>
                </div>
                {{ place.description }}
            </md-card-content>
            <md-card-actions>
                <md-button class="md-icon-button" @click="startEdit">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click="invokeDelete">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-card-actions>
        </div>
    </md-card>
</template>

<script>
import { mapActions } from 'vuex'
import { EventBus } from '../../event-bus'
import PlaceEdit from '../../EditForms/PlaceEdit'

export default {
    components: {
        PlaceEdit,
    },
    data() {
        return {
            editModeOn: false,
            editForm: null,
            form: {
                title: null,
            },
        }
    },
    props: {
        place: Object,
    },

    computed: {
        isPlaceOpen: function () {
            var current_time_stamp = Date.now()
            var date_object = new Date(current_time_stamp)
            var timestamp = date_object.getHours().toLocaleString()

            if (
                timestamp > this.place.open_hours.from &&
                timestamp < this.place.open_hours.to
            ) {
                return true
            } else return false
        },

        dateHourFrom: function () {
            return this.dateHour(this.place.open_hours.from)
        },

        dateHourTo: function () {
            return this.dateHour(this.place.open_hours.to)
        },
    },

    compute: {
        computeNumToString(value) {
            return value.toString()
        },
    },
    methods: {
        ...mapActions('places', ['editPlace']),

        invokeClose() {
            this.$emit('close')
        },

        invokeDelete() {
            this.$emit('delete')
        },

        dateHour(timestamp) {
            var date_object = new Date()
            date_object.setHours(timestamp)
            date_object.setMinutes(0)
            return date_object
        },

        startEdit() {
            this.editModeOn = true
            this.editForm = this.place
            //Mutate object to support vue timepicker.
            //Yes it is ugly have mercy reader.
        },

        stopEdit() {
            EventBus.$emit('refreshMapPlaces')
            this.editModeOn = false
        },
    },
}
</script>

<style lang="sass">
.head-text
  margin: 3px 0px 0px
.place-open
  color: green

.place-closed
  color: red

.opening-hours
  padding-bottom: 20px
.input-title
  width: 160px
</style>
