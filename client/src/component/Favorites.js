import React, { Component } from 'react';
import axios from 'axios';

//The opption to click the favorite heart and save an itinerary to your Favorites page
class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            heart: false,
            HeartState: 'far fa-heart favorite-full',
            cache: window.localStorage.getItem('cacheToken'),
            userId: window.localStorage.getItem('userId'),
            favorites: [],
            itineraries: [],
            spinner: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.favoritesShow = 'favorites-component-show';
        this.favoritesHide = 'favorites-component-hide';
        this.favoritesShowOrHide = '';

        //Hiding/showing the favorite icon according to whether the user is logged in or not
        if(this.state.cache == null){
            this.favoritesShowOrHide = this.favoritesHide
        } else if (this.state.cache !==null){
            this.favoritesShowOrHide = this.favoritesShow
        }     
    }

    componentDidMount(){
        //If the user is logged in the favorites from his account are imported. Saved favorites will appear as full red heart
        let itineraryId = this.props.itinerary._id
        axios.get('/api/users')
        .then(res => {
            let resArray = res.data;                
            for (let i = 0 ; i < resArray.length ; i++){
                if(resArray[i]._id === this.state.userId){
                    this.setState({ favorites: resArray[i].favorites});
                    axios.get('/api/itineraries')
                    .then(res => {
                        this.setState({ itineraries: res.data});
                        this.setState({ spinner: false});
                    
                        for(let i = 0 ; i < this.state.itineraries.length ; i++){
                            for(let f = 0 ; f < this.state.favorites.length; f++){
                                if((this.state.itineraries[i]._id === this.state.favorites[f]) && itineraryId === this.state.favorites[f]){
                                    this.setState({HeartState: 'fas fa-heart favorite-empty'});
                                }
                            }
                        }
                    });
                }
            }   
        });        
    }
    //Clicking the heart icon to select itinerary as favorite
    handleClick = () => {
        let itineraryId = this.props.itinerary._id
        
        this.setState({ heart: !this.state.heart })

        if (this.state.heart === true){
            this.setState({HeartState: 'far fa-heart favorite-full'}); 
        } else if (this.state.heart === false) {
            this.setState({HeartState: 'fas fa-heart favorite-empty'}); 
        }  
        axios.put('/api/users/' + this.state.userId, {
            favorites: itineraryId
        }).then (res => {'Favorite Chosen'})
        .catch (err => {'Error'})  
    }
    
    render () {
        //showing a loader until the favoties are retrive from DB
        let data;
        if (this.state.spinner){
            data = 
            <div className="spinner-grow spinner-hearts" role="status">
                <span className="sr-only"></span>
            </div>
        } else {
            data=
            <div className="page">
                <div className={this.favoritesShowOrHide}>

                    <span onClick={this.handleClick} className={this.state.HeartState}></span>
                </div>
            </div>
        }
        return (
            <div>
                {data}
            </div>
        )
    }
}

export default Favorites;