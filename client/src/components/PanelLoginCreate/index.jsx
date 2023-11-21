import React, { useState } from "react";
import "./SignInSignUp.css"; // Import your CSS styles

export default function SignInSignUp() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <div
      className={`container ${rightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>

            <button
              className="ghost"
              id="signIn"
              onClick={() => setRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost"
              id="signUp"
              onClick={() => setRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
