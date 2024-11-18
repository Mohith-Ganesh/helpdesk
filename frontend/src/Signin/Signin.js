import React, { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import './Signin.css';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',  {
                
                email: email,
                password: password,
                
            });

            if (response.status === 201) {
                const { token, user } = response.data;
                setMessage('Login successful!');
                // Save the token to localStorage for future requests
                localStorage.setItem('token', token);
                setEmail('');
                setPassword('');

                navigate(`/${user.role}-dashboard`);

            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleLogin}>
                <h2 className="signin-head">Sign In</h2>
                <label className="user-label">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="signin-input"
                />

                <label className="user-label">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="signin-input"
                />

                <button type="submit" className="signin-button">Sign In</button>
                {message && <p className="signin-message">{message}</p>}

                
            </form>
            <p>Don't have an account?<Link className="link" to={'/'}>Signup</Link></p>
        </div>
    );
}
