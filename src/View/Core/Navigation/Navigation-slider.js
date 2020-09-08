import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import {ArrowRight, ArrowLeft} from '../../Styles/icons';
import { client } from '../../../ContentfulContext';


class NavigationSlider extends Component {
  constructor(props) {
    super(props)

    this.sliderRef = [];

    this.state = {
      navigation: props.navigation,
      nav_state: props.nav_state
    }

    this.showSlide = this.showSlide.bind(this);
  }

  showSlide(e, id) {
    console.log("aa");
    const slider = document.getElementById(id).querySelector(".navigation-slider")
    slider.className = "navigation-slider open"
  }

  closeSlide(e, id) {
    console.log(id);
    const slider = document.getElementById(id).querySelector(".navigation-slider");
    slider.className = "navigation-slider"

    console.log(slider.classList);
  }

  componentDidUpdate() {
    if (this.state.navigation != this.props.navigation) { this.setState({navigation: this.props.navigation}) }
    if (this.state.nav_state != this.props.nav_state) { this.setState({nav_state: this.props.nav_state}) }
  }

  render() {
    return(
      <ParentItem navigation={this.state.navigation} nav_state={this.state.nav_state} showSlide={this.showSlide} closeSlide={this.closeSlide}></ParentItem>
    )
  }
}

export default NavigationSlider

const ParentItem = props => {
  const {navigation, nav_state, showSlide, closeSlide, title, id} = props;
  return (
    <div className={`navigation-slider${nav_state === true ? " open" : ""}`}>
      <div className="navigation-items">
        <div className="navigation-header">
          {title ? <a href="javascript:void(0)" onClick={(e) => closeSlide(e, id)}><p><ArrowLeft colour="#000" weight="12"></ArrowLeft>{title}</p></a>
          : <ChildItem title="Montague" url="/"></ChildItem>}
          
        </div>
      </div>

      {navigation.map(item => {
        if(item.fields) {
          const {title, url, links} = item.fields
          if (links) {
            const id = item.sys.id;
            return (
            <div id={id} className="nav-item">
              <ChildItem title={title} url={url} parent={links ? true : false} showSlide={showSlide} id={id}></ChildItem>
              {links && <ParentItem navigation={links} nav_state="false" title={title} url={url} showSlide={showSlide} closeSlide={closeSlide} id={id}></ParentItem>}
            </div>
            )
          } else {
            return (
            <div className="nav-item">
              <ChildItem title={title} url={url} parent={links ? true : false}></ChildItem>
            </div>
            )
          }
        }
      })}
    </div>
  )
}

const ChildItem = props => {
  const {title, url, parent, showSlide, id} = props;
  if (parent)
    return (
      <a href="javascript:void(0)">
        <p onClick={(e) => showSlide(e, id)}>{title}<span className="nav-item-arrow"><ArrowRight colour="#000" weight="12"></ArrowRight></span></p>
      </a>
    )
  else {
    return (
      <Link to={url}>
        <p>{title}</p>
      </Link>
    )
  }
}