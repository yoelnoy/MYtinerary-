import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

let items = [
  {
    src: 'https://www.parisvatry.com/wp-content/uploads/2018/12/madrid-light.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://d39gusjpdm7p1o.cloudfront.net/data/layout_grouping/static_page_step/20784_a330628091ede7eb1548d6cda58e0357.jpg?ver=1477297804',
    altText: 'Slide 2',
    caption: 'Slide 2'
  }
];

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
            <div className="carousel-main">
                <div className="carousel-div-top">
                    <div className="pic-div"><img className="pic-div-img" src={item.src} alt={item.altText} /></div>
                    <div className="pic-div"><img className="pic-div-img" src={item.src} alt={item.altText} /></div>
                </div>
                <div className="carousel-div-bottom">
                    <div className="pic-div"><img className="pic-div-img" src={item.src} alt={item.altText} /></div>
                    <div className="pic-div"><img className="pic-div-img" src={item.src} alt={item.altText} /></div>
                </div>
            </div>          
        </CarouselItem>
      );
    });


    return (
        <div className="sub-carousel-main">
            <Carousel className="A123"
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl  direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl  direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
          

        </div>
    );
  }
}


export default Example;