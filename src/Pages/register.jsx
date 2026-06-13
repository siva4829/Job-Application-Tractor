import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:5000/register",
            {
                username,
                email,
                password
            }
        );

        console.log(response.data);
        alert("Registration Successful");
        alert("Registration Successful! Redirecting to login...");
        setTimeout(() => {
        navigate("/");
            }, 1000);

    } catch (error) {
        console.error(error);
        alert("Registration Failed");
    }
};
  
    return(
    <div>
        <form id="reg" onSubmit={handleSubmit}>
            <h1>Welcome To Job Application Tracter</h1>
            <h2>Register</h2>
            <label htmlFor="username">Username : </label>
            <input type="text" name="username" id="username"  value={username} onChange={(e)=>setUsername(e.target.value)} required /><br />
            <label htmlFor="email">E-mail : </label>
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br />
            <label htmlFor="password">Password : </label>
            <input type="password" name="password" id="password" minLength="8" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br />
            <label htmlFor="cpassword">Confirm Password : </label>
            <input type="password" name="cpassword" id="cpassword" minLength="8" value={cpassword} onChange={(e)=>setCpassword(e.target.value)}required/><br />
            <button type="submit">Register</button>
        </form>
    </div>
    );

}

export default Register;