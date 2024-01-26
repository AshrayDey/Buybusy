import styles from "./orders.module.scss"

export const Orders =()=>{
    return(
        <div>
        <h1>Purchased on </h1>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Items</th>
              <th>Payment Method</th>
              <th>Total Price</th> {/* Add a new column for Total Price */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="" alt="No Image" />
              </td>
              <td>Pay on delivery</td>
              <td>$100.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}