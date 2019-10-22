import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="slide-main-div">
        <h3 className="slide-title"> Popular MYtineraries</h3>
        <Slider {...settings}>
          {/* 1 */}
          <div className="slide-main">
            <div className="slide-div-top">
              <div className="slide-pic-div"><h4 className="slide-city-name">Madrid</h4><div className="slide-city-name-background"></div><img src="https://static.amazon.jobs/locations/42/thumbnails/Madrid_-_Thumbnail.jpg?1453992961" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">Paris</h4><div className="slide-city-name-background"></div><img src="https://d39gusjpdm7p1o.cloudfront.net/data/layout_grouping/static_page_step/20784_a330628091ede7eb1548d6cda58e0357.jpg?ver=1477297804" alt="1" className="slide-pic-div-img"/></div>
            </div>

            <div className="slide-div-bottom">
              <div className="slide-pic-div"><h4 className="slide-city-name">Bangkok</h4><div className="slide-city-name-background"></div><img src="http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/most-popular-historical/pagePropertiesImage/bangkok-best-things-to-do.jpg.jpg" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">Tel Aviv</h4><div className="slide-city-name-background"></div><img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/05/11/tel-aviv-jaffa.jpg?w968h681" alt="1" className="slide-pic-div-img"/></div>
            </div>
          </div>
          {/* 2 */}
          <div className="slide-main">
            
            <div className="slide-div-top">
              <div className="slide-pic-div"><h4 className="slide-city-name">London</h4><div className="slide-city-name-background"></div><div className="slide-city-name-background"></div> <img src="https://i0.wp.com/metro.co.uk/wp-content/uploads/2019/07/GettyImages-1083878136.jpg?quality=90&strip=all&zoom=1&resize=644%2C428&ssl=1" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">New York</h4><div className="slide-city-name-background"></div><img src="https://static.amazon.jobs/locations/58/thumbnails/NYC.jpg?1547618123" alt="1" className="slide-pic-div-img"/></div>
            </div>

            <div className="slide-div-bottom">
              <div className="slide-pic-div"><h4 className="slide-city-name">Tokyo</h4><div className="slide-city-name-background"></div><img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg?w968h681" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">Sydney</h4><div className="slide-city-name-background"></div><img src="https://www.camatic.com/wp-content/uploads/2018/11/SOH_74_1600x1200.jpg" alt="1" className="slide-pic-div-img"/></div>
            </div>
          </div>
          {/* 3 */}
          <div className="slide-main">
            <div className="slide-div-top">
              <div className="slide-pic-div"><h4 className="slide-city-name">Copenhagen</h4><div className="slide-city-name-background"></div><img src="https://d304516337c65f110745-a599a348219eecff7241ffe904dbadd3.ssl.cf3.rackcdn.com/2017/03/iStock-540594608.jpg" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">Berlin</h4><div className="slide-city-name-background"></div><img src="https://cdn.getyourguide.com/img/tour_img-2119950-146.jpg" alt="1" className="slide-pic-div-img"/></div>
            </div>

            <div className="slide-div-bottom">
              <div className="slide-pic-div"><h4 className="slide-city-name">Amsterdam</h4><div className="slide-city-name-background"></div><img src="https://www.holland.com/upload_mm/d/0/7/69550_fullimage_fietsen-amsterdam_1360x.jpg" alt="1" className="slide-pic-div-img"/></div>
              <div className="slide-pic-div"><h4 className="slide-city-name">Rio</h4><div className="slide-city-name-background"></div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0D9Ut8PX2bxlLZOS21C02CTXxjO4vygeDE3zuhy7Jc_HyB8oU&s" alt="1" className="slide-pic-div-img"/></div>
            </div>
          </div>

          
          
        </Slider>
      </div>
    );
  }
}