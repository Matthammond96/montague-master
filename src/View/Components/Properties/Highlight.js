import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';

class HighLight extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      loaded: false
    }
  }

  async fetchComponent() {
    await client.getEntry(this.state.id).then(entry => {
      this.setState({component: entry, loaded: true})
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchComponent();
  }

  render() {
    return (
      <div class="product-highlight">
        {this.state.loaded && (
          <p><strong>{this.state.component.fields.fieldTitle}</strong> <span>{this.state.component.fields.fieldContent}</span></p>
        )}
      </div>
    )
  }
}

export default HighLight;