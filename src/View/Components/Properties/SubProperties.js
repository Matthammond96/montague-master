import React, { Component } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';

class SubProperties extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component
    };
  }

  getProperties() {

  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    const {title, paragraph, subProperties} = this.state.component;
    return (
      <section id={title.replace(" ", "-")} className="page-container property-tabbed-content">
        <div className="property-sub-container">
            <h2 className="section-title"><span className="line">{title}</span></h2>
            {paragraph && paragraph.content.map(el => documentToReactComponents(el))}

            <div className="table">
              <table>
                <tr>
                  <th>Property Name</th>
                  <th>Bedroom</th>
                  <th>Bathroom</th>
                  <th>Sqft</th>
                  <th>Listing Price</th>
                  <th>View Property</th>
                </tr>
                {subProperties.map(property => {
                  const {name, bedrooms, bathroom, propertySizeSqm, price} = property.fields;
                  return (
                    <tr>
                      <td>{name}</td>
                      <td>{bedrooms}</td>
                      <td>{bathroom}</td>
                      <td>{propertySizeSqm}</td>
                      <td>{price}</td>
                      <td>
                        <Link to={property.sys.id}>View Property</Link>
                      </td>
                    </tr>
                  )
                })}
              </table>
            </div>
        </div>
      </section>
    )
  }
}

export default SubProperties;