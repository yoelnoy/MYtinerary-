import React, { Component } from 'react';
import CitiesList from './citiesList';



class Cities extends Component {
    
    
    render () {
        
        
        return (
            <div className="page">
                <CitiesList className="cityList-main" />
            </div>
        )
    }
}

export default Cities;