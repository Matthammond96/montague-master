import React, { Component } from 'react';
import "../../Styles/listings.sass";
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';
import {BedIcon, BathIcon} from '../../Styles/icons'
import FilterBar from './FilterBar';

class Listings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      component: props.component,
      intervalId: "",
      currentCount: 0,
      target: "",
      count: 0,
      cardSize: false
    }
  }

  onMouseLeaveHandle = (e) => {
    if (this.state.target === "") return;
    const count = this.state.target.childNodes.length;
    
    if (count > 1 || this.t) {
      clearInterval(this.state.intervalId);
      this.state.target.querySelector('.active').className = "";
      this.state.target.childNodes[0].className = "active";
      this.setState({ currentCount: 0, count: 0 });

      for (let i = 0; i < this.state.target.previousElementSibling.childNodes.length; i++) {
        this.state.target.previousElementSibling.childNodes[i].className = "thumb";
      }
    }
    
  }

  onMouseOverHandle = (e) => {
    let [target, count] = ""

    if (e.target.classList.contains("thumbnails")) {
      target = e.target.nextElementSibling;
    } else {
      target = e.target.closest(".image-container");  
    }

    count = target.childNodes.length;

    if (count > 1) {
      const thumbs = target.closest(".image-container").previousElementSibling;
      thumbs.childNodes[0].className += " active";

      var intervalId = setInterval(this.timer, 1000);
      this.setState({intervalId: intervalId, currentCount: count, target: target});
    }
  }

  timer = () => {
    var newCount = this.state.currentCount - 1;
    const thumbs = this.state.target.previousElementSibling;
    
    if(newCount >= 0) { 
      var count = this.state.count + 1;
      if (newCount > 0) {
        thumbs.childNodes[count].className += " active";
        this.state.target.childNodes[count].className = "active";
        this.state.target.childNodes[count - 1].className = "";
      }

      this.setState({ currentCount: newCount, count: count });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ currentCount: 0, count: 0 });
    }
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  applyFilter = filters => e => {
    e.preventDefault();

    console.log(filters);

    let compiledFilters = {"content_type": "properties"};

    if (filters.location != "") {
      const filter = {"fields.location": filters.location}
      compiledFilters = {...compiledFilters, ...filter};
    }

    if (filters.property_type != "") {
      const filter = {"fields.type": filters.property_type}
      compiledFilters = {...compiledFilters, ...filter};
    }

    if (filters.bedrooms != "") {
      const filter = {"fields.bedrooms": filters.bedrooms}
      compiledFilters = {...compiledFilters, ...filter};
    }

    client
    .getEntries(compiledFilters)
    .then(entry => this.setState({properties: entry.items}))
    .catch(err => console.log(err));
  }

  fetchProperties() {
    client
    .getEntries({"content_type": "properties"})
    .then(entry => this.setState({properties: entry.items}))
    .catch(err => console.log(err));
  }

  setCardSizeSmall = () => {
    this.setState({cardSize: false})
  }

  setCardSizeLarge = () => {
    this.setState({cardSize: true})
  }

  componentDidMount() {
    this.fetchProperties();
  }

  render() {
    const {pageTitle, showFilter, windowedBanner } = this.state.component

    return (
      <div>

        <FilterBar applyFilter={this.applyFilter} pageTitle={pageTitle} showFilter={showFilter} windowedBanner={windowedBanner}></FilterBar>

        <div className="view-config">
          <div className="results">
            <p>Results: 12 of 36</p>
          </div>
          <div className="grids">
            <div className="grid-large" onClick={this.setCardSizeSmall}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="grid-small" onClick={this.setCardSizeLarge}>
              <span></span>
            </div>
          </div>
        </div>

        <div className={this.state.cardSize ? "properties-list large" : "properties-list"}>
          {this.state.properties.map(property => {
            const {name, location, price, type, bedrooms, bathroom, propertySizeSqm, photos} = property.fields;
            const propertyLink = `/property/${property.sys.id}`;
            return (
                <div className="listing-card">
                  <div className="content">
                  <Link className="" to={propertyLink}>
                    <div className="image" onMouseEnter={this.onMouseOverHandle} onMouseLeave={this.onMouseLeaveHandle}>
                      <div className="thumbnails">
                        {photos.slice(0).reverse().map(() => (
                          photos.length > 1 && (
                            <div className="thumb">
                              <div className="fill"></div>
                            </div>
                          )
                          ))}
                      </div>
                      <div className="image-container">
                      {photos.slice(0).reverse().map((photo, key) => {
                        return (
                          <img className={key === 0 && "active"} src={photo.fields.file.url}></img>
                        )
                      })}
                      </div>
                    </div>
                       {/* style={{ backgroundImage: `url('${property.fields.photos[0].fields.file.url}')` }}></div> */}
                  </Link>
                    <div className="details">
                      
                    <Link className="" to={propertyLink}>
                      <h3 className="subtitle">{location}</h3>
                      <h2 className="title">{name}</h2>
                      <p className="price">Price: £{price}</p>
                      <p className="price">SQM: {propertySizeSqm}</p>
                      <p className="misc">{type}</p>
                      <p className="misc"><BedIcon></BedIcon>: {bedrooms}, <BathIcon></BathIcon>: {bathroom}</p>
                      </Link>
                    </div>
                  </div>
                  
                </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Listings;