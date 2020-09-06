import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import Carousel from '../Core/Carousel';
import ContactForm from './ContactForm';
import PropertyToggle from './PropertyToggle';
import ProductGallery from '../Core/ProductGallery';
import VideoComponent from '../Core/VideoComponent';
import {ArrowLeft, ArrowRight} from '../../Styles/icons';
import "../../Styles/property.sass"
import { HashLink } from 'react-router-hash-link';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Property extends Component {
  constructor(props) {
    super(props);

    var visibleSlides;

    this.state = {
      id: window.location.pathname.replace("/property/", ""),
      property: {},
      components: [],
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

  async getComponents() {
    let components = []
    
    if (this.state.property.components) {
      const promie = this.state.property.components.map(async component => {
        await client.getEntry(component.sys.id)
        .then(entry => components.push(entry))
        .catch(err => console.log(err));
      })
  
      await Promise.all(promie);
      await this.setState({components: components, loaded: true})
    } else {
      this.setState({loaded: true})
    }
   
  }

  componentDidMount() {
    client
    .getEntry(this.state.id)
    .then(entry => {
      this.setState({property: entry.fields})
      this.getComponents();
    })
    .catch(err => console.log(err));
  }

  
  

  render() {
    
    return (
      <div className="">
        {this.state.loaded ? (
          <div className="property">
            <div className="property-image">
            {this.state.property.photos.length === 1 ? (
                <div className="property-image-fixed">
                  <div className="content-overlay">
                    <div className="content">
                      <h3>{this.state.property.location}</h3>
                      <h1>{this.state.property.name}</h1>
                      <button class="btn">Enquire Now</button>
                    </div>
                  </div>
                <img src={this.state.property.photos[0].fields.file.url}></img>
              </div>
            ) : (
              <CarouselProvider className="property-image-fixed" infinite naturalSlideWidth={100} naturalSlideHeight={100} totalSlides={this.state.property.photos.length} visibleSlides={this.visibleSlides}>
                <Slider>
                  {this.state.property.photos.map((photo, key) => {
                    return(
                    <div>
                    {key === 0 ? (
                      <Slide className="slider-image" index={key}>
                        <div className="property-image">
                          <div className="content-overlay">
                            <div className="content">
                              <h3>{this.state.property.location}</h3>
                              <h1>{this.state.property.name}</h1>
                              <button class="btn">Enquire Now</button>
                            </div>
                          </div>
                          <img src={photo.fields.file.url}></img>
                        </div>
                      </Slide>
                    ): (
                      <Slide className="slider-image" index={key}>
                        <div className="property-image">
                          <div className="content-overlay context">
                            <div className="content">
                              <h3>{photo.fields.description}</h3>
                            </div>
                          </div>
                          <img src={photo.fields.file.url}></img>
                        </div>
                      </Slide>
                    )}
                    </div>)      
                  })}
                </Slider>

                <ButtonBack className="arrow-container prev"><ArrowLeft></ArrowLeft></ButtonBack>
                <ButtonNext className="arrow-container next"><ArrowRight></ArrowRight></ButtonNext>
              </CarouselProvider>
            )}              
            </div>
            <div className="property-tabs">
              <div id="tabbed-scrolled" className={`tabs-container ${this.state.isTop && 'fix-me'}`}>
                {this.state.heading.map(header => {
                  const scrollWithOffset = (el) => {
                    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
                    const yOffset = -180; 
                    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
                  }

                  return (
                    <div className="tab-link active">
                      <HashLink to={header.link} scroll={el => scrollWithOffset(el)}><p>{header.name}</p></HashLink>
                    </div>
                  )
                })}
                <a href="/contact-us" className="btn">Schedule Viewing</a>
              </div>
              
            </div>

<div className="property-container">

            <div className="page-container">
              <div className="property-info grid">
                <div className="grid-item description">
                  <h2>{this.state.property.name}</h2>
                  <h4>6 Beds | 6 Baths | 3 Receptions | £32,500,000</h4>
                  <p>{this.state.property.description}</p>
                </div>  
              </div>
            </div>
            

            
            {this.state.components.map(component => {
              const contentType = component.sys.contentType.sys.id
              return (
                <div>
                  {contentType === "tabbedContent" && <PropertyToggle component={component}></PropertyToggle>}
                  {contentType === "imageGallery" && <ProductGallery component={component}></ProductGallery>}
                  {contentType === "videoBanner" && <VideoComponent component={component.fields}></VideoComponent>}
                </div>
              )
            })}
             
            </div></div>
        ) : null}
      </div>
      
    )
  }
}

export default Property;