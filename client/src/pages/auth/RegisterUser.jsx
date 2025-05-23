import React from "react";
import { Outlet, Link } from "react-router-dom";

import style from "./css/login.module.css";

const RegisterUser = () => {
  return (
    <div className={style.loginContainer}>
      <form action="" method='post' className={style.loginForm}>
        <div className={style.registerSideDivider}>
          <section>
            <h3>Dane i hasło</h3>
            <label className={style.loginFormLabel}>
              <p>imie:</p>
              <input type="text" name="name"/>
            </label>
            <label className={style.loginFormLabel}>
              <p>nazwisko:</p>
              <input type="text" name="surname"/>
            </label>
            <label className={style.loginFormLabel}>
              <p>email:</p>
              <input type="email" name="email"/>
            </label>

            <label className={style.loginFormLabel}>
              <p>hasło</p>
              <input type="password" name="password"/>
            </label>
            <label className={style.loginFormLabel}>
              <p>powtórz hasło</p>
              <input type="password" name="secPassword"/>
            </label>
          </section>

          <section>
            <h3>Adres</h3>
            <label className={style.loginFormLabel}>
              <p>miasto</p>
              <input type="text" name="city"/>
            </label>
            <label className={style.loginFormLabel}>
              <p>ulica</p>
              <input type="text" name="street"/>
            </label>
            <label className={style.loginFormLabel}>
              <p>kod pocztowy</p>
              <input type="text" name="postcode"/>
            </label>
          </section>
        </div>

        <button className="btnGreen" type="submit">Zarejestruj</button>
        <Link to="/register" className={style.registerBack}>&lt;&lt; cofnij &gt;&gt;</Link>
      </form>
    </div>
  );
};

export default RegisterUser;
