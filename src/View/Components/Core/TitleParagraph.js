import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

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
     <h2 className="section-title orchide"><span className="line">{title}</span></h2>
     <p>{paragraph}</p>
      {buttonTitle && (
        <Fragment>
          {https === true ? (
            <a className="btn" href={buttonUrl}>{buttonTitle}</a>
          ) : (
            <Link className="btn" to={buttonUrl}>{buttonTitle}</Link>
          )}
        </Fragment>
      )}
    </div>
    )
  }
}

export default TitleParagraph;