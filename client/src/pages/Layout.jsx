import { Outlet, Link } from "react-router-dom";
import styles from "./css/Layout.module.css";

const Layout = () => {
  return (
    <>
      <nav className={styles.navigation}>
        <h1 className={styles.logoHeader}>
          <Link to="/">BAZAREK AGH</Link>
        </h1>
        <ul>
          <li className={styles.navElement}>
            <Link to="/login">Zaloguj</Link>
          </li>
          <li className={styles.navElement}>
            <Link to="/register">Zarejestruj się</Link>
          </li>
        </ul>
      </nav>

      <main className={styles.main}>
        <Outlet />
      </main>
      
      <footer className={styles.footer}>
        <p>
          Copyright &copy; Andrzej Janaszek — projekt na studia na przedmiot
          bazy danych
        </p>
      </footer>
    </>
  );
};

export default Layout;
