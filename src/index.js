import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/scenicSpot" />
      </Route>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
