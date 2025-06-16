import React, { useEffect, useState } from 'react';
import {
  getUserProfileData,
  updateUserData,
  updateUserPassword,
} from '../../api/user/api';
import styles from './css/DataPanel.module.css';

const UserDataPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    city: '',
    postcode: '',
    street: '',
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    secPassword: '',
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfileData();
        setFormData({
          name: data.name || '',
          surname: data.surname || '',
          email: data.email || '',
          city: data.city || '',
          postcode: data.postcode || '',
          street: data.street || '',
        });
      } catch (err) {
        setMessage(err.message || 'Błąd ładowania danych.');
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await updateUserData(formData);
      setMessage('Dane użytkownika zaktualizowane pomyślnie.');
    } catch (err) {
      setMessage(err.message || 'Błąd aktualizacji danych.');
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (passwordData.password !== passwordData.secPassword) {
      setMessage('Hasła nie są zgodne.');
      return;
    }

    try {
      await updateUserPassword({ password: passwordData.password });
      setMessage('Hasło zmienione pomyślnie.');
      setPasswordData({ password: '', secPassword: '' });
    } catch (err) {
      setMessage(err.message || 'Błąd zmiany hasła.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Dane użytkownika</h2>
      <form onSubmit={handleSubmitData} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Imię</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="surname">Nazwisko</label>
          <input
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="city">Miasto</label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="postcode">Kod pocztowy</label>
          <input
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="street">Ulica</label>
          <input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Zapisz zmiany</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Zmiana hasła</h2>
      <form onSubmit={handleSubmitPassword} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Nowe hasło</label>
          <input
            id="password"
            name="password"
            type="password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="secPassword">Powtórz hasło</label>
          <input
            id="secPassword"
            name="secPassword"
            type="password"
            value={passwordData.secPassword}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Zmień hasło</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default UserDataPanel;
