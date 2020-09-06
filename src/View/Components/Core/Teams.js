import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';

class Teams extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      team: []
    };
  }

  async fetchTeamMembers() {
    let team = [];

    const promise = await this.state.component.teamMembers.map(member => {
      client
      .getEntry(member.sys.id)
      .then(entry => team.push(entry))
      .catch(err => console.log(err));
    })
    
    await Promise.all(promise);
    this.setState({team: team})
  }

  async componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchTeamMembers();
    }
  }

  async componentDidMount() {
    await this.fetchTeamMembers();
  } 

  render() {
    return (
      <section>
        <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
        <div className="properties">
          {this.state.team.map(member => {
            const {name, jobTitle, email, photo} = member.fields;
            return (
              <div className="item visible">
                {/* <img src={photo[0].fields.file.url}></img> */}
                <h2>{name}</h2>
                <h3>{jobTitle}</h3>
                <p>{email}</p>
              </div>
            )
          })}          
        </div>
      </section>
    )
  }
}

export default Teams;