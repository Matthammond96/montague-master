import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

class FeaturedProperties extends Component {
  constructor(props) {                      
    super(props);

    this.ref = React.createRef();

    this.state = {
      component: props.component,
      visible: false,
      setVisible: false,
      fetched_properties: []
    };
  }

  fetchProperties = async () => {
    client
      .getEntries({"content_type": "properties", "sys.id[in]": "4yra9MUSB2xKx423wpPxTZ,7BD5iHENDYc82e3gqfVwon,7KJfvzvdYhFJuXXhG4iedX", "select": ["fields.name", "fields.propertyHandle", "fields.description", "fields.photos", "fields.bedrooms", "fields.bathroom", "fields.propertySizeSqm", "fields.propertyBedroomsMax", "fields.propertyBathroomMax", "fields.propertySizeSqftMax"]})
      .then(async entry => this.setState({fetched_properties: entry.items}))
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchProperties();
    }
  }

  async componentDidMount() {
    await this.fetchProperties();

    const options = {root: null, rootMargin: "0px", threshold: [0.1, 0.5, 1.0]}

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0.1 && !this.state.visible) {
        this.setState({
          visible: true
        });
      }
    }, options);

    if (this.ref.current) {
      observer.observe(this.ref.current);
    }
  }
 
  render() {
    const {title, buttonTitle, buttonUrl} = this.state.component;

    console.log(this.state.fetched_properties);
    return (
      <div className="featured-properties page" ref={this.ref}>
        <h2 className="title orchide">{title}</h2>

        <div className="properties">
          {this.state.fetched_properties.map(property => {
             const {name, photos, propertyHandle} = property.fields;
             let {price, bedrooms, bathroom, propertySizeSqm, propertyBedroomsMax, propertyBathroomMax, propertySizeSqftMax, propertyMaxPrice, description} = property.fields;
             const propertyLink = `/property/${propertyHandle}`;
 
             if(propertyBedroomsMax && bedrooms !== propertyBedroomsMax) bedrooms += " - " + propertyBedroomsMax;
             if(propertyBathroomMax) bathroom += " - " + propertyBathroomMax;
             if(propertySizeSqftMax) propertySizeSqm += " - " + propertySizeSqftMax;
             if(price) price = this.formatMoney(price);
             if(propertyMaxPrice) price += " - " + this.formatMoney(propertyMaxPrice);

           return (
                <div className={`item ${this.state.visible && " visible"}`}>
                  <Link to={propertyLink}>
                    <img alt={photos[0].fields.file.title} src={photos[0].fields.file.url}></img>
                    <h2>{name}</h2>
                    <h3>{bedrooms} Beds |  {bathroom} Baths | {propertySizeSqm} Sqft</h3>
                    <p>
                      <TextTruncate line={2} element="span" truncateText="…" text={description}/>
                    </p>
                  </Link>
              </div>
              )
          })}          
        </div>
        {buttonTitle && (
          <Link className="btn" to={buttonUrl}>{buttonTitle}</Link>
        )}
        
      </div>
    )
  }
}

export default FeaturedProperties;