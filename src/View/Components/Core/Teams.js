import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import { Link } from 'react-router-dom';

class Teams extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      teams: []
    };
  }

  async fetchTeamMembers() {

    let id = "";
    
    const promise = await this.state.component.teamMembers.map((member, key) => {
      if (key === 0) return id = id + member.sys.id
      id = id + `,${member.sys.id}`
    });
    await Promise.all(promise);
  
    client
      .getEntries({"content_type": "teamMember", "sys.id[in]": id})
      .then(entry => this.setState({teams: entry, loaded: true}))
      .catch(err => console.log(err));
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
    console.log(this.state.teams)
    return (
      <section>
        <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
        {this.state.loaded && (
          <div className="properties">
            {this.state.teams.items.map(team => {
              console.log(this.state.teams)
              return (
                <div className="item visible">
                  <img src={team.fields.photo.fields.file.url}></img>
                  <h2>{team.fields.name}</h2>
                  <h3>{team.fields.jobTitle}</h3>
                  <p>{team.fields.email}</p>
                </div>
              )
            })}          
          </div>
        )}
        
      </section>
    )
  }
}

export default Teams;