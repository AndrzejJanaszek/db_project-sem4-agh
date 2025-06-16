import React, { useState, useEffect } from 'react';
import {
  getCompanyProfileData,
  updateCompanyData,
  updateCompanyPassword,
} from '../../api/company/api';

import styles from './css/DataPanel.module.css';

const DataPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    nip: '',
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
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyProfileData();
        console.log("data: ", data);

        setFormData({
          name: data.name || '',
          nip: data.nip || '',
          email: data.email || '',
          city: data.city || '',
          postcode: data.postcode || '',
          street: data.street || '',
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    fetchCompanyData();
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
      await updateCompanyData(formData);
      setMessage('Dane firmy zaktualizowane pomyślnie.');
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
      await updateCompanyPassword({ password: passwordData.password });
      setMessage('Hasło zmienione pomyślnie.');
      setPasswordData({ password: '', secPassword: '' });
    } catch (err) {
      setMessage(err.message || 'Błąd zmiany hasła.');
    }
  };

  return (
    <div className={styles.container}>
    <h2 className={styles.heading}>Zmiana danych firmy</h2>
    <form onSubmit={handleSubmitData} className={styles.form}>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="name">Nazwa firmy</label>
    <input id="name" name="name" value={formData.name} onChange={handleChange} className={styles.input} />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="nip">NIP</label>
    <input id="nip" name="nip" value={formData.nip} onChange={handleChange} className={styles.input} />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="email">Email</label>
    <input id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="city">Miasto</label>
    <input id="city" name="city" value={formData.city} onChange={handleChange} className={styles.input} />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="postcode">Kod pocztowy</label>
    <input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} className={styles.input} />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="street">Ulica</label>
    <input id="street" name="street" value={formData.street} onChange={handleChange} className={styles.input} />
  </div>
  <button type="submit" className={styles.button}>Zapisz zmiany</button>
</form>

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

export default DataPanel;
