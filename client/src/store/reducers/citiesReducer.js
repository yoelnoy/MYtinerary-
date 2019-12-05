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
            
        case ('TESTING'):
            return {
                ...state,
                cities: action.payload
            }

            default:
                return state;
    }
    
}

export default citiesReducer;