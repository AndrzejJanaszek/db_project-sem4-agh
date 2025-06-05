import styles from "./css/Layout.module.css";
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let userType = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userType = payload.type;
    } catch (err) {
      console.error("Błędny token:", err);
      localStorage.removeItem('token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/user');
  };

  return (
    <>
      <nav className={styles.navigation}>
        <h1 className={styles.logoHeader}>
          <Link to="/">BAZAREK AGH</Link>
        </h1>
        <ul>
          {!token ? (
            <>
              <li className={styles.navElement}>
                <Link to="/login/user">Zaloguj użytkownik</Link>
              </li>
              <li className={styles.navElement}>
                <Link to="/login/company">Zaloguj firma</Link>
              </li>
              <li className={styles.navElement}>
                <Link to="/register">Zarejestruj się</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navElement}>
                {userType === "user" && (
                  <>
                    <p>Konto użytkownika</p>
                    <Link to="/user">Panel</Link>
                  </>
                )}
                {userType === "company" && (
                  <>
                    <p>Konto firmowe</p>
                    <Link to="/company">Panel</Link>
                  </>
                )}
              </li>
              <li className={styles.navElement}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Wyloguj
                </button>
              </li>
            </>
          )}
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
