import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import OrderHome from "./home";
import OrderDetail from "./detail";
// import OrderAddUpdate from "./add-update";

export default class Orders extends React.Component {
  render() {
    return (
      <Switch>
        {/* exact路径完全匹配 */}
        <Route path="/orderlist" exact component={OrderHome}></Route>
        <Route path="/orderdetail" exact component={OrderDetail}></Route>
        <Redirect to="/orderlist"></Redirect>
      </Switch>
    );
  }
}
