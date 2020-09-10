import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import Components from '../Components';

class Destination extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      id: window.location.pathname.replace("/destination/", ""),
      loaded: false,
      destination: {},
      components: [],
    };
  }

  getDestination() {
    client
    .getEntries({content_type: "destinations", "fields.handle[match]": this.state.id})
    .then(async entry => {
      console.log(entry);
      await this.setState({destination: entry.items[0].fields})
      this.getComponents();
    })
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    const id = window.location.pathname.replace("/destination/", "");
    if (this.state.id !== id) {
      await this.setState({
        id: id,
        loaded: false,
        destination: {},
        components: [],
      });
      this.getDestination();
    }
  }

  componentDidMount() {
    this.getDestination();
  }

  render() {
    return (
      <section>
         {this.state.destination.components && (
              <div>
                {this.state.destination.components.map(component => {
                  const contentType = component.sys.contentType.sys.id;
                  const ComponentToRender = Components[contentType];
                  
                  return <ComponentToRender component={component.fields}/>
                })}
              </div>
            )}
      </section>
    )
  }
}

export default Destination;