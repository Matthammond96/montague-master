import React, { Component } from 'react'
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: '080041f26b499b308d731546fab46f2c-us10',
  server: 'us10'
});

class Newsletter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      show_fields: false
    }
  }

  onChangeHandler = name => event => {
    this.setState({
      [name]: event.target.value,
      show_fields: true
    })
  }

  onClickHandler = () => {
    this.setState({
      show_fields: true
    })
  }

  async callPing() {
    const response = await mailchimp.ping.get();
    console.log(response);
  }

  componentDidMount() {
    this.callPing();
  }

  render() {
    this.callPing();
    const {first_name, last_name, email} = this.state;
    return (
      <div className="footer-item newsletter-form">
        <p>Stay In Touch</p>

        {/* <form>
          <div className="form-group grid">
            <div className="grid-item-1">
              <input type="text" name="email" onClick={this.onClickHandler} onChange={this.onChangeHandler("email")} placeholder="Email Address" value={email}></input>
            </div>
          </div>
          <div className={this.state.show_fields ? "hide-fields active" : "hide-fields"}>
            <div className="form-group grid">
              <div className="grid-item-1">
                <input type="text" name="first_name" onChange={this.onChangeHandler("first_name")} placeholder="First Name" value={first_name}></input>
              </div>
            </div>

            <div className="form-group grid">
              <div className="grid-item-1">
                <input type="text" name="last_name" onChange={this.onChangeHandler("last_name")} placeholder="Surname Name" value={last_name}></input>
              </div>
            </div>
          </div>

          <div className="form-group grid">
            <div className="grid-item-1">
              <button className="btn">Subscribe</button>
            </div>
          </div>
        </form> */}

      
        {/* <div id="mc_embed_signup">
          <form action="https://montagueproperty.us10.list-manage.com/subscribe/post?u=93a070005887850faaae735fe&amp;id=03491348b6" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
              <div class="mc-field-group grid-item-1">
              	<input type="email" onChange={this.onChangeHandler("email")} value={email} name="EMAIL" onClick={this.onClickHandler} class="required email" id="mce-EMAIL" placeholder="Email Address"></input>
              </div>
              <div className={this.state.show_fields ? "hide-fields active" : "hide-fields"}>
                <div class="mc-field-group grid-item-1">
              	  <input type="text" onChange={this.onChangeHandler("first_name")} value={first_name} name="FNAME" class="" id="mce-FNAME" placeholder="First Name"></input>
                </div>
                <div class="mc-field-group grid-item-1">
              	  <input type="text" onChange={this.onChangeHandler("last_name")} value={last_name} name="LNAME" class="" id="mce-LNAME" placeholder="Last Name"></input>
                </div>
              </div>
            </div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style={{ display:"none" }}></div>
              <div class="response" id="mce-success-response" style={{ display:"none" }}></div>
            </div> 
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_93a070005887850faaae735fe_03491348b6" tabindex="-1" value=""></input></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn"></input></div>
          </form> 
        </div> */}
      
      </div>
    )
  }
}
export default Newsletter;