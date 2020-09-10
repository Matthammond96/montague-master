import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';

class Teams extends Component {
  constructor(props) {                      
    super(props);

    this.ref = React.createRef();

    this.state = {
      component: props.component,
      teams: [],
      loaded: false
    };
  }

  async fetchTeamMembers() {
    let id = "";
    
    const promise = await this.state.component.teamMembers.map((member, key) => {
      if (key === 0) return id = id + member.sys.id
      return id = id + `,${member.sys.id}`
    });
    await Promise.all(promise);
  
    client
      .getEntries({"content_type": "teamMember", "sys.id[in]": id})
      .then(entry => this.setState({teams: entry, loaded: true}))
      .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
      await this.fetchTeamMembers();
    }
  }

  async componentDidMount() {
    await this.fetchTeamMembers();

    const options = {root: null, rootMargin: "0px", threshold: [0.1, 0.5, 1.0]}

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0.2 && !this.state.visible) {
        console.log("a");
        this.setState({
          visible: true
        });
      }
    }, options);

    if (this.ref.current) {
      observer.observe(this.ref.current);
    }
  } 

  render() {
    return (
      <section className="featured-properties page" ref={this.ref}>
        <h2 className="section-title orchide"><span className="line">{this.state.component.title}</span></h2>
        {this.state.loaded && (
          <div className="properties">
            {this.state.teams.items.map(team => {
              return (
                <div className={`item ${this.state.visible && " visible"}`}>
                  <img alt={team.fields.photo.fields.file.title} src={team.fields.photo.fields.file.url}></img>
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