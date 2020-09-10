import React, { Component } from 'react';
import { Responsive } from "../Responsive";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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
      <section id={title.replace(" ", "-")} >
        <div className="page-container">
          <h2 className="section-title"><span className="line">{title}</span></h2>
          <p>{paragraph}</p>
        </div>
        <Responsive displayIn={["Laptop"]}>
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
        </Responsive>
        <Responsive displayIn={["Mobile"]}>
          <CarouselProvider className="carousel" infinite naturalSlideWidth={100} naturalSlideHeight={100} totalSlides={images.length}>
            <Slider>
              {images.map((image, key) => {
                const {url, title} = image.fields.file
                return(
                  <Slide className="slider-image" index={key}>
                    <img alt={title} src={url}></img>
                  </Slide>
                )
              })}
            </Slider>
          </CarouselProvider>
        </Responsive>
      </section>
    )
  }
}

export default ProductGallery;