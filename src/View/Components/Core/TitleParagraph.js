import React, { Component } from 'react'

class TitleParagraph extends Component {
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
    const {title, paragraph} = this.state.component;
    return (
    <div className="titlePara-component">
     <h2 className="section-title"><span className="line">{title}</span></h2>
     <p>{paragraph}</p>
    </div>
    )
  }
}

export default TitleParagraph;