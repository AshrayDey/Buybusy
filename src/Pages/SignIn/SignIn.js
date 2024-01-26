import React from 'react';
import styles from './SignIn.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';

export const SignIn = () => {
  const { userList, updateAuthStore } = useAuth();
  const navigate = useNavigate();

  function handleSubmit() {
    document.signInForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = {
        email: event.target.email.value,
        password: event.target.password.value
      };
      const currentUser = userList.find(user => user.email === data.email);
      if (!currentUser) {
        toast.error('Email does not exist. Try again or sign up instead!');
        return;
      }
      if (currentUser.password === data.password) {
        updateAuthStore({
          loggedIn: true,
          currentUser
        });
        toast.success('Sign In Successful!');
        // Store user information in localStorage
        window.localStorage.setItem('isLoggedIn', true);
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
        navigate('/');
      } else {
        toast.error('Incorrect Email/Password. Please try again.');
        navigate('/signin');
      }
    });
  }

  return (
    <div className={styles.container}>
      <form name="signInForm">
        <h1>SIGN-IN</h1>
        <input name="email" type="email" placeholder="E-mail" />
        <input name="password" type="password" placeholder="Password" />
        <div>
          <input type="submit" value="Sign In" onClick={handleSubmit} />
        </div>
        <NavLink to="/signup">
          <h3>SignUp instead</h3>
        </NavLink>
      </form>
    </div>
  );
};
