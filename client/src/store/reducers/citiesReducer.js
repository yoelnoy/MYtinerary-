//Indicating the Reducer how to update the state in case the actions mentions below are called inside the components

const initState = {
    cities:[]
}
const citiesReducer = (state = initState, action) => {
    switch (action.type) {
        case ('GET_CITIES'):
            return {
                ...state,
                cities: action.payload
            } 

            default:
                return state;
    }
    
}

export default citiesReducer;