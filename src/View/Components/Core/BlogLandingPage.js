import React, { Component, Fragment } from 'react';
import { client } from '../../../ContentfulContext';
import Slider from 'react-slick';
import Banner from './Banner';
import BlogList from './BlogList';
import { Link } from 'react-router-dom';

class BlogLandingPage extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      url: window.location.pathname.replace("/montague-post", ""),
      component: props.component,
      blogs: [],
      articles: [],
      activeBlog: null,
      initialSlide: 0
    };
  }

  async fetchBlogs() {
    let id = "";
    
    const promise = await this.state.component.blogs.map((blog, key) => {
      if (key === 0) return id = id + blog.sys.id
      return id = id + `,${blog.sys.id}`
    });
    await Promise.all(promise);
  
    client
      .getEntries({"sys.id[in]": id})
      .then(entry => {
        if (this.state.url === "" || this.state.url ==="/") {
          const activeBlog = entry.items.find(o => o.sys.id === this.state.component.blogs[0].sys.id);
          this.setState({blogs: entry.items, activeBlog: activeBlog, loaded: true})
        } else {
          const activeBlog = entry.items.find(o => o.fields.handle === this.state.url);
          const index = this.state.component.blogs.findIndex(x => x.sys.id === activeBlog.sys.id)
          console.log(index);
          this.setState({blogs: entry.items, activeBlog: activeBlog, initialSlide: index, loaded: true})
        }
        
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
      this.fetchBlogs();
    }
  }

  componentDidMount() {
    this.fetchBlogs();
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      fade: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 1,
      draggable: false,
      initialSlide: this.state.initialSlide
    };
    return (
      <section id="blog-listing-page">
        <div className="blog-header">
          {this.state.loaded ? (
            <Fragment>
              <Slider ref={c => (this.slider = c)} {...settings}>
                {this.state.component.blogs.map(blog => {
                  const setBlog = this.state.blogs.find(o => o.sys.id === blog.sys.id);
                  if (setBlog) {
                    const {title, blogFeaturedImage} = setBlog.fields;
                    const component = {title: title, image: blogFeaturedImage};
                    return (
                      <Banner component={component}></Banner>
                    )
                  }
                })}
              </Slider>
              <div className="banner-component property-tabbed-content">
                <div className="property-toggle-container">
                  <div className="toggle-headings">
                  {this.state.component.blogs.map((blog, key) => {
                      const setBlog = this.state.blogs.find(o => o.sys.id === blog.sys.id);
                      if (setBlog) {
                        const url = "/montague-post" + setBlog.fields.handle;
                        return (
                          <Link to={url}>
                            <p onClick={() => {
                              this.slider.slickGoTo(key);
                              this.setState({activeBlog: setBlog})
                            }}>{setBlog.fields.title}</p>
                          </Link>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>

        <div className="blog-articles page">
          {this.state.articles && this.state.activeBlog ? (
            <BlogList blog={this.state.activeBlog.sys.id} title={this.state.activeBlog.fields.title} paragraph={this.state.activeBlog.fields.paragraph} articles={this.state.articles}></BlogList>
          ) : null}
        </div>

        {/* <Press component={{title: "Culture", paragraph: "Note: But be aware slick-carousel has a peer-dependancy on jQuery which you, or your colleagues may not like to see in your console output, so you can always grab the CSS from there and convert it into any CSS in JS solution that you might be using."}}></Press> */}
      </section>
    )
  }
}

export default BlogLandingPage;