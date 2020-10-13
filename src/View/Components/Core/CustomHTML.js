import React, { Component } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

class CustomHTML extends Component {
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
    console.log(this.state.component);
    
    return (
      <section className={`page-container${this.state.component.textAlignment ? " center" : ""}`}>
        <h2 className={`section-title${this.state.component.font ? "" : " orchide"}`}><span className="line">{this.state.component.title}</span></h2>
       {this.state.component.html.content.map(el => documentToReactComponents(el))}  
      </section>
    )
  }
}

export default CustomHTML;