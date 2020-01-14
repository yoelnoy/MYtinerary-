import axios from 'axios'

// Actions made in redux for the CitiesList component
export const getCities = () => dispatch => {
    axios.get ('/api/cities')
    .then(res => {   
        dispatch ({
            type: "GET_CITIES",
            payload: res.data
        })
                   
    })
}



  
