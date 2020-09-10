import React, { Component } from 'react';

class VerticalSpacer extends Component {
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
    const px = this.state.component.spacingHeightPx;
    return (
      <div className="vertical-spacer" style={{marginTop: px + "px"}}></div>
    )
  }
}

export default VerticalSpacer;