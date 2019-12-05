import React, { Component } from 'react';
import BackHeader from './BackHeader';
import axios from 'axios';
import Itinerary from './Itinerary';
import Activity from './Activity';
import Comments from './Comments';
import uuid from 'uuid/v4';
import Favorites from './Favorites';




class MyFavorites extends Component {
    constructor () {
        super()
        this.state = {
            myFavorites: [],
            favorites: [],
            itineraries: []
        }
    }    
    componentDidMount() {

        axios.get('/api/users')
        .then(res => {
            this.setState({ favorites: res.data[0].favorites});

            axios.get('/api/itineraries')
            .then(res => {
                this.setState({ itineraries: res.data});

                for(let i = 0 ; i < this.state.itineraries.length ; i++){
                    for(let f = 0 ; f < this.state.favorites.length; f++){
                        if(this.state.itineraries[i]._id == this.state.favorites[f] /*&& itineraryId == this.state.favorites[f]*/){
                            this.setState({ myFavorites: [... this.state.myFavorites, this.state.itineraries[i]] });
                            console.log(this.state.myFavorites);                            
                        }
                    }
                }
            });
        });
    }
    
    render () {
        let favoritesArray = this.state.myFavorites

        function PriceRange (a) {
            let visualPrice = '';
                if (a < 14.99){
                    visualPrice = '$'
                } else if (a > 15 && a < 49.99){
                    visualPrice = '$$'
                }else {
                    visualPrice = '$$$'
                } 
            return visualPrice
        }

        return (
            <div className="page">
                <BackHeader />
                <h1> myFavorites </h1>

                {favoritesArray.map((itinerary) => 
                    <div key={uuid()} className="itinerary">
                        <div className="itinerary-upper-photo" style={{backgroundImage:`url(${itinerary.img})`}}>
                        {/* <img className="itinerary-upper-photo-pic" src={itinerary.img} alt="City Photo"/> */}
                        </div>
                        <div className="itinerary-top">
                            <div className="itinerary-user">
                            <div className="itinerary-username" style={{backgroundImage:`url(${itinerary.userphoto})`}}></div>
                                <h4 className="itinerary-text">{itinerary.username}</h4>
                            </div>
                    
                            <div className="itinerary-info">
                                <div className="itinerary-info-title">
                                    {itinerary.title}
                                    <Favorites itinerary={itinerary}/>
                                    {/* <span onClick={this.handleClick} className={this.state.HeartState}></span> */}
                                </div>
                                <div className="itinerary-info-likes">
                                    <div><span className="far fa-star"></span>{itinerary.rating}</div>
                                    <div><span className="far fa-clock "></span>{itinerary.duration}H</div>
                                    <div>{PriceRange(itinerary.price)}</div>
                                </div>
                                <div className="itinerary-info-hashtags">
                                    <div>{itinerary.Hashtags}</div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="activity">
                            <Activity />        
                        </div>

                        <div className={this.commentsShowOrHide}>
                            <Comments/>
                        </div>

                    </div>)}                
            </div>
        )
    }
}

export default MyFavorites;

