<template>
    <form novalidate class="md-layout" @submit.prevent="validatePlace">
        <md-card-header>
            <div class="speech-triangle"></div>
            <md-card-header-text class="head-text">
                <div class="md-title">
                    <md-field :class="getValidationClass('title')">
                        <label>Title</label>
                        <md-input
                            class="input-title"
                            id="title"
                            v-model="form.title"
                        ></md-input>
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
                </div>
            </md-card-header-text>
            <md-card-actions>
                <md-button @click="cancelEditing" class="md-icon-button">
                    <md-icon>close</md-icon>
                </md-button>
            </md-card-actions>
        </md-card-header>
        <md-divider></md-divider>
        <md-card-content>
            <md-icon>schedule</md-icon>
            <md-field :class="getValidationClass('open-hours')">
                <vue-timepicker
                    :placeholder="form.open_hours.from.H.toString()"
                    class="time-pick"
                    id="hourfrom"
                    v-model="form.open_hours.from"
                    format="H"
                ></vue-timepicker
                >-
                <vue-timepicker
                    :placeholder="form.open_hours.to.H.toString()"
                    class="time-pick"
                    v-model="form.open_hours.to"
                    format="H"
                    id="hourto"
                ></vue-timepicker>
                <span class="md-error" v-if="!$v.form.open_hours.timesAreValid"
                    >Not a valid opening hour</span
                >
            </md-field>

            <md-field :class="getValidationClass('description')">
                <label>Description</label>
                <md-textarea
                    id="description"
                    v-model="form.description"
                    md-autogrow
                ></md-textarea>

                <span class="md-error" v-if="!$v.form.description.required"
                    >Description is required</span
                >
                <span
                    class="md-error"
                    v-else-if="
                        !$v.form.description.minlength ||
                        !$v.form.description.maxlength
                    "
                    >Description must be atleast 4 characters and max 100
                    characters.
                </span>
            </md-field>
        </md-card-content>
        <md-card-actions>
            <md-button type="submit" class="md-icon-button">
                <md-icon>save</md-icon>
            </md-button>
        </md-card-actions>
    </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { timesAreValid } from '../custom-validators/custom-validates'
import { mapActions } from 'vuex'
export default {
    beforeMount() {
        this.form.title = this.place.title
        this.form.description = this.place.description
        this.form.coordinates = this.place.coordinates
        this.form.open_hours.from.H = this.place.open_hours.from

        this.form.open_hours.to.H = this.place.open_hours.to
    },
    mixins: [validationMixin],
    props: {
        place: Object,
    },
    data() {
        return {
            form: {
                _id: null,
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
        }
    },
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

                maxLength: maxLength(100),
            },
            open_hours: { timesAreValid },
        },
    },
    methods: {
        ...mapActions('places', ['editPlace']),
        validatePlace() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                //Change form into a structure our API can understand
                this.makeFormAPIReady()
                this.editPlace(this.form)
                this.$emit('editdone')
            }
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty,
                }
            }
        },

        cancelEditing() {
            this.$emit('editcancel')
        },

        makeFormAPIReady() {
            this.form._id = this.place._id

            this.form.coordinates.longitude = this.place.coordinates.longitude
            this.form.coordinates.latitude = this.place.coordinates.latitude

            var from = this.form.open_hours.from.H
            var to = this.form.open_hours.to.H

            this.form.open_hours.from = from
            this.form.open_hours.to = to
        },
    },
}
</script>

<style lang="sass">
.time-pick
    width: 80px !important
</style>
