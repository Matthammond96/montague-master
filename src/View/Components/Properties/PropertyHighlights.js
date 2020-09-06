import React, { Component } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Highlight from "./Highlight";

class PropertyHighlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: props.component
    }
  }

  render() {
    return (
      <div>
        {this.state.component.fields.aboveHighlights.content.map(el => documentToReactComponents(el))}  

        <div className="highlight-container">
          {this.state.component.fields.propertyTable.map(el => <Highlight id={el.sys.id}></Highlight>)}
        </div>

        {this.state.component.fields.belowHighlights.content.map(el => documentToReactComponents(el))}  
      </div>
    )
  }
}

export default PropertyHighlights;