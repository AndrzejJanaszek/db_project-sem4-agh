import React from "react";
import styles from "../pages/user/css/Cart.module.css";

const CartItem = ({
  img,
  name,
  amount,
  price,
  currency,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <div className={styles.cartItem}>
      <img src={img} alt={name} className={styles.cartItemImage} />
      
      <div className={styles.cartItemDescription}>
        <h3>{name}</h3>
      </div>
      
      <div className={styles.cartItemPanel}>
        <button className="btnGrey" onClick={onDecrease}>-</button>
        
        <div className={styles.amount}>
          <span>{amount}</span>
          <span>szt.</span>
        </div>
        
        <button className="btnGrey" onClick={onIncrease}>+</button>
        
        <button className="btnRed" onClick={onRemove}>X</button>
        
        <div className={styles.cartItemPanelPrice}>
          <span className={styles.cartItemPanelPriceValue}>
            {(price * amount).toFixed(2)}
          </span>
          <span className={styles.cartItemPanelPriceCurrency}>{currency}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
