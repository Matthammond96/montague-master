import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class VideoComponent extends Component {
  constructor(props) {                      
    super(props);

    let ref = React.createRef();

    this.state = {
      component: props.component,
      play: false
    };
  }

  play() {
    
  }

  componentDidUpdate() {
    if (this.state.component != this.props.component) {
      this.setState({component: this.props.component});
    }
  }

  render() {
    const {title, paragraph, wide, videoThumbnail, videoFile} = this.state.component;

    return (
      <section className={wide ? "video-comtainer" : "page-container"}>
        <h2 className="section-title"><span className="line">{title}</span></h2>
        <p>{paragraph}</p>
        <div className="video-component">
          <ReactPlayer controls ref={this.ref} url={videoFile.fields.file.url} width="100%" height="100%"  playing playIcon={<div className="play-button"></div>} light={videoThumbnail.fields.file.url}></ReactPlayer>


        </div>
      </section>
    )
  }
}

export default VideoComponent;