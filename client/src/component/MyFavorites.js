import React, { Component } from 'react';
import BackHeader from './BackHeader';
import axios from 'axios';
import Activity from './Activity';
import Comments from './Comments';
import uuid from 'uuid/v4';


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

        this.handleClick = this.handleClick.bind(this);
        this.favoritesShow = 'favorites-component-show';
        this.favoritesHide = 'favorites-component-hide';
        this.favoritesShowOrHide = '';
    }    
    componentDidMount() {
        axios.get('/api/users')
        .then(res => {
            this.setState({ favorites: res.data[0].favorites});
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
        });
    }
    handleClick = () => {
        let itineraryId = this.props.itinerary._id
        this.setState({ heart: !this.state.heart })
        if (this.state.heart === false){
            this.setState({HeartState: 'far fa-heart favorite-empty'}); 
        } else {
            this.setState({HeartState: 'fas fa-heart favorite-full'}); 
        }  
        axios.put('/api/users/' + this.state.userId, {
            favorites: itineraryId
        }).then (res => {
            console.log(res);
        }).catch (err => {
            console.log(err);
        })  
    }
    
    render () {
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
                                    {/* <Favorites onClick={this.handleClick} itinerary={itinerary}/> */}
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

