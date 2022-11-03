import React from "react";
import "./SignUp.css";
import profile from "../../../images/a.png";
import pass from "../../../images/pass.png";
import email from "../../../images/email.jpg";
import { useNavigate } from "react-router-dom";
  
class SignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: ""
  }

  changeFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  
  changeLastName = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  
  changeUserName = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  
  changePhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  
  changeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  
  changePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  signUp = () => {
    let data = {
      UserName: this.state.userName,
      Password: this.state.password,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Email: this.state.email,
      PhoneNumber: this.state.phoneNumber
    }

    var that = this;

    fetch("https://localhost:7280/signup", {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8'
          },
      body: JSON.stringify(data)
      })
      .then(response => {
        if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
      }).then(data => {

        that.props.navigate("/login");
        console.log(data); 
      })
      .catch(error => {
        console.log(error);
      });
    }
  

  render() {
    return (
      <div className="main">
           <div className="sub-main">
         <div>
           <div className="imgs">
             <div className="container-image">
               <img src={profile} alt="profile" className="profile"/>
             </div>
           </div>
           <div>
             <h1> Register</h1>
             <div>
                <input type="text" placeholder="Firstname" className="name" value={this.firstName} onChange={this.changeFirstName}/><br></br><br></br>
             </div>
             <div>
                <input type="text" placeholder="Lastname" className="name" value={this.lastName} onChange={this.changeLastName}/><br></br><br></br>
             </div>
             <div>
                <input type="text" placeholder="User Name" className="name" value={this.userName} onChange={this.changeUserName}/><br></br><br></br>
             </div>
             <div>
                <input type="text" placeholder="Phone Number" className="name" value={this.phoneNumber} onChange={this.changePhoneNumber}/><br></br><br></br>
             </div>
             <div>
               <img src={email} alt="email" className="email"/>
               <input type="text" placeholder="Email" className="name" value={this.email} onChange={this.changeEmail}/>
             </div>
             <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
               <input type="password" placeholder="Password" className="name" value={this.password} onChange={this.changePassword}/>
             </div>
            <div className="login-button">
            <button onClick={this.signUp}>Register</button>
            </div> 
              
           </div>
         </div>
       </div>
      </div>
    );
  }
}

export function SignUpWithRouter(props){
  const navigate = useNavigate();
  return (<SignUp navigate={navigate}/>);
}
 
export default SignUp;