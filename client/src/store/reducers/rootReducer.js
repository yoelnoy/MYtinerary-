// Root reducer - main reducer containg all the child reducers

import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer";
import activityReducer from "./activityReducer";
const rootReducer = combineReducers({cities: citiesReducer, itineraries: itineraryReducer, activities: activityReducer});


export default rootReducer;