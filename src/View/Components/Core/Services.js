import React, { Component, Fragment } from 'react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import { client } from '../../../ContentfulContext';

class Services extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      services: []
    };
  }

  async fetchServices() {
    let id = "";
    
    const promise = await this.state.component.servicesPerRow.map((member, key) => {
      if (key === 0) return id = id + member.sys.id
      return id = id + `,${member.sys.id}`
    });
    await Promise.all(promise);
  
    client
      .getEntries({"sys.id[in]": id})
      .then(entry => this.setState({services: entry.items, loaded: true}))
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchServices();
    }
  }

  componentDidMount() {
    this.fetchServices();
  }

  render() {
    return (
      <section className="our-services page">
        {this.state.services && (
          <Fragment>
            <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
            <div className="service-container">
              {this.state.services.map(service => {
                const {title, handle, extract, buttonTitle, thumbNail} = service.fields;

                return (
                  <div className="service-item">
                    <Link to={handle}>
                      <img src={thumbNail.fields.file.url} alt={thumbNail.fields.file.title}></img>
                    </Link>
                    <div className="service-misc">
                      <h2>{title}</h2>
                      <p><TextTruncate line={3} element="span" truncateText="…" text={extract}/></p>

                      {buttonTitle && (
                        <Link className="btn" to={handle}>{buttonTitle}</Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Fragment> 
        )}
      </section>
    )
  }
}

export default Services;