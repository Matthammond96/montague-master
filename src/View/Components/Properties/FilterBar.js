import React, { Component } from 'react';
import Select from 'react-select';

class FilterBar extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      filters: {
        location: "",
        property_type: "",
        bedrooms: "",
        price: ""
      }
    };
  }

  onChangeHandler = a => selectedOption => {
    let filters = this.state.filters
    filters[a] = selectedOption.value;
    this.setState(filters);
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    const destinations_options = [
      { value: '', label: 'All Destinations' },
      { value: 'frech riviera', label: 'French Riviera' },
      { value: 'Dubai, United Arab Emirates', label: 'Dubai' },
      { value: 'berlin', label: 'Berlin' },
      { value: 'cyprus', label: 'Cyprus' },
      { value: 'Cape Town, South Africa', label: 'Cape Town' }
    ]

    const bedroom_options = [
      { value: '', label: 'All' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8+', label: '8+' }
    ]

    const property_options = [
      { value: '', label: 'All Properties' },
      { value: 'Apartment', label: 'Apertment' },
      { value: 'commercial', label: 'Commercial Properties' },
      { value: 'house', label: 'House' },
      { value: 'new development', label: 'New Development' },
      { value: 'Villa', label: 'Villa' }
    ]

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