import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import Leftnav from "../../components/left-nav/index.jsx";
import Header from "../../components/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Orders from "../orders/orders";

import { Layout } from "antd";

const { Footer, Sider, Content } = Layout;

export default class Admin extends React.Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user.user_id) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <Leftnav></Leftnav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin: "20px" }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/goods" component={Product}></Route>
              <Route path="/userlist" component={User}></Route>
              <Route path="/orderlist" component={Orders}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
