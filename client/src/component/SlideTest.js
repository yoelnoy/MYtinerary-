import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import { getCities } from '../store/actions/cityAction'
import uuid from 'uuid/v4';

class SimpleSlider extends Component {

  componentDidMount(){
    this.props.getCities ()
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 10,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let counter = 0; 

    let items = this.props.cities.map((city,index, allCities) => {

      if(counter %4 === 0){
        counter = 1; 
        var thisElement = allCities[index];
        var nextElement = allCities[index+1];
        var twoNextElement = allCities[index+2];
        var threeNextElement = allCities[index+3];

        return (
          <div key={uuid()}>
            <div className="slide-main">
              <div className="slide-div-top">
                <div className="slide-pic-div"><h4 className="slide-city-name">{thisElement.name}</h4><div className="slide-city-name-background"></div><img src={thisElement.img} alt="1" className="slide-pic-div-img"/></div>
                <div className="slide-pic-div"><h4 className="slide-city-name">{nextElement.name}</h4><div className="slide-city-name-background"></div><img src={nextElement.img} alt="1" className="slide-pic-div-img"/></div>
              </div>

              <div className="slide-div-bottom">
                <div className="slide-pic-div"><h4 className="slide-city-name">{twoNextElement.name}</h4><div className="slide-city-name-background"></div><img src={twoNextElement.img} alt="1" className="slide-pic-div-img"/></div>
                <div className="slide-pic-div"><h4 className="slide-city-name">{threeNextElement.name}</h4><div className="slide-city-name-background"></div><img src={threeNextElement.img} alt="1" className="slide-pic-div-img"/></div>
              </div>
            </div>
          </div>
      )
      }else{
        counter++;
      }
  }
);



    return (
      <div className="slide-main-div">
        <Slider {...settings}>
          {/* 1 */}



        {items}          
          
        </Slider>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      cities: state.cities.cities
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      getCities: () => dispatch (getCities())
  }
} 


export default connect(mapStateToProps, mapDispatchToProps) (SimpleSlider);