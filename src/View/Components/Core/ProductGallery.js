import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductGallery extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component
    };
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    const {title, paragraph, images} = this.state.component.fields;
    return (
      <section>
        <div className="page-container">
          <h2 className="section-title"><span className="line">{title}</span></h2>
          <p>{paragraph}</p>
        </div>
      <div className="product-gallery-component">
        {images.map(image => {
          const {url} = image.fields.file
          return(
            <div className="image-container">
              <img src={url}></img>
            </div>
          )
        })}
      </div>
      </section>
    )
  }
}

export default ProductGallery;