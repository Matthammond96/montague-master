import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';

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
      .getEntries({"content_type": "properties", "sys.id[in]": "4yra9MUSB2xKx423wpPxTZ,7BD5iHENDYc82e3gqfVwon,7KJfvzvdYhFJuXXhG4iedX", "select": ["fields.name", "fields.location", "fields.description", "fields.photos"]})
      .then(async entry => this.setState({fetched_properties: entry.items}))
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchProperties();
    }
  }

  async componentDidMount() {
    await this.fetchProperties();

    const options = {root: null, rootMargin: "500px", threshold: [0.1, 0.5, 1.0]}

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio === 1) {
        console.log("a");
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
    return (
      <div className="featured-properties page" ref={this.ref}>
        <h2 className="title">{title}</h2>

        <div className="properties">
          {this.state.fetched_properties.map(property => {
            const {name, location, description, photos} = property.fields;
            const {id} = property.sys;

           return (
                <div className={`item ${this.state.visible && " visible"}`}>
                  <Link to={`/property/${id}`}>
                  <img src={photos[0].fields.file.url}></img>
                  <h2>{name}</h2>
                  <h3>6 Beds | 6 Baths | 3 Receptions | £32,500,000</h3>
                  <p>A minimalist masterpiece - this townhouse in the West Village is truly something very special.</p>
                  </Link>
              </div>
              )
          })}          
        </div>

        <Link className="btn" to={buttonUrl}>{buttonTitle}</Link>
      </div>
    )
  }
}

export default FeaturedProperties;