import { Outlet, Link } from "react-router-dom";

import "./css/Layout.css";

const Layout = () => {
  return (
    <>
      <nav className="navigation">
        <h1>
          <a href="/">
          BAZAREK <p className="agh-green">A</p>
          <p className="agh-black">G</p>
          <p className="agh-red">H</p>
          </a>
        </h1>
        <ul>
          <li className="nav-element">
            <Link to="/login">Zaloguj</Link>
          </li>
          <li className="nav-element">
            <Link to="/register">Zarejestruj się</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <footer>
        <p>
          Copyright &copy; Andrzej Janaszek - projekt na studia na przedmiot
          bazy danych
        </p>
      </footer>
    </>
  );
};

export default Layout;
