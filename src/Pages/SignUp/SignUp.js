import React, { useRef } from 'react'
import styles from './signUp.module.scss'
import { useAuth } from '../../Contexts/authContext'
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {

  const {signUp}=useAuth();
  const nameRef = useRef(null)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault()
    const data={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    console.log(data)
    const status=await signUp(data);
    {status?navigate("/"):nameRef.current.value=""}
  }

  return (
    <div className={styles.container}>
      <form   onSubmit={handleSubmit}>
        <h1>SIGN-UP</h1>
        <input type="text" placeholder='Name' ref={nameRef} required />
        <input type="email" placeholder='E-mail' ref={emailRef} required/>
        <input type="password" placeholder='Password' ref={passwordRef} required/>
        <div><input type="submit" /></div>
      </form>
    </div>
  )
}
