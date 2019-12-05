import axios from 'axios'

export const getCities = () => dispatch => {
    axios.get ('/api/cities')
    .then(res => {   
        dispatch ({
            type: "GET_CITIES",
            payload: res.data
        })
                   
    })
}

export const testing = () => {
    return {
        type: 'TESTING',
        payload:  [{name: 'Madrid', country: 'Spain', id: '1'}]
    }  
}


  
