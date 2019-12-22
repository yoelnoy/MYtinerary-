import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { getCities } from '../store/actions/cityAction';
import Activity from './Activity';
import Comments from './Comments';
import Favorites from './Favorites';


class Itinerary extends Component {
    constructor() {
        super()
        this.state = {
            heart: false,
            HeartState: 'far fa-heart favorite',
            cache: window.localStorage.getItem('cacheToken')
        }
        this.commentsShow = 'comment-component-show';
        this.commentsHide = 'comment-component-hide';
        this.commentsShowOrHide = '';
        // this.handleClick = this.handleClick.bind(this);

        if(this.state.cache == null){
            this.commentsShowOrHide = this.commentsHide
        } else if (this.state.cache !==null){
            this.commentsShowOrHide = this.commentsShow
        }
        console.log(this.state.cache);
        console.log(this.commentsShowOrHide);
        
    }

    render (){
        let id = this.props.itineraries 
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
                {id.map((itinerary) => 
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
                            <Activity itinerary={itinerary} />        
                        </div>

                        <div className={this.commentsShowOrHide}>
                            <Comments itinerary={itinerary}/>
                        </div>

                    </div>)}

                </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        itineraries: state.itineraries.itineraries,
        cities: state.cities.cities
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        getCities: (id) => dispatch (getCities(id)),
        // chooseACity: (id) => dispatch ( chooseACity(id))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps) (Itinerary);