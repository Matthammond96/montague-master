import React, { Component, Fragment } from 'react';
import Slider from "react-slick";
import { client } from '../../../ContentfulContext';
import {ArrowLeft, ArrowRight} from '../../Styles/icons';
import { Link } from 'react-router-dom';

const Article = (props) => {
  const {title, articleImage, url} = props.fields;
  const blog = props.title.replace(" ", "-");
  const to = "/montague-post/" + blog + url;
  return (
    <Link to={to.toLowerCase()} id={props.id}>
      <div className="press-item">
        <div className="press-aspect">
          <img src={articleImage.fields.file.url} alt={articleImage.fields.file.title}></img>
        </div>
        <div className="blog-misc">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

class BlogList extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      blog: props.blog,
      articles: props.articles,
      title: props.title,
      paragraph: props.paragraph
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  prev() {
    this.slider.slickPrev();
  }

  fetchArticles() {
    client
    .getEntries({"content_type": "article", "fields.blog.sys.id" : this.state.blog})
    .then(entries => this.setState({articles: entries.items}))
    .catch(err => console.log(err));
  }

  async componentDidUpdate() {
    if (this.state.blog != this.props.blog) {
      await this.setState({
        blog: this.props.blog,
        articles: this.props.articles,
        title: this.props.title,
        paragraph: this.props.paragraph
      });
      this.fetchArticles();
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    var settings = {
      focusOnSelect: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 2,
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
            <h2 className="section-title"><span className="line">{this.state.title}</span></h2>
            <p>{this.state.paragraph}</p>
          </div>
          {this.state.articles.length > 0 ? (
            <Fragment>
              <div className="press-carosel">
                {this.state.articles.length > 2 ? (
                  <Slider ref={c => (this.slider = c)} {...settings}>
                    {this.state.articles.map(article => (
                      <Article title={this.state.title} id={article.sys.id} fields={article.fields}></Article>
                    ))}
                  </Slider>
                ) : (
                  <div className="static-carosel">
                    {this.state.articles.map(article => (
                      <Article title={this.state.title} id={article.sys.id} fields={article.fields}></Article>
                    ))}
                  </div>
                )}
              </div>
              {this.state.articles.length > 2 ? (
                <div className="arrow-wrapper">
                  <div className="arrow-container prev" onClick={this.prev}><ArrowLeft colour="#1c1c1c"></ArrowLeft></div>
                  <div className="arrow-container next" onClick={this.next}><ArrowRight colour="#1c1c1c"></ArrowRight></div>
                </div>
              ) : null}
            </Fragment>
          ) : (
            <h1>No Blog Posts Found</h1>
          )}
        </div>
      </section>
    )
  }
}

export default BlogList;