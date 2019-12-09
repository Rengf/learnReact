import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductAddUpdate from "./add-update";

export default class Product extends React.Component {
  render() {
    return (
      <Switch>
        {/* exact路径完全匹配 */}
        <Route path="/goodslist" exact component={ProductHome}></Route>
        <Route path="/goodsdetail" exact component={ProductDetail}></Route>
        <Route
          path="/goodsaddupdate"
          exact
          component={ProductAddUpdate}
        ></Route>
        <Redirect to="/goodslist"></Redirect>
      </Switch>
    );
  }
}
