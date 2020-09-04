import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VideoComponent extends Component {
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
      <section className="page-container">
        <h2 className="section-title"><span className="line">Virtual Tour</span></h2>
        <p>
In a beautiful building from 1929, we find this fantastic attic with terrace, fireplace and a ceiling height of about 6.5 meters. The home offers 3 generously sized bedrooms and large social areas in an open floor plan. Consistently exclusive material selection. Well-run association with very good finances. Welcome to the viewing.</p>
        <div className="video-component">
          <div className="play-button"></div>
          <img src="https://process.fasad.eu/rimage.php?url=https%3A%2F%2Fimages02.fasad.eu%2F238%2F400300%2F1402243%2Fhighres%2F13222567.jpg&i=1&m=strict&w=1600&h=1066&c=100&u=2"></img>
        </div>
      </section>
    )
  }
}

export default VideoComponent;