import React from 'react';
import "./Login.css";

const Login = () => {
    return (
        <div className="container">
            <div className="login-grid">
                <div className="login-text">
                    <h1>Login</h1>
                </div>
                <div className="login-text1">
                    Are you a new member? <span><a href="signup" style={{color: "#2190FF"}}> Sign Up Here</a></span>
                </div>
                <br />
                <div className="login-form">
                    <form>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="form-control"
                                placeholder="Enter your email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address"
                            />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input
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