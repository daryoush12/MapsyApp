import axios from 'axios'

//const api_url = "https://mapsyapi.herokuapp.com";
const api_url = 'http://localhost:8080'

export default {
    getPlaces(commitbase) {
        axios
            .get(api_url + '/API/V1/places/all')
            .then((response) => {
                commitbase(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    addPlace(commitbase, place) {
        console.log(place)
        axios
            .post(api_url + '/API/V1/places/add', {
                title: place.title,
                description: place.description,
                coordinates: {
                    longitude: place.coordinates.longitude,
                    latitude: place.coordinates.latitude,
                },
                open_hours: {
                    from: place.open_hours.from.H,
                    to: place.open_hours.to.H,
                },
            })
            .then((response) => {
                commitbase(response.status)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    deletePlace(commitbase, place) {
        axios
            .delete(api_url + '/API/V1/places/delete?id=' + place._id)
            .then((response) => {
                commitbase(response.status)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    editPlace(commitbase, place) {
        axios
            .put(api_url + '/API/V1/places/update', place)
            .then((response) => {
                commitbase(response.status)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    searchPlace(commitbase, searchvalue) {
        axios
            .get(api_url + '/API/V1/places/all/search?value=' + searchvalue)
            .then((response) => {
                commitbase(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    searchPlacesByDescription(commitbase, searchvalue) {
        axios
            .get(api_url + '/API/V1/places/description?desc=' + searchvalue)
            .then((response) => {
                commitbase(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    searchPlacesByKeyword(commitbase, label) {
        axios
            .get(api_url + '/API/V1/keywords/search?label=' + label)
            .then((response) => {
                commitbase(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}
