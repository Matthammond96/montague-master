import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carousel extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component
    };
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    return (
        <div className="carousel-component">
          <div>
            <h2><span>Other Properties</span></h2>
          </div>
          <div className="box">
            <div className="image-left">
              <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/3-5-wraith/in-page-assets/wraith-carousel-01.jpg/jcr:content/renditions/cq5dam.web.2880.jpeg"></img>
            </div>
            <div className="image-middle">
              <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/3-5-wraith/in-page-assets/wraith-carousel-02.jpg/_jcr_content/renditions/cq5dam.web.1920.jpeg"></img>
            </div>
            <div className="image-right">
              <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/3-5-wraith/in-page-assets/wraith-carousel-03.jpg/jcr:content/renditions/cq5dam.web.1242.jpeg"></img>
            </div>
        </div>
      </div>
    )
  }
}

export default Carousel;