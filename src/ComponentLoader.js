import React, { Component } from 'react';
import { client } from './ContentfulContext';
import Components from './View/Components/Components';
import {Helmet} from "react-helmet";

class ComponentLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      components: [],
      title: this.props.title,
      desc: this.props.desc,
      page: this.props.page
    }
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
      <div className={`component-loader ${this.state.page && "landing"}`}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.title}</title>
          {this.state.desc && <meta name="description" content={this.state.desc} /> }          
        </Helmet>
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