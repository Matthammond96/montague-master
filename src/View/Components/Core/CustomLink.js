import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

class CustomLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: props.to,
      className: props.class
    }
  }

  render() {
    if (this.state.link.includes("http")) {
      return <a className={this.state.className} href={this.state.link}>{this.props.children}</a>
    }

    if (this.state.link.includes("#")) {
      const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -125; 
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
      }
      return <HashLink className={this.state.className} to={this.state.link} scroll={el => scrollWithOffset(el)}>{this.props.children}</HashLink>
    }

    return <Link className={this.state.className} to={this.state.link}>{this.props.children}</Link>
  }
}

export default CustomLink;