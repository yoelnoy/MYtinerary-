import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import { getActivities } from '../store/actions/activityAction';
import { getCitiesActivity } from '../store/actions//activityAction';
import uuid from 'uuid/v4';


class Activity extends Component {
    constructor() {
        super()
        this.state = {
            display: false,
            classNameButton: 'itinerary-bottom-view',
            arrowDirection: 'fas fa-chevron-down fa-2x arrow-down',
            viewActivities: 'View Activities',
            activitiesShowOrHide: 'activity-hide',
            activitiesArray: []
        }
    }
    componentDidMount(){ 
        let itineraryTitle = this.props.itinerary.title
        this.props.getCitiesActivity() 
        this.props.getActivities()  
        
    }

    handleClick = () => {
        this.setState({ display: !this.state.display})
        if(this.state.display === true){
            this.setState({ classNameButton: 'itinerary-bottom-view'})
            this.setState({ arrowDirection: 'fas fa-chevron-down fa-2x arrow-down'})
            this.setState({ activitiesShowOrHide: 'activity-hide'})
            this.setState({ viewActivities: 'View activities'})
        } else if(this.state.display === false) {
            this.setState({ classNameButton: 'itinerary-bottom-hide'})
            this.setState({ arrowDirection: 'fas fa-chevron-up fa-2x arrow-down'})
            this.setState({ activitiesShowOrHide: 'activity-show'})
            this.setState({ viewActivities: 'Hide activities'})

        }
        let itineraryTitle = this.props.itinerary.title
        console.log(itineraryTitle);
        let id = this.props.activities;
        console.log(id);
        let matchingActivities = []
        for(let i = 0 ; i < id.length ; i++){
            if(id[i].itinerary === itineraryTitle ){
                matchingActivities.push(id[i])
                this.setState({ activitiesArray: matchingActivities}) 
            }
        }
    }
   
    render (){
        let id = this.state.activitiesArray
        let myHtmlActivities = id.map((activity) => {
            return(
                <div key={uuid()} className="activity-slider-div">
                    <div className="activity-slider-title">
                        <p className="activity-slider-div-p">{activity.title}</p>
                        <p className="activity-slider-div-p-duration">
                            <span className="far fa-clock"></span>
                            {activity.duration}
                        </p>
                    </div>
                    <div className="activity-slider-each"  tabIndex="1" style={{ backgroundImage: `url(${activity.img})` }}></div>
                </div>
            )
        })     
        const settings = {
            dots: true,
            infinite: true,
            speed: 10,
            slidesToShow: 2,
            slidesToScroll: 1,
          };
        return (
            <div>
                <div>
                    <Slider className={this.state.activitiesShowOrHide} {...settings} style={{display: this.state.display }} >
                        {myHtmlActivities}
                    </Slider>

                    <button id="viewButton" onClick={this.handleClick} className={this.state.classNameButton}>
                        <div className="arrow-down-div"><span className={this.state.arrowDirection}></span></div>
                        <div><p className="view-activities">{this.state.viewActivities}</p></div>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activities.activities,
        cities: state.cities.cities
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: (id) => dispatch (getActivities(id)),
        getCitiesActivity: (id) => dispatch (getCitiesActivity(id))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps) (Activity);