import axios from 'axios'

// Actions made in redux for the Activity component
export const getActivities = () => dispatch => {
    axios.get ('/api/activities')
    .then(res => {   
        dispatch ({
            type: "GET_ACTIVITIES",
            payload:res.data
        })
                   
    })
}
export const getCitiesActivity = (id) => dispatch => {
    axios.get (`/api/cities/${id}`)
    .then(res => {   
        dispatch ({
            type: "GET_CITIES_ACTIVITY",
            payload:res.data
        })
                   
    })
}
