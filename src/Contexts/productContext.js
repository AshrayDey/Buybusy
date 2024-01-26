// Toast Notify
import { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebaseinnit';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const producContext = createContext();

export const useProduct = () => {
  const value = useContext(producContext);
  return value;
};

export const ProductContextProvider = ({ children }) => {
  // user's login status and loggedIn user
  const { loggedIn, currentUser } = useAuth();
  // number of items in cart
  const [itemInCart, setItemInCart] = useState(0);
  // all products in cart
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (loggedIn) {
      const unsub = onSnapshot(doc(db, 'Users', currentUser.id), doc => {
        const userCart = doc.data().cart;
        setCart(userCart);

        let sum = 0;
        userCart.forEach(item => (sum += item.price * item.quantity));
        setTotal(sum);

        setItemInCart(userCart.length);
      });
      return () => unsub(); // Cleanup subscription when component unmounts
    }
  }, [loggedIn, currentUser, cart]);

  async function addToCart(product) {
    if (!loggedIn) {
      toast.error('Please first Login !!!');
      return;
    }
    const index = cart.findIndex(item => item.title === product.title);
    if (index !== -1) {
      incrementQuant(cart[index]);
      toast.success('Product Quantity Increased!!');
      return;
    }
    const userRef = doc(db, 'Users', currentUser.id);
    await updateDoc(userRef, {
      cart: [...cart, { quantity: 1, ...product }]
    });
    setCart(cart);
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);

    toast.success('Added to your Cart!!');
  }

  async function incrementQuant(product) {
    const index = cart.findIndex(item => item.title === product.title);
    cart[index].quantity++;
    setCart(cart);

    const userRef = doc(db, 'Users', currentUser.id);
    await updateDoc(userRef, { cart: cart });
    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }

  async function decrementQuant(product) {
    const index = cart.findIndex(item => item.title === product.title);
    setTotal(Number(total - cart[index].price));

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    setCart(cart);
    setItemInCart(itemInCart - 1);
  }

  async function removeFromCart(product) {
    const userRef = doc(db, 'Users', currentUser.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product)
    });
    setTotal(total - product.price * product.quantity);
    setItemInCart(itemInCart - product.quantity);
    toast.success('Removed from Cart!!');
  }

  function getDate() {
    // getting current date
    const date = new Date();
    // day
    let day = date.getDate();
    // month
    let month = date.getMonth() + 1;
    // year
    let year = date.getFullYear();

    // yy/mm/dd format
    return `${year}-${month}-${day}`;
  }

  // function to remove all product from cart
  //   async function clearCart() {
  //     // if no item in cart then return with message
  //     if (itemInCart === 0) {
  //       toast.error("Nothing to remove in Cart!!");
  //       return;
  //     }

  //     // empty cart array in database
  //     const userRef = doc(db, "Users", currUser.id);
  //     await updateDoc(userRef, {
  //       cart: [],
  //     });

  //     // set item count and total amount
  //     setTotal(0);
  //     setItemInCart(0);
  //     toast.success("Empty Cart!!");
  //   }

  //   async function purchaseAll() {
  //     const currentDate = getDate();
  //     // adding order to database
  //     const userRef = doc(db, "Users", currUser.id);
  //     await updateDoc(userRef, {
  //       orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
  //     });

  //     // empty cart
  //     clearCart();
  //   }
  return (
    <>
      <producContext.Provider
        value={{
          incrementQuant,
          decrementQuant,
          addToCart,
          itemInCart,
          cart,
          total,
          removeFromCart
        }}
      >
        {children}
        <ToastContainer />
      </producContext.Provider>
    </>
  );
};
