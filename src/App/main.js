import React, { Component } from 'react';
import "../style/index.css";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = (formErrors, ...rest) => {
  let valid = true;

  //validate form errrs being empyt
  Object.values(formErrors).forEach(val => {
    val.lenght > 0 && (valid == false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val =>{
    val === null && (valid = false);
  });
  return valid;
};

class Main extends Component {
  constructor(prop){
    super(prop);
    this.state = {
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      //for this form formErrors object we are passing it along to formValid function
      formErrors:{
        firstName:"",
        lastName:"",
        email:"",
        password:""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)){
      console.log(`
          --SUBMITTING--
          First Name: ${this.state.firstName}
          Last Name: ${this.state.lastName}
          Email: ${this.state.email}
          Password: ${this.state.password}
        `);
      }
      else{
        console.error("Form Invalid");
      }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "firstName":
        formErrors.firstName = value.length < 3 ? "Minimum 3 characters required":"";
        break;
      case "lastName":
        formErrors.lastName = value.length < 3 ? "Minimum 3 characters required":"";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "":"Invalid email address";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "Minimum 3 characters required":"";
        break;
      default:
        break;
    }
    //update this.state
    // Dynamically we are gona set the name property so first name comes in being a first name and then
    // we set its value, last name goes in so this works for all the cases
    //then callback event to show the result after state update
    this.setState({ formErrors, [name]:value}, ()=> console.log(this.state));
  }
  render(){
    const {formErrors} = this.state;
    return(
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}/>
              {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}/>
                {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                name="email"
                onChange={this.handleChange}/>
              {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                name="password"
                onChange={this.handleChange}/>
                {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
