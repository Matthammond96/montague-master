import React, { Component } from 'react';

class Template extends Component {
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
        <div></div>
      </section>
    )
  }
}

export default Template;