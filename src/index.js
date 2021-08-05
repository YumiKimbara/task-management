import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import AppRouter from "./Router/Router";
import App from "./App";
import { ListContextProvider } from "./Context/ListContext";

ReactDOM.render(
  <React.StrictMode>
    <ListContextProvider>
      <App />
    </ListContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
