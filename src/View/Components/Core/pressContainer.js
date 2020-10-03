import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../../ContentfulContext';

class PressContainer extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      press: []
    };
  }

  fetchPress() {
    client
    .getEntries({"content_type": "press"})
    .then(entries => this.setState({press: entries.items}))
    .catch(err => console.log(err));
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
      this.fetchPress();
    }
  }

  componentDidMount() {
    this.fetchPress();
  }

  render() {
    return (
      <section className="press-container page">
        <div className="press-flex">
          <div className="press-header">
            <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
            <p>{this.state.component.paragraph}</p>
          </div>
          <div className="press-carosel">
          {this.state.press.map(article => {
            const {headline, publisher, date, articleImage} = article.fields;
            return (
              <div className="press-item">
                <img src={articleImage.fields.file.url} alt={articleImage.fields.file.title}></img>
                <div className="press-misc">
                  <h2>{headline}</h2>
                  <p>@{publisher} {date}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="opacity"></div>
        </div>
      </section>
    )
  }
}

export default PressContainer;