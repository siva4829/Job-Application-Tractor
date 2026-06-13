import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, useNavigate,  Route} from "react-router-dom";

function Login() {
  const [logEmail, setlogEmail] = useState("");
  const [logpassword, setlogpassword] = useState("");
 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email: logEmail,
        password: logpassword
      }
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    alert("Login Successful");

// after successful login
      navigate("/dashboard");

  } catch (err) {
    alert("Invalid Credentials");
  }
};
    const navigate = useNavigate();

const reg = () => {
  navigate("/register");
};
  return (
    <div >
      <h1>Welcome To Job Application Tracter</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id="login">
        <label htmlFor="Logemail">E-mail:</label>
        <input  type="email" name="Logemail" id="Logemail" value={logEmail} onChange={(e) => setlogEmail(e.target.value)} required />
        <label htmlFor="Logpass">Password:</label>
        <input type="password" name="Logpassword" id="Logpass" minLength="8" value={logpassword} onChange={(e) => setlogpassword(e.target.value)} required />
        <p type="button" onClick={reg}> Register here</p>
        <button type="submit">Login</button>
        
      </form>
    </div>
    
  );

}

export default Login;