import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux'
import { getCities } from '../store/actions/cityAction'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackHeader from './BackHeader';


// The full cities list with filter
class CitiesList extends Component {
    state = {
        search: '',
        itineraries: [],
        cities: [],
        numberOfItineraries: [],
        spinner: true
    }
    componentDidMount(){
        this.props.getCities()   
        axios.get('/api/itineraries')
        .then(res => {
            this.setState({ itineraries: res.data})
           
        axios.get('/api/cities')
        .then(res => {
            this.setState({ 
                cities: res.data,
                spinner: false
            })            
            let allItineraries = this.state.itineraries;
            let allCities = this.state.cities;
            let allNumberOfItineraries = []
            let finalArray = []
            for(let i = 0 ; i <allItineraries.length ; i++){
                for(let j = 0 ; j <allCities.length ; j++){
                    if((allItineraries[i].city === allCities[j].name)){
                        allNumberOfItineraries.push(allItineraries[i])
                    }
                }
            }
            for(let i = 0 ; i <allCities.length ; i++){
                for(let j = 0 ; j <allNumberOfItineraries.length ; j++){
                    if((allCities[i].name === allNumberOfItineraries[j].city)){
                        finalArray.push(allCities[i].name)
                    }
                }
            }
        })
    })  
    }

    // Obtaining the letters typed by the user and updating the state inorder to filter the list
    updateSearch(event) {
        this.setState({search:event.target.value.substr(0, 20)})    
    }

    render() {
        // After filtering the array of cities by the letters typed by the user, iterating over the filtered array and showing results in html
        let filteredCities = this.props.cities
            .filter((city) =>  city.name.toLowerCase()
                .startsWith(this.state.search.toLowerCase()));  
                let allItineraries = this.state.itineraries
        
        //my new try
        let testingNew =  filteredCities.map((city) => {
                let someArray = []
                for(let i = 0 ; i <allItineraries.length ; i++){
                    if((allItineraries[i].city === city.name)){
                        someArray.push(allItineraries[i])
                    }
                }

            return(
                <Link to={`/ChosenCity/${city.name}`} key={uuid()}>
                    <button onClick={this.chooseACity} className="btn  cityListBtn" >
                        <li className="cityLi" > 
                            <span className="colon-number"> ( {someArray.length} ) </span>
                            { city.name }
                        </li>
                    </button>
                </Link>
            )
        })
        let data;
        if (this.state.spinner){
            data = 
            <div className="spinner-div">
                <div className="spinner-border spinner-icon" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        } else {
            data = 
            <div className="citiesList-main"> 
                <BackHeader />
                <div className="searchBar-main">
                    <div className="searchBar-input-div">
                        <input type="text"
                            placeholder="Search for your city" 
                            className="searchBar-input"
                            onChange={this.updateSearch.bind(this)}  
                            />
                            <span className="fas fa-search search-icon-filter"></span>
                    </div>
                </div>
                <ul className="cities-list-ul">
                    {testingNew}
                </ul>
            </div>
        }
        return(
            <div>
                {data}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities.cities
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        getCities: () => dispatch (getCities()),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (CitiesList);