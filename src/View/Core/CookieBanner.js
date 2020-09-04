import React, { Component } from 'react'

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_me: true
    };
  }

  async setCookie() {
    await localStorage.setItem("cookies", "accepted");
    return
  }

  onClickHandler = async () => {
    const promise = await this.setCookie();

    this.setState({
      show_me: false
    })
  }

  render() {
    return (
      <div>
        {this.state.show_me ? (
          <div className="cookie-banner">
            <div className="page-container">
              <div className="cookie-text">
                <p>This site uses cookies and similar technology to function properly and to provide the services present on it, analytical cookies (our own and third party) to understand and improve users' browsing experience, and profiling cookies (our own and third party) to serve you advertisements in line with preferences displayed while browsing online. For further information, see our Cookie Policy. To refuse consent for some or all cookies, click here. By clicking "accept", you consent to the use of the aforementioned cookies.</p>
              </div>
              <div className="cookie-button">
                <button className="btn" onClick={this.onClickHandler} >Accept</button>
              </div>
            </div>
          </div>
        ): null}
      </div>
    )
  }
}

export default CookieBanner;