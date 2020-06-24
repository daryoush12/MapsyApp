<template>
    <div>
        <md-dialog
            :md-active.sync="showDialog"
            @md-cancel="onClose"
            v-bind:md-click-outside-to-close="false"
            v-bind:md-close-on-esc="false"
        >
            <md-dialog-title>
                Add Place
                <md-button class="md-icon-button close-button" @click="onClose">
                    <md-icon>close</md-icon>
                </md-button>
            </md-dialog-title>
            <form novalidate class="md-layout" @submit.prevent="validatePlace">
                <div class="form-content">
                    <md-field :class="getValidationClass('title')">
                        <label for="first-name">title</label>
                        <md-input
                            name="title"
                            id="title"
                            autocomplete="title"
                            v-model="form.title"
                            :disabled="sending"
                        />
                        <span class="md-error" v-if="!$v.form.title.required"
                            >Title is required.</span
                        >
                        <span
                            class="md-error"
                            v-else-if="!$v.form.title.minlength"
                            >Title must be atleast 6 characters</span
                        >
                        <span
                            class="md-error"
                            v-else-if="!$v.form.title.maxlength"
                            >Title can be only at maximum of 16
                            characters.</span
                        >
                    </md-field>

                    <md-field :class="getValidationClass('description')">
                        <label for="last-name">Description</label>
                        <md-textarea
                            v-model="form.description"
                            name="description"
                            id="description"
                            autocomplete="Describe"
                            :disabled="sending"
                        ></md-textarea>
                        <span
                            class="md-error"
                            v-if="!$v.form.description.required"
                            >Description is required</span
                        >
                        <span
                            class="md-error"
                            v-else-if="
                                !$v.form.description.minlength ||
                                !$v.form.description.maxlength
                            "
                            >Description must be atleast 4 characters.
                        </span>
                    </md-field>

                    <md-field :class="getValidationClass('open_hours')">
                        Opening Hours: <br />
                        <vue-timepicker
                            format="H"
                            v-model="form.open_hours.from"
                        ></vue-timepicker>
                        -
                        <vue-timepicker
                            v-model="form.open_hours.to"
                            format="H"
                        ></vue-timepicker>
                        <span
                            class="md-error"
                            v-if="!$v.form.open_hours.timesAreValid"
                            >Not a valid opening hour</span
                        >
                    </md-field>

                    <md-progress-bar md-mode="indeterminate" v-if="sending" />

                    <md-field>
                        <md-button
                            type="submit"
                            class="md-primary submit-button"
                            :disabled="sending"
                            >Create place</md-button
                        >
                    </md-field>
                </div>
            </form>
        </md-dialog>
    </div>
</template>

<script>
import { EventBus } from '../../event-bus'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { timesAreValid } from '../../custom-validators/custom-validates'
import { mapState, mapActions } from 'vuex'

export default {
    mixins: [validationMixin],
    mounted() {
        EventBus.$on('addplace', (coords) => {
            console.log('test')
            console.log(coords)

            this.form.coordinates.longitude = coords[0]
            this.form.coordinates.latitude = coords[1]
            this.showDialog = true
        })
    },
    data: () => ({
        coords: [],
        showDialog: false,
        form: {
            title: null,
            description: null,
            coordinates: {
                longitude: null,
                latitude: null,
            },
            open_hours: {
                from: {
                    H: null,
                },
                to: {
                    H: null,
                },
            },
        },
        placeSaved: false,
        sending: false,
    }),

    validations: {
        form: {
            title: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
            },
            description: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(50),
            },
            open_hours: { timesAreValid },
        },
    },
    methods: {
        ...mapActions('places', ['addNewPlace']),
        onConfirm() {
            this.$emit('continue')
        },
        onClose() {
            console.log('cancel')
            EventBus.$emit('addplacedialogueclosed')
            this.showDialog = false
        },
        add() {
            this.$emit('add', this.place)
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty,
                }
            }
        },
        clearForm() {
            this.$v.$reset()
            this.form.description = null
            this.form.title = null
            this.form.coordinates.longitude = null
            this.form.coordinates.latitude = null
        },
        savePlace() {},
        validatePlace() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.addNewPlace(this.form)
                EventBus.$emit('addplacedialogueclosed')
                this.showDialog = false
                this.$store.dispatch('places/getAllPlaces')
            }
        },
    },
    computed: mapState({
        addStatus: (state) => state.places.addStatus,
    }),

    updated() {
        console.log(this.showDialog)
    },
}
</script>

<style lang="sass">
.form-content
  padding: 10px
  width: 100%

.submit-button
  z-index: 4

.close-button
  margin-left: 125px !important
</style>
