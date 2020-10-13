import React, { Component, Fragment } from 'react';
import CustomLink from './CustomLink';

class TitleParagraph extends Component {
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
    const {title, paragraph, buttonTitle, buttonUrl} = this.state.component;
    let https = false;
    if (buttonUrl && buttonUrl.includes("http")) { https = true }

    return (
    <div className="titlePara-component">
     <h2 className={`section-title${this.state.component.font ? "" : " orchide"}`}><span className="line">{title}</span></h2>
     <p>{paragraph}</p>
      {buttonTitle && (
        <CustomLink className="btn" to={buttonUrl}>{buttonTitle}</CustomLink>
      )}
    </div>
    )
  }
}

export default TitleParagraph;