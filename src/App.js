// App.js
import React, { useEffect } from 'react';
import { auth, isSignInWithEmailLink, signInWithEmailLink } from './firebase';
import Login from './Login';
import './App.css';

function App() {
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          alert('Login successful!');
        })
        .catch((error) => {
          console.error('Error signing in with email link', error);
        });
    }
  }, []);

  return (
    <div className="app-container">
      <h1>Firebase Authentication with React</h1>
      <Login />
    </div>
  );
}

export default App;
