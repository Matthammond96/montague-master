import React, { Component,  } from 'react'
import { Link } from 'react-router-dom';
import {ArrowRight, ArrowLeft} from '../../Styles/icons';


class NavigationSlider extends Component {
  constructor(props) {
    super(props)

    this.sliderRef = [];

    this.state = {
      navigation: props.navigation,
      nav_state: props.nav_state
    }

    this.onClickHanlder = props.onClickHanlder;
    this.showSlide = this.showSlide.bind(this);
  }

  showSlide(e, id) {
    const slider = document.getElementById(id).querySelector(".navigation-slider");
    slider.className = "navigation-slider open";
  }

  closeSlide(e, id) {
    const slider = document.getElementById(id).querySelector(".navigation-slider");
    slider.className = "navigation-slider";
  }

  componentDidUpdate() {
    if (this.state.navigation !== this.props.navigation) { this.setState({navigation: this.props.navigation}) }
    if (this.state.nav_state !== this.props.nav_state) { this.setState({nav_state: this.props.nav_state}) }
  }

  render() {
    return(
      <ParentItem navigation={this.state.navigation} onClickHanlder={this.onClickHanlder} nav_state={this.state.nav_state} showSlide={this.showSlide} closeSlide={this.closeSlide}></ParentItem>
    )
  }
}

export default NavigationSlider

const ParentItem = props => {
  const {navigation, nav_state, showSlide, closeSlide, title, id, onClickHanlder} = props;
  return (
    <div className={`navigation-slider${nav_state === true ? " open" : ""}`}>
      <div className="navigation-items">
        <div className="navigation-header">
          {title ? <Link to="#" onClick={(e) => closeSlide(e, id)}><p><ArrowLeft colour="#000" weight="12"></ArrowLeft>{title}</p></Link>
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
              <ChildItem onClickHanlder={onClickHanlder} title={title} url={url} parent={links ? true : false} showSlide={showSlide} id={id}></ChildItem>
              {links && <ParentItem navigation={links} nav_state="false" title={title} url={url} showSlide={showSlide} closeSlide={closeSlide} id={id} onClickHanlder={onClickHanlder}></ParentItem>}
            </div>
            )
          } else {
            return (
            <div className={url ? "nav-item" : "nav-item heading"}>
              <ChildItem onClickHanlder={onClickHanlder} title={title} url={url} parent={links ? true : false}></ChildItem>
            </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}

const ChildItem = props => {
  const {title, url, parent, showSlide, id, onClickHanlder} = props;
  if (parent)
    return (
      <Link to="#">
        <p onClick={(e) => showSlide(e, id)}>{title}<span className="nav-item-arrow"><ArrowRight colour="#000" weight="12"></ArrowRight></span></p>
      </Link>
    )
  else {
    return (
      <Link to={url} onClick={onClickHanlder}>
        <p>{title}</p>
      </Link>
    )
  }
}