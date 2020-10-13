import React, { Component, Fragment } from 'react';
import { client } from '../../../ContentfulContext';
import Components from '../Components';

class StaticImage extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component
    };
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    return (
      <section>
        <div className={`static-image-component ${this.state.component.size ? "page" : "page-container"}`}>
          <img alt={this.state.component.image.fields.title} src={this.state.component.image.fields.file.url}></img>
        </div>
      </section>
    )
  }
}

export default StaticImage;