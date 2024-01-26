import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Logo from '../Assets/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Contexts/authContext';
import { useProduct } from '../../Contexts/productContext';

export const Navbar = () => {
  const [active, setActive] = useState("active");
  const {loggedIn,setLoggedIn,logOut}= useAuth()
  const {itemInCart}=useProduct()
  console.log(itemInCart)
  return (
    <>
      <div className={styles.container}>
      <div className={styles.navLogo}>
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={styles.Menu}>
        <li ><NavLink to="/" >HOME 
        
        </NavLink> </li> 
        {loggedIn &&<li ><NavLink to="/orders">MY ORDERS</NavLink></li>}
        {loggedIn &&<li ><NavLink to="/cart" >CART </NavLink></li>}
      </ul>

      <div className={styles.logout}>
        {loggedIn?
          <>
          <div className={styles.logOut} onClick={logOut}>LOG OUT</div>
            <div className={styles.cartContainer}>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "aqua" }} />
            <span className={styles.count}>{itemInCart}</span>
          </div>
          </>
          :<NavLink to={"/signin"}><div className={styles.logOut}>Sign-In</div></NavLink>
          
        }
      </div>
    </div>
    <Outlet/>
    </>
    
  );
};
