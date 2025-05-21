import React from "react";
import { Outlet, Link } from "react-router-dom";

import style from "./css/login.module.css";

const RegisterCompany = () => {
  return (
    <div className={style.loginContainer}>
      <form action="" className={style.loginForm}>
        <div className={style.registerSideDivider}>
          <section>
            <h3>Dane i hasło</h3>
            <label className={style.loginFormLabel}>
              <p>nazwa firmy:</p>
              <input type="text" />
            </label>
            <label className={style.loginFormLabel}>
              <p>NIP:</p>
              <input type="text" />
            </label>
            <label className={style.loginFormLabel}>
              <p>email:</p>
              <input type="email" />
            </label>
            <label className={style.loginFormLabel}>
              <p>hasło</p>
              <input type="password" />
            </label>
            <label className={style.loginFormLabel}>
              <p>powtórz hasło</p>
              <input type="password" />
            </label>
          </section>
          <section>
            <h3>Adres</h3>
            <label className={style.loginFormLabel}>
              <p>miasto</p>
              <input type="text" />
            </label>
            <label className={style.loginFormLabel}>
              <p>ulica</p>
              <input type="text" />
            </label>
            <label className={style.loginFormLabel}>
              <p>kod pocztowy</p>
              <input type="text" />
            </label>
          </section>
        </div>
        <button className="btnGreen">Zarejestruj</button>
        <Link to="/register" className={style.registerBack}>&lt;&lt; cofnij &gt;&gt;</Link>
      </form>
    </div>
  );
};

export default RegisterCompany;
