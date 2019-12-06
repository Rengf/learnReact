import React from "react";
import PropTypes from "prop-types";

import { Form, Select, Input } from "antd";

const Item = Form.Item;

class UpdateForm extends React.Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Item>
          {getFieldDecorator("goods_type_name", {
            initialValue: categoryName
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
