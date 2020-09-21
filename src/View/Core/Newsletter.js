import React, { Component } from 'react';
import emailjs from 'emailjs-com';

class Newsletter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      show_fields: false,
      success: false,
      error: false
    }

    this.sendEmail = this.sendEmail.bind(this);
  }

  onChangeHandler = name => event => {
    this.setState({
      [name]: event.target.value,
      show_fields: true
    })
  }

  sendEmail(e) {
    e.preventDefault();
    if (this.state.first_name === "") return this.setState({error: true});
    if (this.state.last_name === "") return this.setState({error: true});
    if (this.state.email === "") return this.setState({error: true});

    emailjs.sendForm('gmail', 'template_pxsuo5e', e.target, 'user_69nyfQVMDHp4qYJveoY49')
      .then((result) => {
          this.setState({success: true,
            first_name: "",
            last_name: "",
            email: ""});
      }, (error) => {
        this.setState({error: true});
      });
  }


  onClickHandler = () => {
    this.setState({
      show_fields: true
    })
  }

  render() {
    const {first_name, last_name, email} = this.state;
    return (
      <div className="footer-item newsletter-form">
        <p>Stay In Touch</p>

        <form onSubmit={this.sendEmail}>
          <div className="form-group grid">
            <div className="grid-item-1">
              <input type="text" name="email" onClick={this.onClickHandler} onChange={this.onChangeHandler("email")} placeholder="Email Address" value={email}></input>
            </div>
          </div>
          <div className={this.state.show_fields ? "hide-fields active" : "hide-fields"}>
            <div className="form-group grid">
              <div className="grid-item-1">
                <input type="text" name="firstName" onChange={this.onChangeHandler("first_name")} placeholder="First Name" value={first_name}></input>
              </div>
            </div>

            <div className="form-group grid">
              <div className="grid-item-1">
                <input type="text" name="lastName" onChange={this.onChangeHandler("last_name")} placeholder="Surname Name" value={last_name}></input>
              </div>
            </div>
          </div>

          <div className="form-group grid">
            <div className="grid-item-1">
              <input type="submit" className="btn" value="Subscribe" />
            </div>
          </div>
        </form>
      
      </div>
    )
  }
}
export default Newsletter;