import React, { useState } from 'react';
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Navigation hook from react-router

    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (!response.ok && json.error) {
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
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?{" "}
          <span>
            <Link to="/login" style={{ color: "#2190FF" }}>
              Login
            </Link>
          </span>
        </div>

        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                minLength={2} // must be at least 2 characters
                maxLength={50} // limit to 50 characters
                pattern="[A-Za-z\s]+" // only letters and spaces
                title="Name should contain only letters"
              />
              {errors.name && <div className="err" style={{ color: 'red' }}>{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}" // exactly 10 digits
                title="Phone number must be 10 digits"
              />
              {errors.phone && <div className="err" style={{ color: 'red' }}>{errors.phone}</div>}
            </div>

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
                required
                className="form-control"
                placeholder="Enter your password"
              />
              {errors.password && <div className="err" style={{ color: 'red' }}>{errors.password}</div>}
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">
                Submit
              </button>
              <button type="reset" className="btn btn-danger mb-2">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
