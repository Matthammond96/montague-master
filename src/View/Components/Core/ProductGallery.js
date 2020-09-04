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
    return (
      <section>
        <h2 className="section-title"><span className="line">The Gallery</span></h2>
      <div className="product-gallery-component">
        <div className="image-container">
          <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/4-0-2-bb-wraith---inception/component-assets/rrmc-bb-inception-wraith-car-in-front-of-house-expanding-block-d.jpg/_jcr_content/renditions/cq5dam.web.1920.jpeg"></img>
        </div>
        <div className="image-container">
          <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/4-0-1-bb-cullinnan---capella/component-assets/rrmc-bb-capella-treadplate-detail-expanding-block-d.jpg/_jcr_content/renditions/cq5dam.web.1920.jpeg"></img>
        </div>
        <div className="image-container">
          <img src="https://aml-prod-images.azureedge.net/media/images/default-source/models/new-vantage/vantage-roadster/_df19640-steveedit-(large).jpg?sfvrsn=e18f7bf9_0&width=1720&format=webp&quality=50"></img>
        </div>
        <div className="image-container">
          <img src="https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/4-0-1-bb-cullinnan---capella/component-assets/rrmc-bb-capella-treadplate-detail-expanding-block-d.jpg/_jcr_content/renditions/cq5dam.web.1920.jpeg"></img>
        </div>
        <div className="image-container">
          <img src="https://aml-prod-images.azureedge.net/media/images/default-source/models/new-vantage/vantage-roadster/_df19640-steveedit-(large).jpg?sfvrsn=e18f7bf9_0&width=1720&format=webp&quality=50"></img>
        </div>
      </div>
      </section>
    )
  }
}

export default ProductGallery;