import React, { Component } from 'react';
import PropertyHighlights from './PropertyHighlights';
import GoogleMap from '../Core/GoogleMap';

class PropertyToggle extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      activeTab: 0
    };
  }

  onClickHandle(tab) {
    this.setState({
      activeTab: tab
    })
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    const {tite, components} = this.state.component.fields;
    return (
      <section id={tite.replace(" ", "-")} className="page-container property-tabbed-content">
        <div className="property-toggle-container">
        <h2 className="section-title"><span className="line">{tite}</span></h2>
          <div className="toggle-headings">
            {components.map((component, key) => {
              const {tabHeading} = component.fields
              return (
                <p onClick={() => {this.onClickHandle(key)}}>{tabHeading}</p>
              )
            })}
          </div>
          <div className="toggle-content">
            {components.map((component, key) => {
              const contentType = component.sys.contentType.sys.id
              return (
                <div className={key === this.state.activeTab ? "tabbed active": "tabbed"}>
                  {contentType === "propertyHighlights" && <PropertyHighlights component={component}></PropertyHighlights>}
                  {contentType === "googleMap" && <GoogleMap className="google-map-container" component={component}></GoogleMap>}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default PropertyToggle;