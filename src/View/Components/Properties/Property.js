import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import Carousel from '../Core/Carousel';
import ContactForm from './ContactForm';
import PropertyToggle from './PropertyToggle';
import SubProperties from './SubProperties';
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
      loaded: false
    };
  }

  async getComponents() {
    if (this.state.property.components) {
      let id = "";
    
      const promise = await this.state.property.components.map((component, key) => {
        if (key === 0) return id = id + component.sys.id
        id = id + `,${component.sys.id}`
      });
      await Promise.all(promise);

      client.getEntries({"sys.id[in]": id})
      .then(entry => {
        this.setState({components: entry, loaded: true});
      })
      .catch(err => console.log(err));
      
    } else {
      this.setState({loaded: true})
    }
   
  }

  getProperty() {
    client
    .getEntry(this.state.id)
    .then(async entry => {
      await this.setState({property: entry.fields})
      this.getComponents();
    })
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    const id = window.location.pathname.replace("/property/", "");
    if (this.state.id != id) {
      await this.setState({
        id: id,
        loaded: false,
        property: {},
        components: [],
      });
      this.getProperty();
    }
  }

  componentDidMount() {
    this.getProperty();
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
              {this.state.property.components ? (
                <div id="tabbed-scrolled" className={`tabs-container ${this.state.isTop && 'fix-me'}`}>
                  {this.state.property.components.map(component => {
                    let linkTo = "";
                    let title = "";

                    if (component.fields.title) {
                      linkTo = "#" + component.fields.title.replace(" ", "-");
                      title = component.fields.title;
                    }

                    if (component.fields.tite) {
                      linkTo = "#" + component.fields.tite.replace(" ", "-");
                      title = component.fields.tite;
                    }

                    const scrollWithOffset = (el) => {
                      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
                      const yOffset = -180; 
                      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
                    }

                    return (
                      <div className="tab-link active">
                        <HashLink to={linkTo} scroll={el => scrollWithOffset(el)}><p>{title}</p></HashLink>
                      </div>
                    )
                  })}
                
                  <a href="/contact-us" className="btn property-btn">Schedule Viewing</a>
                </div>
              ) : (
                <div id="tabbed-scrolled" className={`tabs-container ${this.state.isTop && 'fix-me'}`}>
                  <a href="/contact-us" className="btn property-btn">Schedule Viewing</a>
                </div>
              )}
            </div>

          <div className="property-container">

            <div className="page-container">
              <div className="property-info grid">
                <div className="grid-item description">
                  <h2>{this.state.property.name}</h2>
                  <p className="price">{this.state.property.bedrooms} Beds |  {this.state.property.bathroom} Baths | {this.state.property.propertySizeSqm} Sqft</p>
                  <p>{this.state.property.description}</p>
                </div>  
              </div>
            </div>
            
            {this.state.property.components && (
              <div>
                {this.state.property.components.map(component => {
                  const contentType = component.sys.contentType.sys.id;
                  let obj = this.state.components.items.find(o => o.sys.contentType.sys.id === contentType);
                  return (
                    <div className="">
                      {contentType === "tabbedContent" && <PropertyToggle component={obj}></PropertyToggle>}
                      {contentType === "imageGallery" && <ProductGallery component={obj}></ProductGallery>}
                      {contentType === "videoBanner" && <VideoComponent component={obj.fields}></VideoComponent>}
                      {contentType === "subProperties" && <SubProperties component={obj.fields}></SubProperties>}
                    </div>
                  )
                })}
              </div>
            )}
             
            </div></div>
        ) : null}
      </div>
      
    )
  }
}

export default Property;