//Indicating the Reducer how to update the state in case the actions mentions below are called inside the components

const initState = {
    itineraries: [],
    cities: []
}
const itineraryReducer = (state = initState, action) => {
    switch (action.type) {
        case ('CHOOSE_A_CITY'):
            return {
                ...state,
                itineraries: action.payload
            }
            case ('GET_CITIES'):
            return {
                ...state,
                cities: action.payload
            } 

            default:
                return state;
    }
    
}

export default itineraryReducer;