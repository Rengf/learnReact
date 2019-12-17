import React from "react";

import { Link, withRouter } from "react-router-dom";
import "./index.less";
import Logo from "../../assets/images/logo192.png";
import menuList from "../../config/menuConfig";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1146139_74e7ouf89em.js"
});

class leftNav extends React.Component {
  getMenuNodes_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <IconFont type={item.icon} />
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
                <IconFont type={item.icon} />
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
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <IconFont type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          this.openKey = item.key;
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <IconFont type={item.icon} />
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
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={Logo} alt="logo" />
          <h1>我的后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes_reduce(menuList)}
        </Menu>
      </div>
    );
  }
}
/*包装非路由组件 */
export default withRouter(leftNav);
