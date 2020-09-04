import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import Carousel from '../Core/Carousel';
import ContactForm from './ContactForm';
import PropertyToggle from './PropertyToggle';
import ProductGallery from '../Core/ProductGallery';
import VideoComponent from '../Core/VideoComponent';
import "../../Styles/property.sass"
import { HashLink } from 'react-router-hash-link';

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: window.location.pathname.replace("/property/", ""),
      property: {},
      loaded: false,
      isTop: false,
      heading: [{
        name: "Property Highlights",
        link: "#property-highlights"
      },{
        name: "Link 2",
        link: "#linkn"
      }]
    };
  }

  componentDidMount() {
    client
    .getEntry(this.state.id)
    .then(entry => this.setState({property: entry.fields, loaded: true}))
    .catch(err => console.log(err));
  }

  
  

  render() {
    
    return (
      <div className="">
        {this.state.loaded ? (
          <div className="property">                
            <div className="property-image">
              <div className="content-overlay">
                <div className="content">
                  <h3>{this.state.property.location}</h3>
                  <h1>{this.state.property.name}</h1>
                  <button class="btn">Enquire Now</button>
                </div>
              </div>
              <img src={this.state.property.photos[0].fields.file.url}></img>
            </div>

            <div className="property-tabs">
              <div id="tabbed-scrolled" className={`tabs-container ${this.state.isTop && 'fix-me'}`}>
                {this.state.heading.map(header => {
                  const scrollWithOffset = (el) => {
                    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
                    const yOffset = -480; 
                    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
                  }

                  return (
                    <div className="tab-link active">
                      <HashLink to="#property-highlights" scroll={el => scrollWithOffset(el)}><p>Property Highlights</p></HashLink>
                    </div>
                  )
                })}

                
                  
                   
                <div className="tab-link">
                  <p>Floor Plan</p>
                </div>
                <div className="tab-link">
                  <p>Virtual Tour</p>
                </div>
                <div className="tab-link">
                  <p>Enquiry Form</p>
                </div>
                <a href="/contact-us" className="btn">Schedule Viewing</a>
              </div>
              
            </div>


            <div className="page-container">
              <div className="property-info grid">
                {/* <div className="grid-item">
                  <h3>Enquire Now</h3>
                  <p>07854218123<br></br>katy@montaguerealestate.com</p>
                </div> */}
                <div className="grid-item description">
                  <h2>{this.state.property.name}</h2>
                  <h4>6 Beds | 6 Baths | 3 Receptions | £32,500,000</h4>
                  <p>{this.state.property.description}</p>
                </div>  
              </div>

            
                <div id="property-highlights" className="property-tabbed-content">
                <h2 className="section-title"><span className="line">Property Highlights</span></h2>
                <div id="product-content-must">
  <PropertyToggle></PropertyToggle>
</div>
              </div>
              </div>

              <ProductGallery></ProductGallery>
              <VideoComponent></VideoComponent>
              <Carousel></Carousel>
             
            </div>
        ) : null}
      </div>
    )
  }
}

export default Property;