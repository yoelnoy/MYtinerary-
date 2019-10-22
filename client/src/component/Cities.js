import React, { Component } from 'react';
import BackHeader from './BackHeader';
import CitiesList from './CitiesList';



class Cities extends Component {
    
    
    render () {
        
        
        return (
            <div className="Cities-main">
                <BackHeader />
                <h1>Cities</h1>
                <CitiesList />
            </div>
        )
    }
}

export default Cities;