import React, { Component } from "react";
import Cookies from 'js-cookie';
import "./checkout.css";
import firstStep from "./Payment";
import axios from 'axios';
class Checkout extends Component {
  publicName = ""
  payment = ""
  constructor(props) {

    super(props);
    this.state = {
      nameId: "",
      emailId: "",
      phoneNumber: "",
      city: "select",
      formErrors: {},
      inputsVisible: false,
      text: "",
      number: 0,
      campid:0,
      inputFields: [],
      numOfChildren: "",
      nameAge_arr: [],

    };

    this.initialState = this.state;
  }
  //   const [inputsVisible, setInputsVisible] = useState(false);
  //   const [text, setText] = useState('');
  //   const [number, setNumber] = useState(0);
  getparam = (i) => {
   let param = String(window.location.href).split("/")
   return param[i]
  }

  handleButtonClick = (numofFields) => {


    this.state.nameAge_arr = [];
    for (let index = 0; index < numofFields; index++) {
      var temp = { "name": "", "age": "" };
      this.state.nameAge_arr.push(temp);
    }

    this.setState(
      (prevState) => ({
        inputsVisible: true,
        number: numofFields,
      }),
      () => {
        this.setState({

          inputFields: Array.from({ length: this.state.number }, (_, i) => (
            <div className="divinfo2 e-input-group">


              <input
                type='text'
                placeholder=" Name"
                name="name"
                value={this.state.inputFields[i]?.text}
                onChange={(e) => this.handleInputChangeName(e, i)}
                required
                pattern="(^[A-Za-z]{3,16})(([ ]{0,1})([A-Za-z]{3,16})([ ]{0,1}))*"
                className="name"
                title="Please enter like aya hassan ali"
              />

              <input className="age"
                type='number'
                name="age"
                placeholder=" Age"
                value={this.state.inputFields[i]?.number}
                onChange={(e) => this.handleInputChange(e, i)}

              />

            </div>
          )),
        });
      }
    );
  };

  // handleInputChange = (e, i) => {
  //   e.target.value=e.target.value < 5 ? 5 : e.target.value
  //   this.state.nameAge_arr[i].age=e.target.value

  // };
  handleInputChange = (e, i) => {
    const newValue = e.target.value < 5 ? 5 : e.target.value;
    e.target.value = newValue
    const newNameAgeArr = [...this.state.nameAge_arr];
    newNameAgeArr[i] = { ...newNameAgeArr[i], age: newValue };
    this.setState({ nameAge_arr: newNameAgeArr });
    const { value, name } = e.target;
    const inputFields = [...this.state.inputFields];
    inputFields[i] = { ...inputFields[i], [name]: value };
    this.setState({ inputFields });
  };

  handleInputChangeName = (e, i) => {
    const updatedNameAgeArr = [...this.state.nameAge_arr];
    updatedNameAgeArr[i] = { ...updatedNameAgeArr[i], name: e.target.value };
    this.setState({ nameAge_arr: updatedNameAgeArr });
    const { value, name } = e.target;
    const inputFields = [...this.state.inputFields];
    inputFields[i] = { ...inputFields[i], [name]: value };
    this.setState({ inputFields });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  handleFormValidation = () => {
    const { nameId, emailId, phoneNumber, city } = this.state;
    let formErrors = {};
    let formIsValid = true;



    if (!emailId) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id.";
    }

    if (!phoneNumber) {
      formIsValid = false;
      formErrors["phoneNumberErr"] = "Phone number is required.";
    } else {
      var mobPattern = /^01[0125][0-9]{8}$/;
      if (!mobPattern.test(phoneNumber)) {
        formIsValid = false;
        formErrors["phoneNumberErr"] = "Invalid phone number.";
      }
    }

    if (city === "" || city === "select") {
      formIsValid = false;
      formErrors["cityErr"] = "Select city.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  };

  handleChange = (e) => {

    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChangeInfo = (e) => {
    e.target.value = e.target.value < 1 ? 1 : e.target.value
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.handleButtonClick(e.target.value)

  };


  handleSubmit = async (e) => {
    e.preventDefault();
    //-------------- Get Camp ID --------------
    let query = String(window.location.href).split("/")[4].split("-")
    let id  = query[0]
    const data = new FormData();
    data.append('email', this.state.emailId);
    data.append('phone', this.state.phoneNumber);
    data.append('numOfChildren', this.state.numOfChildren);
    data.append('childInfo', JSON.stringify(this.state.nameAge_arr));
    data.append('city', this.state.city);
    //-------------- Set Camp,User ID --------------
    data.append('camp', id);
    data.append('user',  Cookies.get('userid'));
    data.append('payed', 1);
    var object = {};
    data.forEach((value, key) => object[key] = value);
    console.log(object);
    var json = JSON.stringify(object);
    console.log(json);
    if (this.handleFormValidation()) {
      try {
        console.log(data);
        const response = await axios.post('http://127.0.0.1:8000/camps/checkout/', data);
        alert("You have been successfully registered.");

        this.setState({
          nameAge_arr: [],
          inputFields: []
        });
      } catch (error) {
        console.log(error);
      }
      this.setState(this.initialState);
    }
  };



  handleOnline = async (e) => {
    e.preventDefault();
    //-------------- Get Camp ID --------------
    let query = String(window.location.href).split("/")[4].split("-")
    let id  = query[0]
    let price  = query[1]
    const data = new FormData();
    data.append('email', this.state.emailId);
    data.append('phone', this.state.phoneNumber);
    data.append('numOfChildren', this.state.numOfChildren);
    data.append('childInfo', JSON.stringify(this.state.nameAge_arr));
    data.append('city', this.state.city);
    //-------------- Set Camp,User ID --------------
    data.append('camp', id);
    data.append('user',  Cookies.get('userid'));
    data.append('payed', "1");
    price = price * this.state.numOfChildren *100
    var object = {};
    data.forEach((value, key) => object[key] = value);
    console.log(object);
    var json = JSON.stringify(object);
    console.log(json);
    sessionStorage.setItem("test", "test");
    sessionStorage.setItem("data", json);
    console.log(sessionStorage.getItem("test"));
    console.log(sessionStorage.getItem("data"));
    if (this.handleFormValidation()) {
      try {
        // console.log(data);
        // const response = await axios.post('http://127.0.0.1:8000/camps/checkout/', data);


        this.setState({
          nameAge_arr: [],
          inputFields: []
        });
        firstStep(price)
      } catch (error) {
        console.log(error);
      }
      this.setState(this.initialState);
    }



  };




  render() {
    const {
      nameErr,
      emailIdErr,
      phoneNumberErr,
      cityErr,
    } = this.state.formErrors;
    this.publicName = nameErr
    return (
      <div className='formDiv container'>
        <h3 style={{ textAlign: "center" }}>Checkout Form </h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>

              <input
                type='number'
                name='numOfChildren'
                placeholder='Number of children'
                value={this.state.numOfChildren}
                onChange={this.handleChangeInfo}
              />

            </div>
            <div>
            </div>

            <div className="childInfo">
              {this.state.inputsVisible && (
                <>
                  {this.state.inputFields}

                </>
              )}

            </div>
            <div>

              <input
                type='text'
                name='emailId'
                value={this.state.emailId}
                onChange={this.handleChange}
                placeholder='Your email ..'
                className={emailIdErr ? " showError" : ""}
              />
              {emailIdErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {emailIdErr}
                </div>
              )}
            </div>


            <div>

              <input
                type='text'
                name='phoneNumber'
                onChange={this.handleChange}
                value={this.state.phoneNumber}
                placeholder='Your phone number..'
                className={phoneNumberErr ? " showError" : ""}
              />
              {phoneNumberErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {phoneNumberErr}
                </div>
              )}
            </div>
            <div>
              <select
                name='city'
                value={this.state.city}
                onChange={this.handleChange}
                className={cityErr ? " showError" : ""}>
                <option value='city' defaultChecked>--City--</option>
                <option value='cairo'>Cairo</option>
                <option value='giza'>Giza</option>
              </select>
              {cityErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div>
              )}
            </div>
            <div className="divinfo2">
              <input name="Offline" type='submit' value='Payment Offline' />

              <input name="Online" type='button' value='payment Online' onClick={this.handleOnline} />
            </div>

          </form>

        </div>

      </div>


    );
  }
}

export default Checkout;
