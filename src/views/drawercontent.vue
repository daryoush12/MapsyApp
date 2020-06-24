<template>
    <div>
        <div class="md-layout-item">
            <div class="md-layout md-gutter app-searchbar">
                <div class="md-layout-item md-size-70">
                    <md-field>
                        <md-autocomplete
                            v-model="searchvalue"
                            :md-options="[]"
                            md-layout="box"
                            class="search-bar"
                            @md-changed="search"
                            md-dense
                            ><label><md-icon>search</md-icon> search.. </label>
                        </md-autocomplete>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-30">
                    <md-field>
                        <label for="filters">Filter</label>
                        <md-select
                            :v-model="placefilter"
                            name="filters"
                            id="place-filter"
                            :value="placefilter"
                        >
                            <md-option default value="Title">Title</md-option>
                            <md-option value="Description"
                                >Description</md-option
                            >
                            <md-option value="Keyword">Keyword</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </div>
        <md-divider></md-divider>

        <div class="scrollablelist">
            <md-list v-if="places.length > 0">
                <p class="result-title">Results({{ places.length }})</p>
                <md-list-item v-for="place in places" :key="place._id">
                    <span class="md-list-item-text locateplace"
                        >{{ place.title }}<br />{{
                            place.coordinates.longitude
                        }}, {{ place.coordinates.latitude }}</span
                    >
                    <md-button
                        class="md-icon-button"
                        @click="invokeLookAtPlace(place)"
                    >
                        <md-icon>place</md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
            <div v-else>
                <md-empty-state
                    md-icon="search_off"
                    md-label="No results"
                    md-description="Try to use different search terms or inputs."
                >
                </md-empty-state>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { EventBus } from '../event-bus'
export default {
    data() {
        return {
            searchvalue: null,
            placefilter: 'Title',
        }
    },

    methods: {
        ...mapActions('places', [
            'searchPlacesByTitle',
            'searchPlacesByKeyword',
            'searchPlacesByDescription',
        ]),
        search() {
            console.log(this.placefilter + this.searchvalue)
            switch (this.placefilter) {
                case 'Title': {
                    this.searchPlacesByTitle(this.searchvalue, this.placefilter)
                    break
                }
                case 'Keyword': {
                    this.searchPlacesByKeyword(
                        this.searchvalue,
                        this.placefilter
                    )
                    break
                }
                case 'Description': {
                    this.searchPlacesByDescription(this.searchvalue)
                    break
                }
                default:
            }
        },

        invokeLookAtPlace(place) {
            EventBus.$emit('zoomAtPlace', place)
        },
    },
    computed: mapState({
        places: (state) => state.places.all,
    }),
}
</script>
<style lang="sass">
.search-field-holder
  margin: 10px

.search-field
  width: 250px !important
.locateplace
  padding-top: 5px !important

.scrollablelist
    max-height: 700px
    overflow: auto

.md-select
    margin-top: 20px

.app-searchbar
  padding-left: 30px
  padding-right: 30px

.search-bar
  backgroung-color: transparent
.result-title
  text-align: center
</style>
