import axios from 'axios'

export const chooseACity = (id) => dispatch => {
    axios.get (`/api/itineraries/${id}`)
    .then(res => {   
        dispatch ({
            type: "CHOOSE_A_CITY",
            payload: res.data
        })
                   
    })
}
export const getCities = (id) => dispatch => {
    axios.get (`/api/cities/${id}`)
    .then(res => {   
        dispatch ({
            type: "GET_CITIES",
            payload: res.data
        })
                   
    })
}

