import React, { Component } from 'react';
import BackHeader from './BackHeader';
import uuid from 'uuid/v4';
import { connect } from 'react-redux'
import { getCities } from '../store/actions/cityAction'
import { chooseACity } from '../store/actions/itineraryActions'
import Itinerary from './Itinerary';

//this component is the page of the city chosen by the user. This component contains all the information and other components about the city.
class ChosenCity extends Component {
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getCities (id)
        this.props.chooseACity(id)        
    }
    render () {
        let cityId = this.props.match.params.id;
        let cityList = this.props.cities
        function myCity (array) {
            let chosenPhoto = [];
            for(let i = 0 ; i < array.length ; i++){
                if (array[i].name === cityId){
                    chosenPhoto.push(array[i])
                }
            }
            return chosenPhoto;
        }
        let cityFinal = myCity(cityList)
        return (
            <div className="page">
                <BackHeader />
                {cityFinal.map((city) =>
                <div className="city-page-photo-div">
                    <div key={uuid()} className="city-page-photo"
                        style={{backgroundImage:`url(${city.img})`}}>
                    </div>
                    <div className="city-page-photo-overlay"></div>
                    <div className="city-page-name-div">
                        <h1 className="city-page-name">{city.name}</h1>
                    </div>
                </div>
                )}
                <div className="itineraries-list">
                    <Itinerary />
                </div>
            </div>
        )
    }
}

//Maping theses arrays to props in order to use them inside the app throug Redux
const mapStateToProps = (state) => {
    return {
        itineraries: state.itineraries.itineraries,
        cities: state.cities.cities
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        getCities: (id) => dispatch (getCities(id)),
        chooseACity: (id) => dispatch ( chooseACity(id))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps) (ChosenCity);