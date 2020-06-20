import axios from 'axios';

const api_url = "https://mapsyapi.herokuapp.com";

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

    deletePlace(commitbase, id){
    
            axios
        .delete(api_url+'/API/V1/places/delete?id='+id)
        .then(() => {
          
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
