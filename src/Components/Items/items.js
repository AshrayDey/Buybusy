import React from 'react';
import styles from './items.module.scss';
import { useProduct } from '../../Contexts/ProductContext';
import { useAuth } from '../../Contexts/AuthContext';

export const Item = ({ item }) => {
  const { addToCart } = useProduct();
  const { currUser } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={item.image} alt="" />
      </div>

      <div className={styles.details}>
        <p>{item.title}</p>
        <div className={styles.itemprices}>Rs {item.price}</div>
        <button onClick={() => addToCart(item)}>ADD TO CART</button>
      </div>
    </div>
  );
};
