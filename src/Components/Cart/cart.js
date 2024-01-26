import { useProduct } from "../../Contexts/productContext";
import styles from "./cart.module.scss";

export const Cart = () => {
  const { cart, total, decrementQuant, incrementQuant, removeFromCart } =
    useProduct();
  return (
    <>
      <div className={styles.container1}>
        <table className={styles.table}>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.product}>
                  <img src={item.image} alt="" />
                  <div>
                    <p>{item.title}</p>
                    <small>Price: Rs.{item.price}</small>
                    <br />
                    <a onClick={() => removeFromCart(item)}>Remove</a>
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={styles.minus}
                  onClick={() => decrementQuant(item)}
                >
                  -
                </span>
                <input type="number" value={item.quantity} />
                <span
                  className={styles.plus}
                  onClick={() => incrementQuant(item)}
                >
                  +
                </span>
              </td>
              <td>Rs.{item.price * item.quantity}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.container2}>
        <table className={styles.table2}>
          <tr>
            <th>Subtotal:</th>
            <th>Rs. {total}</th>
          </tr>
          <tr>
            <th>Total:</th>
            <th>Rs. {total}</th>
          </tr>
        </table>
      </div>
      {cart.length > 0 ? (
        <div className={styles.checkout}>
          <button>CHECKOUT</button>
        </div>
      ) : null}
    </>
  );
};
