import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PropertyToggle extends Component {
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
        <div className="property-toggle-container">
          <div className="toggle-headings">
            <p>The Facts</p>
            <p>Map</p>
            <p>Street View</p>
            <p>Floor Plan</p>
          </div>
          <div className="toggle-content">
            {/* <img src="/map-placeholder.png"></img> */}

      <p>A minimalist masterpiece - this townhouse in the West Village is truly something very special. 11 St. Nestled in a picturesque tree-lined neighborhood, Luke’s Place is a newly renovated, 5-story single-family townhouse with approximately 631 square meters of carefully completed living space. There is also a further 130 square meters of outdoor space consisting of a large and lush landscaped garden, private balconies and a fantastic roof terrace with a 1.8 meter large marble relaxation pool.</p>
      <h3>Amentites</h3>
            <div class="product-content-wood-inline">
    <div class="product-content-must-section border-top">
      <p>Wood Type <span>Iroko</span></p>
    </div>
    <div class="product-content-must-section">
      <p>Frame Thickness <span>70mm</span></p>
    </div>
    <div class="product-content-must-section">
      <p>Height <span>From 3ft to 7ft</span></p>
    </div>
    <div class="product-content-must-section border-bottom">
      <p>Suitable for Automation <span>Yes</span></p>
    </div>
  </div>
  <div class="product-content-wood-inline">
    <div class="product-content-must-section border-top">
      <p>Joints <span>Mortice and Tenon</span></p>
    </div>
    <div class="product-content-must-section">
      <p>Board Thickness <span>15mm Double V</span></p>
    </div>
    <div class="product-content-must-section">
      <p>Recommended Fixings <span>Heavy Duty Hook and Band</span></p>
    </div>
    <div class="product-content-must-section">
      <p>Guarantee <span>3 Year Workmanship</span></p>
    </div>
  </div>
      <h3>Location</h3>
  <p>A minimalist masterpiece - this townhouse in the West Village is truly something very special. 11 St. Nestled in a picturesque tree-lined neighborhood, Luke’s Place is a newly renovated, 5-story single-family townhouse with approximately 631 square meters of carefully completed living space. There is also a further 130 square meters of outdoor space consisting of a large and lush landscaped garden, private balconies and a fantastic roof terrace with a 1.8 meter large marble relaxation pool.</p>
  <h3>Investment Oppertuninity</h3>
  <p>A minimalist masterpiece - this townhouse in the West Village is truly something very special. 11 St. Nestled in a picturesque tree-lined neighborhood, Luke’s Place is a newly renovated, 5-story single-family townhouse with approximately 631 square meters of carefully completed living space. There is also a further 130 square meters of outdoor space consisting of a large and lush landscaped garden, private balconies and a fantastic roof terrace with a 1.8 meter large marble relaxation pool.</p>
          </div>
        </div>
      </section>
    )
  }
}

export default PropertyToggle;