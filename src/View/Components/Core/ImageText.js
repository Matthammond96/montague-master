import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImageText extends Component {
  constructor(props) {                      
    super(props);

    this.ref = React.createRef();

    this.state = {
      component: props.component,
      visible: false
    };
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  componentDidMount() {
    const options = {root: null, rootMargin: "0px", threshold: [0.1, 0.5, 1.0]}

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0.2 && !this.state.visible) {
        this.setState({
          visible: true
        });
      }
    }, options);

    if (this.ref.current) {
      observer.observe(this.ref.current);
    }
  }

  render() {
    const {title, paragraph, buttonTitle, buttonUrl, imageOnTheLeft, image} = this.state.component;
    return (
      <div ref={this.ref} className={`imageText-component page ${imageOnTheLeft && 'flip'} ${this.state.visible && 'visible'}`}>
        <div className="image">
          <img alt={image.fields.file.title} src={image.fields.file.url}></img>
        </div>
        <div className="content">
          <div className="padding">
            {title && (
              <h2 className="title orchide">{title}</h2>  
            )}
            {title && (
              <div className="under-line"></div>
            )}
            {paragraph && (
              <p className="paragraph">{paragraph}</p>
            )}
            {buttonTitle && (
            <Link to={buttonUrl} className="btn">
              {buttonTitle}
            </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ImageText;