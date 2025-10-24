import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
 import Income from "./pages/Income";
 import Expense from "./pages/Expense";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/income"
          element={
            <PrivateRoutes>
              <Income />
            </PrivateRoutes>
          }
        />
        {/* <Route
          path="/income/:id"
          element={
            <PrivateRoutes>
              <EditIncomeModal />
            </PrivateRoutes>
          }
        /> */}
        <Route
          path="/expense"
          element={
            <PrivateRoutes>
              <Expense />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
