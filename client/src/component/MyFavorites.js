import React, { Component } from 'react';
import BackHeader from './BackHeader';
import axios from 'axios';
import Activity from './Activity';
import Comments from './Comments';
import uuid from 'uuid/v4';

// My favorites page, containig all previously saved favorites of the user
class MyFavorites extends Component {
    constructor () {
        super()
        this.state = {
            myFavorites: [],
            favorites: [],
            itineraries: [],
            heart: true,
            HeartState: 'far fa-heart favorite-empty',
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId'),
            spinner: true
        }

        // this.handleClick = this.handleClick.bind(this);
        this.favoritesShow = 'favorites-component-show';
        this.favoritesHide = 'favorites-component-hide';
        this.favoritesShowOrHide = '';
    }    
    componentDidMount() {
        // If user is logged in -> retrieve all users, compare userId to all userIDs and retrieve favorites of the logged in user
        if(this.state.userId !== null){
            axios.get('/api/users')
            .then(res => {
                let resArray = res.data;                
                for (let i = 0 ; i < resArray.length ; i++){
                    if(resArray[i]._id === this.state.userId){
                        this.setState({ favorites: resArray[i].favorites});
                        axios.get('/api/itineraries')
                        .then(res => {
                            this.setState({ 
                                itineraries: res.data,
                                spinner: false
                            });

                            for(let i = 0 ; i < this.state.itineraries.length ; i++){
                                for(let f = 0 ; f < this.state.favorites.length; f++){
                                    if(this.state.itineraries[i]._id === this.state.favorites[f] /*&& itineraryId == this.state.favorites[f]*/){
                                        this.setState({ myFavorites: [ ... this.state.myFavorites, this.state.itineraries[i]] });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    }
    
    render () {
        // All html is writen as a function in order to incorporate spinner/loader and keep the Html clean
        let favoritesArray = this.state.myFavorites
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
            <div className="page">
                <BackHeader />
                <h1> myFavorites </h1>

                {favoritesArray.map((itinerary) => 
                    <div key={uuid()} className="itinerary">
                        <div className="itinerary-upper-photo" style={{backgroundImage:`url(${itinerary.img})`}}>
                        </div>
                        <div className="itinerary-top">
                            <div className="itinerary-user">
                            <div className="itinerary-username" style={{backgroundImage:`url(${itinerary.userphoto})`}}></div>
                                <h4 className="itinerary-text">{itinerary.username}</h4>
                            </div>
                    
                            <div className="itinerary-info">
                                <div className="itinerary-info-title">
                                    {itinerary.title}
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
                            <Activity itinerary={itinerary}/>        
                        </div>

                        <div className={this.commentsShowOrHide}>
                            <Comments itinerary={itinerary}/>
                        </div>
                    </div>)}                
            </div>
        }
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
            <div>
                {data}
            </div>
        )
    }
}

export default MyFavorites;

