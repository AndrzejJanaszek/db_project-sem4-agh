import React from "react";
import styles from "./css/Cart.module.css";
import formStyle from "../auth/css/login.module.css";
import CartItem from "../../components/CartItem";

import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <section className={styles.cartContainer}>
      <div className={styles.cart}>
        <h1 className={styles.cartHeader}>Koszyk</h1>
        <CartItem img={"laptop_1.png"} name={"Jakaś fajna nazwa laptopik fajniusi bajerek"} amount={1} price={4099.99} currency={"zł"}></CartItem>
        <CartItem img={"laptop_1.png"} name={"Jakaś fajna nazwa laptopik fajniusi bajerek"} amount={2} price={4099.99} currency={"zł"}></CartItem>
        <CartItem img={"laptop_1.png"} name={"Jakaś fajna nazwa laptopik fajniusi bajerek"} amount={3} price={4099.99} currency={"zł"}></CartItem>
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.cartSummaryItem}>
            <span>Ilość produktów:</span>
            <span>6</span>
        </div>
        <div className={styles.cartSummaryItem}>
            <span>Łączna kwota:</span>
            <span>{4099.99*6}</span>
            <span>{"zł"}</span>
        </div>
      </div>
      
      <form action="">
        <section>
            <h3>Adres dostawy</h3>
            <label className={formStyle.loginFormLabel}>
              <p>miasto</p>
              <input type="text" name="city"/>
            </label>
            <label className={formStyle.loginFormLabel}>
              <p>ulica</p>
              <input type="text" name="street"/>
            </label>
            <label className={formStyle.loginFormLabel}>
              <p>kod pocztowy</p>
              <input type="text" name="postcode"/>
            </label>
          </section>
      </form>

      <button className="btnGreen">Dokonaj zakupy</button>
    </section>
  );
};

export default Cart;
