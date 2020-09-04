import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

class ContactForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: 1,
      image1: true,
      image2: false,
      image3: false,
      name: "",
      phone: "",
      email: "",
      message: "",
      success: false,
      error: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: ""
    })
  }

  sendEmail(e) {
    if (this.state.name === "") return this.setState({error: true});
    if (this.state.phone === "") return this.setState({error: true});
    if (this.state.email === "") return this.setState({error: true});
    if (this.state.message === "") return this.setState({error: true});

    if (!this.state.email.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) return this.setState({error: true});

    emailjs.sendForm('gmail', 'template_MFaczJnf', e.target, 'user_69nyfQVMDHp4qYJveoY49')
      .then((result) => {
          this.setState({success: true,
          name: "",
          phone: "",
          email: "",
          message: "",});
      }, (error) => {
        this.setState({error: true});
      });
  }

  componentWillMount() {
    setInterval(() => {
      
      if (this.state.image === 3) {
        this.setState({image: 1});
      } else {
        this.setState({image: this.state.image + 1});
      }

      if (this.state.image === 1) {
        this.setState({image1: true, image2: false, image3: false})
      }


      if (this.state.image === 2) {
        this.setState({image1: false, image2: true, image3: false})
      }


      if (this.state.image === 3) {
        this.setState({image1: false, image2: false, image3: true})
      }
      
    }, 5000);
  }

  onChangeHandler() {
  }


  onClick(e) {
    e.preventDefault();

    const ex = document.getElementById("ex");

    ex.click()
    // this.sendEmail(ex);
  }

  render() {
    
    return (
      <div className="contact-form-contact page-container">
        <h2><span>Schedule A Viewing</span></h2>
        <div className="contact-form-cotainer">
        <div className="contact-info">
          <p>10 Brick Street,<br></br>Mayfair,<br></br>W1J 7DF<br></br>Tel: 020 7118 1162<br></br>katy@montaguerealestate.com</p>
        </div>

        <div className="form">
          {/* <p class="enquiry-text">For any current enquires or wish to stay update to date please fill in the contact
            form below.</p> */}

          { this.state.success ? (
          <p className="response">Your enquiry has succesfully been submitted.A member of our team will get back to you
            within 48 hours.</p>
          ): null }

          {this.state.error ? (
          <p className="response">Your enquiry could not be sumbitted, please try again, or call us on 020 7118 1162</p>
          ): null}


          <form>
            <div className="container">
            <div className="flex">
            <div className="form-group grid">
              <div className="grid-item-1">
                <label>First Name</label>
                <input type="text" name="first_name" onChange={this.onChangeHandler} placeholder="" value=""></input>
              </div>
            </div>
            <div className="form-group grid">
              <div className="grid-item-1">
                <label>Surname Name</label>
                <input type="text" name="last_name" onChange={this.onChangeHandler} placeholder="" value=""></input>
              </div>
          </div>
          <div className="form-group grid">
            <div className="grid-item-1">
              <label>Phone</label>
              <input type="text" name="phone" onClick={this.onClickHandler} onChange={this.onChangeHandler()} placeholder="" value=""></input>
            </div>
          </div>
          <div className="form-group grid">
            <div className="grid-item-1">
              <label>Email Address</label>
              <input type="text" name="email" onClick={this.onClickHandler} onChange={this.onChangeHandler()} placeholder="" value=""></input>
            </div>
          </div>
          </div>
          <div className="flex">
          <div className="form-group grid textarea">
            <div className="grid-item-1">
              <label>Message</label>
              <textarea></textarea>
            </div>
          </div>
          </div>
          </div>
            
          <div className="form-group grid">
            <div className="grid-item-1 button-form">
              <button className="btn">Submit</button>
            </div>
          </div>
        </form>
        </div>
        </div>
      </div>
    )
  }
}


export default ContactForm;