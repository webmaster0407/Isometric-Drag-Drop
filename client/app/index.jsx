import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { render } from "react-dom";
import App from "./components/App/App";
import "./styles/styles.css";

render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
