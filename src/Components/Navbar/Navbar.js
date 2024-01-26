import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Logo from '../Assets/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';
import { useProduct } from '../../Contexts/ProductContext';
import { useAuth } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const { loggedIn, updateAuthStore } = useAuth();
  const { itemInCart } = useProduct();

  function handleLogOut() {
    updateAuthStore({
      loggedIn: false,
      currentUser: undefined
    });
    localStorage.clear();
    toast.success('Log Out Successfully!!!!');
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navLogo}>
          <img src={Logo} alt="Logo" />
        </div>
        <ul className={styles.Menu}>
          <li>
            <NavLink to="/">HOME</NavLink>{' '}
          </li>
          {loggedIn && (
            <li>
              <NavLink to="/orders">MY ORDERS</NavLink>
            </li>
          )}
          {loggedIn && (
            <li>
              <NavLink to="/cart">CART </NavLink>
            </li>
          )}
        </ul>

        <div className={styles.logout}>
          {loggedIn ? (
            <>
              <div className={styles.logOut} onClick={handleLogOut}>
                LOG OUT
              </div>
              <div className={styles.cartContainer}>
                <FontAwesomeIcon icon={faCartShopping} style={{ color: 'aqua' }} />
                <span className={styles.count}>{itemInCart}</span>
              </div>
            </>
          ) : (
            <NavLink to={'/signin'}>
              <div className={styles.logOut}>Sign-In</div>
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
