import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./Router/Router";
import { ListContextProvider } from "./Context/ListContext";

ReactDOM.render(
  <React.StrictMode>
    <ListContextProvider>
      <AppRouter />
    </ListContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
