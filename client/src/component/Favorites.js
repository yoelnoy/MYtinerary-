import React, { Component } from 'react';
import axios from 'axios';


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

        if(this.state.cache == null){
            this.favoritesShowOrHide = this.favoritesHide
        } else if (this.state.cache !==null){
            this.favoritesShowOrHide = this.favoritesShow
        }     
    }
    componentDidMount(){
        let itineraryId = this.props.itinerary._id

        axios.get('/api/users')
        .then(res => {
            this.setState({ favorites: res.data[0].favorites});

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
        });        
    }

    handleClick = () => {
        let itineraryId = this.props.itinerary._id
        console.log(itineraryId);
        
        this.setState({ heart: !this.state.heart })

        if (this.state.heart === true){
            this.setState({HeartState: 'far fa-heart favorite-full'}); 
        } else if (this.state.heart === false) {
            this.setState({HeartState: 'fas fa-heart favorite-empty'}); 
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