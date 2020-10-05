import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import validator from 'validator';
import { client } from '../../../ContentfulContext';

class ContactForm extends Component {
  constructor(props) {                      
    super(props);

    this.state = {
      component: props.component,
      name: "",
      phone: "",
      email: "",
      message: "",
      location: window.location.pathname,
      success: false,
      error: false,
      viewing: props.viewing,
      group: []
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.getFieldGroups = this.getFieldGroups.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: ""
    })
  }

  validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
   }

  sendEmail(e) {
    e.preventDefault();
    if (this.state.name === "") return this.setState({error: true});
    if (this.state.phone === "" || this.validatePhoneNumber(this.state.phone) === false) return this.setState({error: true});
    if (this.state.email === "") return this.setState({error: true});
    if (this.state.message === "") return this.setState({error: true});

    // if (!this.state.email.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) return this.setState({error: true});

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

  async getFieldGroups() {
    let id = "";
    if (this.state.component.customFields) {
      const promise = await this.state.component.customFields.map((group, key) => {
        if (key === 0) return id = id + group.sys.id
        return id = id + `,${group.sys.id}`
      });
      await Promise.all(promise);
  
      client
      .getEntries({"sys.id[in]": id})
      .then(entry => this.setState({group: entry.items}))
      .catch(err => console.log(err));
    }
  }

  componentDidUpdate() {
    if (this.state.component !== this.props.component) {
      this.setState({component: this.props.component});
      this.getFieldGroups();
    }
  }

  componentDidMount() {
    this.getFieldGroups();
  }

  render() {
    return (
      <section id="contact-us" className={this.state.viewing ? "contact-us viewing page-container" : "contact-us page-container"}>
        {this.state.viewing && (
          <div className="titlePara-component">
            <h2 className="section-title orchide"><span className="line">Schedule A Viewing</span></h2>
            <p>Your ideal property represents an expression of your personality. And so Montague Real Estates takes pride in offering a truly personalised service, on hand to guide you through every step.</p>
          </div>
        )}

        {this.state.component.title && (
          <div className="titlePara-component">
            <h2 className="section-title"><span className="line">{this.state.component.title}</span></h2>
          </div>
        )}
        

        <div className="contact-container">
          <div className="information"> 
            <p><strong>Contact Us</strong></p>
            <p>sales@montaguerealestate.com</p>
            <p>020 7118 1162</p>
          </div>



          <div className="form-container">
            { this.state.success ? (
              <p className="response">Your enquiry has succesfully been submitted.A member of our team will get back to you within 48 hours.</p>
            ): null }

            {this.state.error ? (
              <p className="response">Your enquiry could not be sumbitted, please try again, or call us on 020 7118 1162</p>
            ): null}

            <form id="form" className="contact-form" onSubmit={this.sendEmail}>
              <div className="form-group">
                <input type="hidden" name="page" value={this.state.location} />
                <input type="text" name="name" onChange={this.handleChange("name")} placeholder="Full Name" value={this.state.name} required/>
                <input type="text" name="phone" placeholder="Phone Number" onChange={this.handleChange("phone")} value={this.state.phone} required />                    
              </div>
              <div className="form-group">
                <input type="email" name="email" onChange={this.handleChange("email")} placeholder="Email Address" value={this.state.email} required/>
              </div>
              
              {this.state.group && 
                this.state.group.map(group => {
                  console.log(group)
                  return (
                  <div className="form-group">
                    {group.fields.formFields.map(field => {
                      return <input type="text" name={field.fields.fieldName} onChange={this.handleChange(field.fields.fieldName)} placeholder={field.fields.fieldName} />
                    })}
                  </div>
                  )
                })
                
              }

              <div className="form-group last">
                <textarea name="message" placeholder="Your Enquiry" onChange={this.handleChange("message")} value={this.state.message} required/>
              </div>
              <input type="submit" className="btn" value="Submit" />
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default ContactForm;