import React from "react";

import { Link } from "react-router-dom";
import "./index.less";
import Logo from "../../assets/images/logo192.png";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

export default class leftNav extends React.Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={Logo} alt="logo" />
          <h1>我的后台</h1>
        </Link>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Icon type="mail" />
              <span>分类管理</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="mail" />
              <span>商品管理</span>
            </Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
