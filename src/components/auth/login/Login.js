import React from "react";
import "./Login.css";
import profile from "../../../images/a.png";
import pass from "../../../images/pass.png";
import { useNavigate } from "react-router-dom";
 
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  changeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  changePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  

  login = () => {
    let data = {
      UserName: this.state.username,
      Password: this.state.password
    }

    console.log(data);
    var that = this;

    fetch("https://localhost:7280/login", {
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
      let auth = {
        Uid: data.uid,
        isAdmin: data.isAdmin
      };

      localStorage.setItem("auth", JSON.stringify(auth));
      console.log(data);
      that.props.navigate("/");
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="main">
           <div className="sub-main1">
         <div>
           <div className="imgs">
             <div className="container-image">
               <img src={profile} alt="profile" className="profile"/>
             </div>
           </div>
           <div>
             <h1>Login Page</h1>
             <div>
               <input type="text" placeholder="user name" className="name" onChange={this.changeUsername} value={this.userName}/>
             </div>
             <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
               <input type="text" placeholder="Password" className="name input1" onChange={this.changePassword} value={this.password}/>
             </div>
            <div className="login-button">
            <button onClick={this.login}>Login</button>
            </div>
             
              <p className="link">
                <a href="/signup">Sign Up</a>
              </p>  
              
           </div>
         </div>
       </div>
      </div>
    );
  }
  
}

export function LoginWithRouter(props){
  const navigate = useNavigate();
  return (<Login navigate={navigate}/>);
}
 
export default Login;