import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HomeContextProvider } from "./Context/HomeContext";

ReactDOM.render(
  <React.StrictMode>
    <HomeContextProvider>
      <App />
    </HomeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
