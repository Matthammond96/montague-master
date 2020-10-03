import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';

class gridContainer extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      gridItem: []
    };
  }

  async fetchServices() {
    let id = "";
    
    const promise = await this.state.component.gridItems.map((member, key) => {
      if (key === 0) return id = id + member.sys.id
      return id = id + `,${member.sys.id}`
    });
    await Promise.all(promise);
  
    client
      .getEntries({"sys.id[in]": id})
      .then(entry => this.setState({gridItem: entry.items, loaded: true}))
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchServices();
    }
  }

  componentDidMount() {
    this.fetchServices();
  }

  render() {
    return (
      <section className="grid-container">
        <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
        <div className="grid-flex">
        {this.state.gridItem.map(item => {
          const {title, extract, thumbNail} = item.fields;
          return (
            <div className={`grid-item ${this.state.component.itemBackground && "white"}`}>
              <img src={thumbNail.fields.file.url} alt={thumbNail.fields.file.title}></img>
              <div className="grid-misc">
                <h2>{title}</h2>
                <p>{extract}</p>
            </div>
          </div>
          )
        })}
        </div>
      </section>
    )
  }
}

export default gridContainer;