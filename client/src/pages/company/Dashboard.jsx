import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Panel Firmy</h2>
      <ul>
        <li>
          <Link to="/company/add-product">Dodaj produkt</Link>
        </li>
        <li>
          <Link to="/company/edit">Zmień dane firmy</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
