import React from "react";
import { reqLogin, reqCaptcha } from "../../api";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Col, Row, message } from "antd";

import "./login.less";
import logo from "../../assets/images/logo192.png";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
/*登录路由组件 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    //对所有表单字段进行验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await reqLogin(values);
        if (result.code == 0) {
          message.success("登录成功");
          const user = result.user;
          memoryUtils.user = user;
          storageUtils.saveUser(user);
          this.props.history.replace("/");
        } else {
          this.getCaptcha();
          message.error("登录失败");
        }
        // reqLogin(values);
      } else {
        console.log(err);
      }
    });
  };

  getCaptcha = () => {
    reqCaptcha()
      .then(res => {
        this.setState({
          content: res.result.img
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const user = memoryUtils.user;
    if (!user || user.user_id) {
      return <Redirect to="/"></Redirect>;
    }
    const form = this.props.form;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "请输入账号" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                //声明式验证
                rules: [
                  { required: true, message: "请输入密码" },
                  { min: 6, message: "密码必须大于6位" },
                  { max: 20, message: "密码不能大于20位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <span
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            ></span>
            <Form.Item label="验证码" extra="验证码必须输入">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("captcha", {
                    rules: [
                      {
                        required: true,
                        message: "请输入验证码！"
                      }
                    ]
                  })(<Input />)}
                </Col>
                <Col span={12}>
                  <Button onClick={this.getCaptcha}>刷新验证码</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrapLogin = Form.create()(Login);
export default WrapLogin;
