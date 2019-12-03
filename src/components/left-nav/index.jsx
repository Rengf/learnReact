import React from "react";

import { Link } from "react-router-dom";
import "./index.less";
import Logo from "../../assets/images/logo192.png";
import menuList from "../../config/menuConfig";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

export default class leftNav extends React.Component {
  getMenuNodes_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  };

  getMenuNodes_reduce = menuList => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={Logo} alt="logo" />
          <h1>我的后台</h1>
        </Link>
        <Menu mode="inline" theme="dark">
          {this.getMenuNodes_reduce(menuList)}

          {/* <Menu.Item key="1">
            <Link to="/home">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
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
              <Link to="/category">
                <Icon type="mail" />
                <span>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="product">
                <Icon type="mail" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="7">
            <Link to="/user">
              <Icon type="pie-chart" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/role">
              <Icon type="pie-chart" />
              <span>权限管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>图表</span>
              </span>
            }
          >
            <Menu.Item key="9">
              <Link to="/charts/bar">
                <Icon type="mail" />
                <span>柱状图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/charts/line">
                <Icon type="mail" />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/charts/pie">
                <Icon type="mail" />
                <span>饼状图</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}
