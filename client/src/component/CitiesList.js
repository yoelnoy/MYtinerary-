import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';


    class CitiesList extends Component {

        state = {
            cities: [],
            search: ''      
        }
        componentDidMount(){
            axios.get ('/api/items')
            .then(res => {
                this.setState({ cities: res.data });
            });   
        }
        updateSearch(event) {
            this.setState({search:event.target.value.substr(0, 20)})    
            console.log(event.target.value);
                      
        }
        render(){
            
            let filteredCities = this.state.cities
            .filter((city) =>  city.city.toLowerCase()
                .startsWith(this.state.search.toLowerCase()));

            return(
                <div>
                    <div className="searchBar-main">
                        <div className="searchBar-icon-div">
                        <button className="btn"> 
                            <span className="fas fa-search fa-2x searchBar-icon"></span>
                            </button>
                        </div>

                        <div className="searchBar-input-div">
                            <input type="text" 
                                value={this.state.search}
                                onChange={this.updateSearch.bind(this)} 
                                className="searchBar-input"/>
                        </div>

                    </div>
                    <ul>
                        {filteredCities.map((city) => 
                        <li key={uuid()}> City:{ city.city }
                            <span className="betweenCityAndCountry"></span> 
                            Country: { city.country } 
                            <span className="betweenCityAndCountry"></span>  
                              
                        </li> )}
                    </ul>
                </div>
            )
        }
    }
        
        
       
       
       

export default CitiesList;