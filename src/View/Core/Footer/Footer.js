import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import { FooterGroup } from './Footer-Item';
import Newsletter from '../Newsletter';

class Footer extends Component {
  constructor(props) {
    super(props)

    this.footer = [];

    this.state = {
      footer: false
    }
  }

  fetchParentFooter() {
    client
    .getEntry("20kMJ5HVsxGRE4oP98AawR")
    .then(entry => this.peprareFooter(entry.fields.footerLinkGroups))
    .catch(err => console.log(err));
  }

  async peprareFooter(groups) {
    const promises = groups.map(async group => {
      const item = {};
      item.title = group.fields.title;
      
      const items = await this.fetchFooterItems(group.fields.links);
      item.links = items;

      this.footer.push(item)
    });

    await Promise.all(promises);
    this.setState({footer: true});
  }

  async fetchFooterItems(links) {
    let items = []
    
    const promises = links.map(async link => {
      await client
      .getEntry(link.sys.id)
      .then(entry => items.push(entry))
    });

    await Promise.all(promises);
    return items
  }


  componentDidMount() {
    this.fetchParentFooter()
  }

  render() {
    return (    
      <div className="footer">
        {/* <div className="footer-logo">
          <img alt="montage properties" src="/logo.png"></img>
        </div> */}
        <div className="footer-groups">
          {this.footer.map(group => {
            return (
              <FooterGroup group={group}></FooterGroup>
            )
          })}
          <Newsletter></Newsletter>
        </div>
        <p className="copyright">Copyright © 2020 Montague Realestate Ltd All Rights Reserved</p>
      </div>
    )
  }
}

export default Footer;