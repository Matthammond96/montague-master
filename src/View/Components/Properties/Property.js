import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import {PropertyNavigation} from './PropertyNavigation';
import PropertyToggle from './PropertyToggle';
import SubProperties from './SubProperties';
import ProductGallery from '../Core/ProductGallery';
import VideoComponent from '../Core/VideoComponent';
import {ArrowLeft, ArrowRight} from '../../Styles/icons';
import "../../Styles/property.sass"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ContactForm from '../Core/ContactForm';

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: window.location.pathname.replace("/property/", ""),
      property: {},
      components: [],
      loaded: false,
      setSticky: false
    };
  }

  async getComponents() {
    if (this.state.property.components) {
      let id = "";
    
      const promise = await this.state.property.components.map((component, key) => {
        if (key === 0) return id = id + component.sys.id
        return id = id + `,${component.sys.id}`
      });
      await Promise.all(promise);

      client.getEntries({"sys.id[in]": id})
      .then(entry => {
        this.setState({components: entry, loaded: true});
        window.addEventListener('scroll', this.handleScroll);
      })
      .catch(err => console.log(err));
      
    } else {
      this.setState({loaded: true})
    }
   
  }

  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };

  getProperty() {
    client
    .getEntries({content_type: "properties", "fields.propertyHandle[match]": this.state.id})
    .then(async entry => {
      let property = entry.items[0].fields
      if(property.propertyBedroomsMax && property.bedrooms !== property.propertyBedroomsMax) property.bedrooms += " - " + property.propertyBedroomsMax;
      if(property.propertyBathroomMax) property.bathroom += " - " + property.propertyBathroomMax;
      if(property.propertySizeSqftMax) property.propertySizeSqm += " - " + property.propertySizeSqftMax;
      if(property.price) property.price = this.formatMoney(property.price);
      if(property.propertyMaxPrice) property.price += " - " + this.formatMoney(property.propertyMaxPrice);
      await this.setState({property: property})
      this.getComponents();
    })
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    const id = window.location.pathname.replace("/property/", "");
    if (this.state.id !== id) {
      await this.setState({
        id: id,
        loaded: false,
        property: {},
        components: [],
      });
      this.getProperty();
    }
  }

  async componentDidMount() {
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
                      {/* <button class="btn">Enquire Now</button> */}
                    </div>
                  </div>
                <img alt={this.state.property.photos[0].fields.file.title} src={this.state.property.photos[0].fields.file.url}></img>
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
                              {/* <button class="btn">Enquire Now</button> */}
                            </div>
                          </div>
                          <img alt={photo.fields.file.title} src={photo.fields.file.url}></img>
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
                          <img alt={photo.fields.file.title} src={photo.fields.file.url}></img>
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
              
            <PropertyNavigation components={this.state.property.components}></PropertyNavigation>

          <div className="property-container">

            <div className="page-container">
              <div className="property-info grid">
                <div className="grid-item description">
                  <h2>{this.state.property.name}</h2>
                  <p className="price">{this.state.property.bedrooms} Beds |  {this.state.property.bathroom} Baths | {this.state.property.propertySizeSqm} Sqft | {this.state.property.propertyCurrency}{this.state.property.price}</p>
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
             
            </div>
            <ContactForm viewing={true}></ContactForm>
            {/* <VerticalSpacer component={{spacingHeightPx: "50"}}></VerticalSpacer> */}
          </div>
        ) : null}

        
      </div>
      
    )
  }
}

export default Property;