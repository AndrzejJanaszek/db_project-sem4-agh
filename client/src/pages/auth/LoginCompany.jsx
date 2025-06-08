import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './css/login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // TODO: błędy validacji z backendu
      if (!res.ok) {
        throw new Error(`Błąd serwera: ${res.status}`);
      }

      const data = await res.json();

      // Zakładamy, że serwer zwraca token w `data.token`
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        console.error('Brak tokenu w odpowiedzi serwera');
      }

    } catch (error) {
      console.error('Błąd logowania:', error.message);
    }
  };


  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <label htmlFor="email" className={style.loginFormLabel}>
          <p>email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className={style.loginFormLabel}>
          <p>hasło</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button className='btnGreen' type='submit'>Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
