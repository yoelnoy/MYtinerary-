import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import { getActivities } from '../store/actions/activityAction';
import { getCitiesActivity } from '../store/actions//activityAction';
import uuid from 'uuid/v4';


class Activity extends Component {
    
    componentDidMount(){ 
        this.props.getCitiesActivity() 
        this.props.getActivities()       
    }

    state = {
        display: 'none',
        classNameButton: 'itinerary-bottom  grey lighten-4',
        arrowDirection: 'fas fa-chevron-down fa-2x arrow-down',
        viewActivities: 'View Activities'
    }
   
    isSwitchOn = () => {
        let slimArrowDown= 'fas fa-chevron-down fa-2x arrow-down';
        let slimArrowUp= 'fas fa-chevron-up fa-2x arrow-down';
        let classNameLighten4 = 'itinerary-bottom  grey lighten-4';
        let classNameDarken2 = 'itinerary-bottom  light-blue darken-2';
        
        this.setState(prevState => ({
        display: prevState.display === 'none' ? 'block' : 'none',
        classNameButton: prevState.className === classNameLighten4 ? classNameDarken2 : classNameLighten4,
        arrowDirection: prevState.arrowDirection === slimArrowDown ? slimArrowUp : slimArrowDown,
        viewActivities: prevState.viewActivities === 'View Activities' ? 'Close Activities' : 'View Activities' 
        
        }));
    }

    render (){
        let id = this.props.activities
        
        const settings = {
            dots: true,
            infinite: true,
            speed: 10,
            slidesToShow: 2,
            slidesToScroll: 1,
          };

        return (
            <div>
                <div id="activitiesDiv" className="itinerary-activity" >
                    <h3 className="slide-title"> In this MYitinerary</h3>
                    <Slider className="slide-testing" {...settings} style={{display: this.state.display }} >
                    
                    {id.map((activity) => 
                        <div key={uuid()} className="slide-1-1"  tabIndex="1" style={{backgroundImage:`url(${activity.img})`}}>
                        {/* style={{backgroundImage:`url(${activity.img})`}}> */}
                            {activity.title}
                            {activity.duration}
                        </div>
                    )}
                        <div className="slide-1-1"  tabIndex="1">
                            111111
                        </div>
                        <div className="slide-1-1">
                            222222
                        </div>
                        <div className="slide-1-1">
                            333333
                        </div>
                        
                        
                    </Slider>

                    <button id="viewButton" onClick={this.isSwitchOn} className={this.state.classNameButton}>
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