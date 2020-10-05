import React, { Component } from 'react';
import CustomLink from './CustomLink';

class Banner extends Component {
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
    const {title, subTitle, buttonTitle, buttonLink, image} = this.state.component;
    return (
    <div className="banner-component">
      <div className="banner-image">
        <div className="content-overlay">
          <div className="content">
            <h1>{title}</h1>
            <h3 className="orchide">{subTitle}</h3>
            {buttonLink ? (
              <CustomLink to={buttonLink} class="btn">{buttonTitle}</CustomLink>
            ): null}
          </div>
        </div>
        {this.state.component.image ?
            <img alt="" src={image.fields.file.url}></img>
        : null}
      </div>
    </div>
    )
  }
}

export default Banner;