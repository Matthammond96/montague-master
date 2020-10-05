import React, { Component } from 'react';
import { client } from '../../../ContentfulContext';
import Slider from "react-slick";
import {ArrowLeft, ArrowRight} from '../../Styles/icons';

class PressContainer extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      press: []
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  fetchPress() {
    client
    .getEntries({"content_type": "press"})
    .then(entries => this.setState({press: entries.items}))
    .catch(err => console.log(err));
  }

  next() {
    this.slider.slickNext();
  }
  prev() {
    this.slider.slickPrev();
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
    var settings = {
      focusOnSelect: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 2,
      row: 1,
      responsive: [
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <section className="press-container page">
        <div className="press-flex">
          <div className="press-header">
            <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
            <p>{this.state.component.paragraph}</p>
          </div>
          <div className="press-carosel">
          <Slider ref={c => (this.slider = c)} {...settings}>
          {this.state.press.map(article => {
            const {headline, publisher, date, articleImage} = article.fields;
            return (
              <div className="press-item">
                <div className="press-aspect">
                  <img src={articleImage.fields.file.url} alt={articleImage.fields.file.title}></img>
                </div>
                <div className="press-misc">
                  <h2>{headline}</h2>
                  <p>@{publisher} {date}</p>
                </div>
              </div>
            )
          })}
          </Slider>
        </div>
          <div className="arrow-wrapper">
          <div className="arrow-container prev" onClick={this.prev}><ArrowLeft colour="#1c1c1c"></ArrowLeft></div>
          <div className="arrow-container next" onClick={this.next}><ArrowRight colour="#1c1c1c"></ArrowRight></div>
          </div>

        </div>
      </section>
    )
  }
}

export default PressContainer;