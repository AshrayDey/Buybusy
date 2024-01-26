import React from 'react';
import styles from './signUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseinnit';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const { userList } = useAuth();
  const navigate = useNavigate();

  function handleSubmit() {
    document.signUpForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      };
      const index = userList.findIndex(user => user.email === data.email);
      if (index === -1) {
        addDoc(collection(db, 'Users'), {
          name: data.name,
          email: data.email,
          password: data.password,
          cart: []
        });
        toast.success(`User ${data.name} Created, Please LogIn to Continue!!`);
        navigate('/signin');
      } else {
        toast.error(`Email Address already exist, Try Again or SignIn Instead!!!`);
        navigate('/signup');
      }
    });
  }

  return (
    <div className={styles.container}>
      <form name="signUpForm">
        <h1>SIGN-UP</h1>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Password" required />
        <div>
          <input type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};
