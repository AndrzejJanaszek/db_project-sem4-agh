import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Outlet } from "react-router"

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LoginUser from "./pages/auth/LoginUser";
import LoginCompany from "./pages/auth/LoginCompany";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import RegisterUser from "./pages/auth/RegisterUser";
import RegisterCompany from "./pages/auth/RegisterCompany";
import Product from "./pages/shop/Product";
import Cart from "./pages/user/Cart";
import CompanyProductPanel from "./pages/company/Product";
import CompanyProductList from "./pages/company/ProductList";
import CompanyProductAdd from "./pages/company/ProductAdd";
import CompanySummaryPanel from "./pages/company/Summary";
import CompanyDataPanel from "./pages/company/DataPanel";
import CategoryPage from "./pages/shop/CategoryPage";
import CompanyDashboard from "./pages/company/Dashboard";
import UserDashboard from "./pages/user/Dashboard";


import RequireAuth from './components/RequireAuth';
import Search from "./pages/shop/Search";
import TransactionHistory from "./pages/user/TransactionHistory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" >
            <Route path="user" element={<LoginUser />} />
            <Route path="company" element={<LoginCompany />} />
          </Route>

          <Route path="register" >
            <Route index element={<Register />} />
            <Route path="user" element={<RegisterUser />} />
            <Route path="company" element={<RegisterCompany />} />
          </Route>

          <Route path="company" 
          element={
            <RequireAuth type="company">
              <Outlet />
            </RequireAuth>
          }>
            <Route index element={<CompanyDashboard />} />
            <Route path="summary" element={<CompanySummaryPanel />} />
            <Route path="data" element={<CompanyDataPanel />} />
            <Route path="product/:id" element={<CompanyProductPanel />} />
            <Route path="product/list" element={<CompanyProductList />} />
            <Route path="product/add" element={<CompanyProductAdd />} />
          </Route>

          <Route path="user" 
          element={
            <RequireAuth type="user">
              <Outlet />
            </RequireAuth>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route path="transactions" element={<TransactionHistory />} />
          </Route>

          <Route path="product" element={<Product />} />
          <Route path="category-page" element={<CategoryPage />} />
          <Route path="search" element={<Search></Search>} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
