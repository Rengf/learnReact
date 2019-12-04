import React from "react";
import { withRouter } from "react-router-dom";
import "./index.less";
import Logo from "../../assets/images/logo192.png";
import { dateFormat } from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button";

import { Modal } from "antd";
const { confirm } = Modal;
class header extends React.Component {
  state = {
    currentTime: dateFormat(Date.now(), "yyyy-MM-dd HH:mm:ss"),
    dayPictureUrl: "",
    weather: ""
  };

  getTime = () => {
    this.interval = setInterval(() => {
      const currentTime = dateFormat(Date.now(), "yyyy-MM-dd HH:mm:ss");
      this.setState({ currentTime });
    }, 1000);
  };

  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logout = () => {
    confirm({
      content: "确定退出吗？",
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
      onCancel: () => {
        console.log("Cancel");
      }
    });
  };
  componentDidMount() {
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const username = memoryUtils.user.user_name;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}！</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={Logo} alt="tupian" />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(header);
