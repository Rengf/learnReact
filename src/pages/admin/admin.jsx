import React from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import Leftnav from "../../components/left-nav/index.jsx";
import MyHeader from "../../components/header";

import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
          <Header>
            <MyHeader></MyHeader>
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
