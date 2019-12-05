import React, { Component } from 'react';
import BackHeader from './BackHeader';
import uuid from 'uuid/v4';
import { connect } from 'react-redux'
import { getCities } from '../store/actions/cityAction'
import { chooseACity } from '../store/actions/itineraryActions'
import Itinerary from './Itinerary';

class ChosenCity extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         id:this.props.match.params.id,
    //         getCities: this.props.getCities (id),
    //         chooseACity:this.props.chooseACity(id)
    //     }
    // }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getCities (id)
        this.props.chooseACity(id)        
    }

    render () {
        let cityId = this.props.match.params.id;
        let cityImg = this.props.cities

        function myCity (array) {
            let chosenPhoto = [];
            for(let i = 0 ; i < array.length ; i++){
                if (array[i].name === cityId){
                    chosenPhoto.push(array[i])
                }
            }
            return chosenPhoto;
        }
        let cityPhoto = myCity(cityImg)
        return (
            <div className="page">
                <BackHeader />

                {cityPhoto.map((city) =>
                    <div key={uuid()} className="city-page-photo"
                style={{backgroundImage:`url(${city.img})`}}>
                 <h1 className="city-page-name">{city.name}</h1>
                </div>
                )}

                <div>
                    <h2>MYtineraries:</h2>
                </div>
                <Itinerary />

            </div>
        )
    }
}

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