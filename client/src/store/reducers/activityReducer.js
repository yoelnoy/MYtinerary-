const initState = {
    activities: [],
    cities: []
}
const activityReducer = (state = initState, action) => {
    switch (action.type) {
        case ('GET_ACTIVITIES'):
            return {
                ... state,
                activities: action.payload
            }
            
            case ('GET_CITIES_ACTIVITY'):
                return {
                    ... state,
                    cities: action.payload
            }

            default:
                return state;
    }
    
}

export default activityReducer;