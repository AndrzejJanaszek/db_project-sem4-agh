import React from "react";

import style from "./css/login.module.css";

const Register = () => {
  return (
    <div className={style.registerTileConainer}>
      <a href="/register/user" className={style.registerTile}>
        <h3>Utwórz zwykłe konto</h3>
        <p>chce kupować</p>
      </a>
      <a href="/register/company" className={style.registerTile}>
        <h3>Utwórz konto firmowe</h3>
        <p>chce sprzedawać</p>
      </a>
    </div>
  );
};

export default Register;
