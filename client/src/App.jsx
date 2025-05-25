import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import RegisterUser from "./pages/auth/RegisterUser";
import RegisterCompany from "./pages/auth/RegisterCompany";
import Product from "./pages/shop/Product";
import Cart from "./pages/userActions/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />

          <Route path="register" >
            <Route index element={<Register />} />
            <Route path="user" element={<RegisterUser />} />
            <Route path="company" element={<RegisterCompany />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
