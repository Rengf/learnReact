import React from "react";
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";

import App from "./App.js";
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(<App> </App>, document.getElementById("root"));
