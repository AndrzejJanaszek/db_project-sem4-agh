import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "./css/login.module.css";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    nip: "",
    email: "",
    password: "",
    secPassword: "",
    city: "",
    street: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

   // Obsługa submit formy
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Błąd: " + (errorData.message || res.statusText));
        return;
      }

      const data = await res.json();
      alert("Rejestracja zakończona sukcesem!");
      // tutaj można przekierować użytkownika albo wyczyścić formularz
    } catch (err) {
      alert("Wystąpił błąd: " + err.message);
    }
  };

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <div className={style.registerSideDivider}>
          <section>
            <h3>Dane i hasło</h3>
            <label className={style.loginFormLabel}>
              <p>nazwa firmy:</p>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>NIP:</p>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>email:</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>hasło</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>powtórz hasło</p>
              <input
                type="password"
                name="secPassword"
                value={formData.secPassword}
                onChange={handleChange}
              />
            </label>
          </section>
          <section>
            <h3>Adres</h3>
            <label className={style.loginFormLabel}>
              <p>miasto</p>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>ulica</p>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </label>
            <label className={style.loginFormLabel}>
              <p>kod pocztowy</p>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
              />
            </label>
          </section>
        </div>
        <button className="btnGreen" type="submit">Zarejestruj</button>
        <Link to="/register" className={style.registerBack}>&lt;&lt; cofnij &gt;&gt;</Link>
      </form>
    </div>
  );
};

export default RegisterCompany;
