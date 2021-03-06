import React, { Component } from 'react';

class VR extends Component {
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
      <section className="page-container">
        <h2 className="section-title orchide"><span className="line">{this.state.component.title}</span></h2>
        <div class="aspect-ratio">
          <iframe id="frame_7" class="property-vr" src={this.state.component.embedLinkUrl} autoplay="" allowfullscreen="" allow="vr"></iframe>
        </div>
      </section>
    )
  }
}

export default VR;