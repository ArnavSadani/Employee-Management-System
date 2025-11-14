import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider> 
  <AdminProvider>
    <App />
  </AdminProvider>
  </UserProvider>
);
