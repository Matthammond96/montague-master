import React, { Component } from 'react';
import "../../Styles/listings.sass";
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';

class Listings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      component: props.component,
      id: window.location.pathname.replace("/properties/", ""),
      intervalId: "",
      currentCount: 0,
      target: "",
      count: 0,
      cardSize: false
    }

    this.applyFilter = this.applyFilter.bind(this);
  }

  onMouseLeaveHandle = (e) => {
    if (this.state.target === "") return;
    let target = this.state.target;
    const count = target.childNodes.length;
    
    if (count > 1 || this.t) {
      clearInterval(this.state.intervalId);
      target.querySelector('.active').className = "";
      target.childNodes[0].className = "active";
      this.setState({ currentCount: 0, count: 0 });

      for (let i = 0; i < this.state.target.previousElementSibling.childNodes.length; i++) {
        target.previousElementSibling.childNodes[i].className = "thumb";
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
    let target = this.state.target
    var newCount = this.state.currentCount - 1;
    const thumbs = target.previousElementSibling;
    
    if(newCount >= 0) { 
      var count = this.state.count + 1;
      if (newCount > 0) {
        thumbs.childNodes[count].className += " active";
        target.childNodes[count].className = "active";
        target.childNodes[count - 1].className = "";
      }

      this.setState({ currentCount: newCount, count: count });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ currentCount: 0, count: 0 });
    }
  }

  async componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      await this.setState({component: this.props.component});
      
    }

    const id = window.location.pathname.replace("/properties/", "");
    if (this.state.id !== id) {
      await this.setState({
        id: id
      });
      this.fetchProperties();
    }
  }

  applyFilter(filters, e) {
    if (e) e.preventDefault();
    let compiledFilters = {"content_type": "properties"};

    if (filters.location !== "") {
      const filter = {"fields.location": filters.location}
      compiledFilters = {...compiledFilters, ...filter};
    }

    if (filters.property_type !== "") {
      const filter = {"fields.type": filters.property_type}
      compiledFilters = {...compiledFilters, ...filter};
    }

    if (filters.onPlan !== "") {
      const filter = {"fields.onPlan": filters.onPlan.toString()}
      compiledFilters = {...compiledFilters, ...filter};
    }

    if (filters.bedrooms !== "") {
      const filter = {"fields.bedrooms": filters.bedrooms}
      compiledFilters = {...compiledFilters, ...filter};
    }

    client
    .getEntries(compiledFilters)
    .then(entry => this.setState({properties: entry.items}))
    .catch(err => console.log(err));
  }

  fetchProperties() {
    if (this.state.id !== "" && this.state.id !== "/properties") {
      client
      .getEntries({"content_type": "urlFilter", "fields.handle": this.state.id})
      .then(entry => {
        if (entry.items.length > 0) {
          const filters =  {
            location: "",
            onPlan: "",
            property_type: ""
          }

          if (entry.items[0].fields.locationFilter) filters.location = entry.items[0].fields.locationFilter;
          if (entry.items[0].fields.planStatus === false || entry.items[0].fields.planStatus === true) filters.onPlan = entry.items[0].fields.planStatus;
          if (entry.items[0].fields.propertyTypeFilter) filters.property_type = entry.items[0].fields.propertyTypeFilter;

          this.applyFilter(filters);
        }
      })
      .catch(err => console.log(err))
    } else {
      client
      .getEntries({"content_type": "properties"})
      .then(entry => this.setState({properties: entry.items}))
      .catch(err => console.log(err));
    }
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
            const {name, location, price, bedrooms, bathroom, propertySizeSqm, photos, propertyHandle} = property.fields;
            const propertyLink = `/property/${propertyHandle}`;
            return (
                <div className="listing-card">
                  <div className="content">
                  <Link className="" to={propertyLink}>
                    <div className="image" onMouseEnter={this.onMouseOverHandle} onMouseLeave={this.onMouseLeaveHandle}>
                      <div className="thumbnails">
                        {photos.slice(0, 4).reverse().map(() => (
                          photos.length > 1 && (
                            <div className="thumb">
                              <div className="fill"></div>
                            </div>
                          )
                          ))}
                      </div>
                      <div className="image-container">
                      {photos.slice(0, 4).map((photo, key) => {
                        return (
                          <img className={key === 0 && "active"} alt={photo.fields.file.title} src={photo.fields.file.url}></img>
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
                      <p className="price">{bedrooms} Beds |  {bathroom} Baths | {propertySizeSqm} Sqft</p>
                      <p className="price">£{price}</p>
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