<template>
    <form novalidate class="md-layout" @submit.prevent="validatePlace">
        <md-card-header>
            <div class="speech-triangle"></div>
            <md-card-header-text class="head-text">
                <div class="md-title">
                    <md-field>
                        <label>Title</label>
                        <md-input
                            class="input-title"
                            v-model="form.title"
                        ></md-input>
                    </md-field>
                </div>
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
                Opening Hours: <br />
                From:
                <vue-timepicker
                    v-model="form.open_hours.from"
                    format="H"
                ></vue-timepicker>
                <br />
                To:
                <vue-timepicker
                    v-model="form.open_hours.to"
                    format="H"
                ></vue-timepicker>
            </div>
            <md-field>
                <label>Title</label>
                <md-textarea
                    v-model="form.description"
                    md-autogrow
                ></md-textarea>
            </md-field>
        </md-card-content>
        <md-card-actions>
            <md-button type="submit" class="md-icon-button" @click="stopEdit">
                <md-icon>save</md-icon>
            </md-button>
        </md-card-actions>
    </form>
</template>

<script>
export default {
    props: {
        form: null,
    },
    data() {
        return {}
    },
    methods: {
        validatePlace() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.addNewPlace(this.form)
                this.$emit('editDone', place)
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
    },
}
</script>

<style></style>
