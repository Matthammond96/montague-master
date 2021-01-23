import React, { Component, Fragment } from 'react';
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
      site_map: [],
      loaded: false,
      hideBurger: false
    }
  }

  updateNavColour = (colour) => {
    this.setState({nav_colour: colour});
  }

  hideBurger = page => {
    console.log(page);
    this.setState({hideBurger: page})
  }

  fetchPages() {
    client
    .getEntries({"content_type": "page", "select": ["fields.title", "fields.url", "fields.whiteNavigation", "fields.meta_description", "fields.landingPage"]})
    .then(entries => {
      let site_map = [];
      entries.items.map(entry => {
        return site_map.push({page: {"id": entry.sys.id, "title": entry.fields.title, "url": entry.fields.url, "navColour": entry.fields.whiteNavigation, "meta_description": entry.fields.meta_description, "landingPage": entry.fields.landingPage}});
      })
      return this.setState({site_map: site_map, loaded: true})
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
          const {id, title, url, navColour, meta_description, landingPage} = page.page;
          return (
            <Route exact path={url} render={props => <ComponentLoader page={landingPage} title={title} desc={meta_description} id={id} nav_colour={navColour} navColour={this.updateNavColour} hideBurger={this.hideBurger}></ComponentLoader>}></Route>
          )
        })}
        <Route component={e404}></Route>
        
      </Switch>
    )
  }

  render() {
    return (
      <Fragment>
      {this.state.loaded && (
        <div className="page-load">
          <Nav colour={this.state.nav_colour} hideBurger={this.state.hideBurger} pathname={this.props.location.pathname}></Nav>
          {this.authSwitch()}
          {!this.state.hideBurger && (
            <Footer></Footer>
          )}
          {this.state.show_cookies ? (
            <CookieBanner></CookieBanner>
          ) : null}
        </div>
      )}
      </Fragment>
    )
  }
}

export default withRouter(AppRouter);
