import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux'
import { getCities } from '../store/actions/cityAction'
import { testing } from '../store/actions/cityAction'
import { Link } from 'react-router-dom';


class CitiesList extends Component {
    
    state = {
        search: ''
    }

    componentDidMount(){
        this.props.getCities ()        
    }

    updateSearch(event) {
        this.setState({search:event.target.value.substr(0, 20)})    
    }

    newCityInfo(event){
        this.props.filterCities()    }
    render() {
        
        let filteredCities = this.props.cities
            .filter((city) =>  city.name.toLowerCase()
                .startsWith(this.state.search.toLowerCase()));
        return(
            <div className="citiesList-main"> 

                <div className="searchBar-main">
                    <div className="searchBar-input-div">
                        <input type="text"
                            placeholder="Search for your city" 
                            className="searchBar-input"
                            /*value={this.props}*/
                            onChange={this.updateSearch.bind(this)}  
                            />
                    </div>
                </div>

                <ul>
                    {filteredCities.map((city) => 
                        <Link to={`/ChosenCity/${city.name}`} key={uuid()}>
                        <button onClick={this.chooseACity} className="btn btn-primary cityListBtn" >
                            <li className="cityLi" > 
                                { city.name }
                                <span className="colon">-</span> 
                                { city.country }   
                            </li>
                        </button>
                    </Link>
                    )}
                </ul>

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
        testing: () => dispatch(testing()),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (CitiesList);