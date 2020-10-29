import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "regenerator-runtime/runtime.js";
var init = require("./sys/init");
init.init();
ReactDOM.render(<App />, document.getElementById("root"));