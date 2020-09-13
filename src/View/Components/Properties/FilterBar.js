import React, { Component } from 'react';
import Select from 'react-select';

class FilterBar extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      bedroomFilter: props.bedroomFilter,
      locationFilters: props.locationFilters,
      propertyTypeFilter: props.propertyTypeFilter,
      locationFilterDefault: props.locationFilterDefault,
      typeFilterDefault: props.typeFilterDefault,
      filters: {
        location: "",
        property_type: "",
        bedrooms: "",
        price: "",
        onPlan: ""
      }
    };
  }

  onChangeHandler = a => selectedOption => {
    let filters = this.state.filters
    filters[a] = selectedOption.value;
    this.setState(filters);
  }

  componentDidUpdate() {
    if (this.state.locationFilterDefault != this.props.locationFilterDefault) {
      let filters = this.state.filters;
      filters.location = this.props.locationFilterDefault;
      this.setState({locationFilterDefault: this.props.locationFilterDefault, filters: filters})
    }

    if (this.state.typeFilterDefault != this.props.typeFilterDefault) {
      let filters = this.state.filters;
      filters.property_type = this.props.typeFilterDefault;
      this.setState({typeFilterDefault: this.props.typeFilterDefault, filters: filters})
    }
  }

  render() {
    const destinations_options = [{value: "", label: "All Destinations"}] 
    this.state.locationFilters.map(filter => {
      destinations_options.push({value: filter, label: filter})
    });

    const property_options = [{value: "", label: "All Properties"}]
    this.state.propertyTypeFilter.map(filter => {
      property_options.push({value: filter, label: filter})
    });

    const bedroom_options = [{value: "", label: "All"}]
    this.state.bedroomFilter.map(filter => {
      bedroom_options.push({value: filter, label: filter})
    });

    const {pageTitle, showFilter, windowedBanner } = this.props
    return (
      <div className={`properties-heading ${windowedBanner && 'banner-component'}`}>
          <div className="vc">
            <h1>{pageTitle}</h1>

            {showFilter ? (
              <div className="listing-form-container">
                <form className="listing-form">
                  <Select onChange={this.onChangeHandler("location")} className="input-select-form destinations" name="Destinations" placeholder="Destinations" options={destinations_options} />
                  <Select onChange={this.onChangeHandler("property_type")} className="input-select-form property" name="Property type" placeholder="Property type" options={property_options} />
                  <Select onChange={this.onChangeHandler("bedrooms")} className="input-select-form bedrooms" name="Bedrooms" placeholder="Bedrooms" options={bedroom_options} />
                  {/* <Select onChange={this.onChangeHandler("price")} className="input-select-form price" placeholder="Price Range" options="" /> */}
                  <button onClick={(e) => this.props.applyFilter(this.state.filters, e)} className="btn">Search</button>
                </form>
              </div>
            ) : null}
            
          </div>
        </div>
    )
  }
}

export default FilterBar;