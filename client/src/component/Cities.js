import React, { Component } from 'react';
import BackHeader from './BackHeader';
// import CitiesList from './CitiesList';
import CitiesList from './citiesList';



class Cities extends Component {
    
    
    render () {
        
        
        return (
            <div className="page">
                <BackHeader />
                <CitiesList className="cityList-main" />
            </div>
        )
    }
}

export default Cities;