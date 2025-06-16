import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Panel Firmy</h2>
      <ul>
        <li>
          <Link to="/user/cart">Koszyk</Link>
        </li>
        <li>
          <Link to="/user/data">Zmień dane użytkownika</Link>
        </li>
        <li>
          <Link to="/user/transactions">historia transakcji</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
