import axios from 'axios';

const api_url = "https://mapsyapi.herokuapp.com";
//const api_url = "http://localhost:8080";

export default{
    getPlaces(commitbase){
       
        axios
        .get(api_url+'/API/V1/places/all')
        .then(response => {
            commitbase(response.data)
        })
        .catch(error => {
            console.log(error)
        });
      },

    addPlace(commitbase, place){
        axios
        .post(api_url+'/API/V1/places/add', {
            title: place.title,
            description: place.description,
            coordinates: {
                longitude: place.coordinates.longitude,
                latitude: place.coordinates.latitude
            }
          })
        .then(response => {commitbase(response.status)})
        .catch(error => {
            console.log(error)
        });
    },

    deletePlace(commitbase, place){
    
            axios
        .delete(api_url+'/API/V1/places/delete?id='+place._id)
        .then((response) => {
            console.log(response.status);
            commitbase(response.status)
        })
        .catch(error => {
          console.log(error)
        })
    },

    searchPlace(commitbase, searchvalue){
      axios
      .get(api_url+'/API/V1/places/all/search?value='+searchvalue)
      .then(response => {
          commitbase(response.data)
      })
      .catch(error => {
          console.log(error)
      });
    }

  
}
