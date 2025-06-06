import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./css/Dashboard.module.css"

const Dashboard = () => {
  return (
    <div>
      <h2>Panel Firmy</h2>
      <section className={styles.section}>
        <div className={styles.sectionItem}><Link to="/company/product/add">Dodaj produkt</Link></div>
        <div className={styles.sectionItem}><Link to="/company/product/list">Lista produktów</Link></div>
        <div className={styles.sectionItem}><Link to="/company/summary">Podsumowanie</Link></div>
        <div className={styles.sectionItem}><Link to="/company/data">Dane</Link></div>
      </section>
    </div>
  );
};

export default Dashboard;
