import React, { Component } from 'react';
import { client } from './ContentfulContext';
import Components from './View/Components/Components';

class ComponentLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      components: []
    }

    document.title = this.props.title
  }

  fetchComponents() { 
    client
    .getEntry(this.state.id)
    .then(entry => {
      this.setState({components: entry.fields.components})
      this.props.navColour(this.props.nav_colour);
    })
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.id !== this.props.id) {
      await this.setState({id: this.props.id});
      document.title = this.props.title;
      this.props.navColour(this.props.nav_colour);
      this.fetchComponents()
    }
  }

  componentDidMount() {
    this.fetchComponents();
  }

  render() {
    return (
      <div className="component-loader">
        {this.state.components.map(component => {
          const type = component.sys.contentType.sys.id;
          const ComponentToRender = Components[type];
          
          return <ComponentToRender component={component.fields}/>
        })}
      </div>  
    )
  }
}

export default ComponentLoader;