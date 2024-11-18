import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

export const Signup = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ((role === 'Admin' && secretKey !== "M0h1th@07") || (role === 'Agent' && secretKey !== "G@ne5h@7")) {
            event.preventDefault();
            alert("Invalid Admin");
        } else {
            event.preventDefault();
            try {
                console.log('hii');
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    name: userName,
                    email: userEmail, 
                    password: password,
                    role: role
                });
                console.log('hii');
    
                if (response.status === 201) {
                    const {token, role}  = response.data;
                    setMessage('Signup successful!');
                    setUserName('');
                    setPassword('');
                    setUserEmail('');
                    setRole('');
                    setSecretKey('');
    
                    localStorage.setItem('token', token);
                    
                    navigate(`/${role}-dashboard`);
                }
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.error);
                } else {
                    setMessage('An error occurred. Please try again.');
                }
            }
        }
        
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-head">Signup</h2>

                <label className="user">User Name:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="signup-input"
                />

                <label className="user">User Email:</label>
                <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter useremail"
                    required
                    className="signup-input"
                />

                <label className="user">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="signup-input"
                />

                <label className="user">Role:</label>
                <div>
                <input
                    type="radio"
                    value="Admin"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    required
                /> Admin

                <input
                    type="radio"
                    name="role"
                    value="Agent"
                    onChange={(e) => setRole(e.target.value)}
                    required
                /> Customer Service Agent

                <input
                    type="radio"
                    value="Customer"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    required
                /> Customer
                </div>

                
                {(role === "Admin" || role === "Agent") ? (
                    <div style={{marginTop: '10px'}}>
                    <label className="user">Secret Key:</label>
                    <input
                    type="text"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter secretkey"
                    required
                    className="signup-input"/>
                    </div>
                ) : null}

                

                <button className="signup-button" type="submit">Sign Up</button>
                {message && <p className="signup-message">{message}</p>}
                
            </form>

            <p>Already have an account? <Link className="link" to={'/signin'}>Signin</Link></p>
        </div>
    );
};
