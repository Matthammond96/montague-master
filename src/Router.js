import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { client } from './ContentfulContext';
import ComponentLoader from './ComponentLoader';
import './View/Styles/components.sass';

import Nav from './View/Core/Navigation/Navigation';
import Footer from './View/Core/Footer/Footer';
import CookieBanner from './View/Core/CookieBanner';
import e404 from './View/Core/e404';

class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show_cookies: true,
      nav_colour: false,
      site_map: []
    }
  }

  updateNavColour = (colour) => {
    this.setState({nav_colour: colour});
  }

  fetchPages() {
    client
    .getEntries({"content_type": "page", "select": ["fields.title", "fields.url", "fields.whiteNavigation"]})
    .then(entries => {
      let site_map = [];
      entries.items.map(entry => {
        site_map.push({page: {"id": entry.sys.id, "title": entry.fields.title, "url": entry.fields.url, "navColour": entry.fields.whiteNavigation}});
      })
      this.setState({site_map: site_map})
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchPages();

    if (localStorage.getItem("cookies") === "accepted") {
      this.setState({
        show_cookies: false
      })
    }
  }

  authSwitch() {
    return (
      <Switch>
        {this.state.site_map.map(page => {
          const {id, title, url, navColour} = page.page;
          return (
            <Route exact path={url} render={props => <ComponentLoader title={title} id={id} nav_colour={navColour} navColour={this.updateNavColour}></ComponentLoader>}></Route>
          )
        })}
        <Route component={e404}></Route>
        
      </Switch>
    )
  }

  render() {
    return (
      <div className="page-load">
          <Nav colour={this.state.nav_colour} pathname={this.props.location.pathname}></Nav>
          {this.authSwitch()}
          <Footer></Footer>
          {this.state.show_cookies ? (
            <CookieBanner></CookieBanner>
          ) : null}
      </div>
    )
  };
}

export default withRouter(AppRouter);