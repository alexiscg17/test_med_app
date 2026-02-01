import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="container">
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?{" "}
          <span>
            <a href="/login" style={{ color: "#2190FF" }}>
              Login
            </a>
          </span>
        </div>

        <div className="signup-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
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
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}" // exactly 10 digits
                title="Phone number must be 10 digits"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
              />
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
