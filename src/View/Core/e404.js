import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/landing.sass";

class e404 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: 1,
      image1: true
    }
  }

  render() {
    
    return (
      <div>
      
      <div className="landing-page">
        
        <div className="image">
          
          <div className="form">
            <div>
              <h1>Page Not Found</h1>
              <p>Montague Real Estate is known for its refreshing, modern and luxury approach to real estate, whilst providing a premium service to clients across the globe. Our relationships with clients can start with something as simple as real estate, but our services go far beyond that, including complex acquisitions, investment advice and luxury sales.</p>
              <Link to="/" className="btn">Home</Link>
              <Link to="/contact-us" className="btn">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="overlay"></div>
        <div className={"background image-1" + (this.state.image1 ? " active" : " hidden") }></div>
      </div>
      </div>
    )
  }
}

export default e404;