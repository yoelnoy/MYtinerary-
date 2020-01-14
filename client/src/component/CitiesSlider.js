import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux';
import { getCities } from '../store/actions/cityAction'
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';

// Clickable cities slider in the bottom of Landingpage. 
class CitiesSlider extends Component {
  componentDidMount(){
    // Retriving all citis with redux
    this.props.getCities ()
  }

  render() {
    //Settings for the slider from reactstrap website
    const settings = {
      dots: true,
      infinite: true,
      speed: 10,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    //
    let counter = 0; 
    let items = this.props.cities.map((city,index, allCities) => {

      if(counter %4 === 0){
        counter = 1; 
        let firstElement = allCities[index];
        let secondElement = allCities[index+1];
        let thirdElement = allCities[index+2];
        let forthElement = allCities[index+3];

        return (
          <div key={uuid()}>
            <div className="slide-main">
              <div className="slide-div-top">

               <div className="slide-pic-div">
                <Link to={`/ChosenCity/${firstElement.name}`}><p className="slide-city-name">{firstElement.name}</p></Link>
                <div className="slide-city-name-background"></div>
                <img src={firstElement.img} alt="1" className="slide-pic-div-img"/>
              </div>

              <div className="slide-pic-div">
                <Link to={`/ChosenCity/${secondElement.name}`}><p className="slide-city-name">{secondElement.name}</p></Link>
                <div className="slide-city-name-background"></div>
                <img src={secondElement.img} alt="1" className="slide-pic-div-img"/>
              </div>

            </div>

            <div className="slide-div-bottom">
              
              <div className="slide-pic-div">
                <Link to={`/ChosenCity/${thirdElement.name}`}><p className="slide-city-name">{thirdElement.name}</p></Link>
                <div className="slide-city-name-background"></div>
                <img src={thirdElement.img} alt="1" className="slide-pic-div-img"/>
              </div>

              <div className="slide-pic-div">
                <Link to={`/ChosenCity/${forthElement.name}`}><p className="slide-city-name">{forthElement.name}</p></Link>
                <div className="slide-city-name-background"></div>
                <img src={forthElement.img} alt="1" className="slide-pic-div-img"/>
              </div>

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


export default connect(mapStateToProps, mapDispatchToProps) (CitiesSlider);