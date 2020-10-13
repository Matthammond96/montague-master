import React, { Component } from 'react';
import Slider from "react-slick";
import {ArrowLeft, ArrowRight} from '../../Styles/icons';

class Carousel extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  prev() {
    this.slider.slickPrev();
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
    }
  }
  
  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: this.state.component.slidesPerPage,
      row: 1,
      responsive: [
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <div className="carousel-component page-container">
          <div>
            <h2><span>{this.state.component.title}</span></h2>
          </div>
          <div className="carousel-container">
            <div className="arrow-container prev" onClick={this.prev}><ArrowLeft colour="#1c1c1c"></ArrowLeft></div>
            <Slider className="slick-carosuel-flex" ref={c => (this.slider = c)} {...settings}>
              {this.state.component.images.map(image => (
                <div className="item">
                  <div className="padding">
                    <img alt="" src={image.fields.file.url}></img>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="arrow-container next" onClick={this.next}><ArrowRight colour="#1c1c1c"></ArrowRight></div>
        </div>
      </div>
    )
  }
}

export default Carousel;