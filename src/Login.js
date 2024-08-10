// Login.js
import React, { useState } from 'react';
import { auth, sendSignInLinkToEmail } from './firebase';

function Login() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000', // URL you want to redirect back to
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        alert('Login link sent to your email.');
      })
      .catch((error) => {
        console.error('Error sending email', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login with Email</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          placeholder="Enter your email" 
          required 
        />
        <button type="submit">Send Login Link</button>
      </form>
    </div>
  );
}

export default Login;
