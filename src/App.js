import React from "react";
import AppRouter from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="main-app">
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
