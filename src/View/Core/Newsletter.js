import React, { Component } from 'react'

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


  render() {
    const {first_name, last_name, email} = this.state;
    return (
      <div className="footer-item newsletter-form">
        <p>Stay In Touch</p>

        <form>
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
        </form>

      </div>
    )
  }
}
export default Newsletter;