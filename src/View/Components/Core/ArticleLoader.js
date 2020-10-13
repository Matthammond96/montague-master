import React, { Component, Fragment } from 'react';
import { client } from '../../../ContentfulContext';
import Components from '../Components';

class ArticleLoader extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      id: props.id,
      component: props.component,
      url: "",
      article: [],
      loaded: false
    };
  }

  fetchArticle() {
    client
    .getEntries({content_type: "article", "fields.url[match]": this.state.url})
    .then(entry => this.setState({article: entry.items[0], loaded: true}))
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    const currentURL = "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if (this.state.url !== currentURL ) {
      await this.setState({url: currentURL, loaded: false, article: []});
      this.fetchArticle();
    }
  }

  async componentDidMount() {
    await this.setState({url: "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1)})
    this.fetchArticle();
  }

  render() {
    return (
      <section>
        {this.state.loaded && (
          <Fragment>
          {this.state.article.fields.components.map(component => {
            console.log(component);
            const type = component.sys.contentType.sys.id;
            const ComponentToRender = Components[type];
            
            return <ComponentToRender component={component.fields}/>
          })}
          </Fragment>
        )}
      </section>
    )
  }
}

export default ArticleLoader;