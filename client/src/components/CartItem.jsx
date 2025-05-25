import React from "react";
import styles from "../pages/userActions/css/Cart.module.css"

const CartItem = ({img, name, amount, price, currency}) => {
  return (
    <div className={styles.cartItem}>
      <img src={img} alt="" className={styles.cartItemImage} />
      <div className={styles.cartItemDescription}>
        <h3>{name}</h3>
      </div>
      <div className={styles.cartItemPanel}>
        <button className="btnGrey">-</button>
        <div className={styles.amount}>
          <span>{amount}</span>
          <span>szt.</span>
        </div>
        <button className="btnGrey">+</button>
        <button className="btnRed">X</button>
        <div className={styles.cartItemPanelPrice}>
            <span className={styles.cartItemPanelPriceValue}>{price*amount}</span>
            <span className={styles.cartItemPanelPriceCurrency}>{currency}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
