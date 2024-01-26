import React, { useRef } from 'react';
import styles from './SignIn.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/authContext';

export const SignIn = () => {
    const { signIn,userList } = useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    async function handleSubmit(event)  {
        event.preventDefault(); // Prevent the default form submission behavior

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
            
        };
        const status= signIn(data);
        {status?navigate("/"):navigate("/signin")};     
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>SIGN-IN</h1>
                <input type="email" placeholder="E-mail" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <div>
                    <input type="submit" value="Sign In" />
                </div>
                <NavLink to="/signup">
                    <h3>SignUp instead</h3>
                </NavLink>
            </form>
        </div>
    );
};
