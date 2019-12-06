import React from "react";
import PropTypes from "prop-types";

import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends React.Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            rules: [{ required: true, message: "请输入分类名称" }]
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
