import React, { useState, useEffect } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
          // If authentication token is received, store it in session storage
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('email', email);
          // Redirect to home page and reload the window
          navigate('/');
          window.location.reload();
        } else {
          // Handle errors if authentication fails
            if (!res.ok && json.error) {
                const fieldErrors = {};
                json.error.forEach(err => {
                    fieldErrors[err.param] = err.msg;
                });
                setErrors(fieldErrors);
                return;
            }
        }
    };

    return (
        <div className="container">
            <div className="login-grid">
                <div className="login-text">
                    <h1>Login</h1>
                </div>
                <div className="login-text1">
                    Are you a new member? <span><Link to="/signup" style={{color: "#2190FF"}}> Sign Up Here</Link></span>
                </div>
                <br />
                <div className="login-form">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="form-control"
                                placeholder="Enter your email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address"
                            />
                        {errors.email && <div className="err" style={{ color: 'red' }}>{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                aria-describedby="helpId"
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                        <br />

                        <div className="login-text">
                            Forgot Password?
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;