import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductAddUpdate from "./add-update";
import "./product.less";

export default class Product extends React.Component {
  render() {
    return (
      <Switch>
        {/* exact路径完全匹配 */}
        <Route path="/goods/goodslist" exact component={ProductHome}></Route>
        <Route
          path="/goods/goodsdetail"
          exact
          component={ProductDetail}
        ></Route>
        <Route
          path="/goods/goodsaddupdate"
          exact
          component={ProductAddUpdate}
        ></Route>
        <Redirect to="/goods/goodslist"></Redirect>
      </Switch>
    );
  }
}
