import React from "react";
// import
import { Card, Icon, Button, message, Form, Input, Select } from "antd";
// import {  reqAddCategory } from "../../api/index";

import LinkButton from "../../components/link-button";
import Upload from "../../components/upload/index.jsx";
import RichTextEditor from "../../components/rich-text-editor/index.jsx";
import { reqCategoryList, reqAddGoods } from "../../api/index";
import memoryUtils from "../../utils/memoryUtils";

const Item = Form.Item;
const Option = Select.Option;
class ProductAddUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      files: {},
      goods_description: ""
    };
  }

  getCategorys = async () => {
    const result = await reqCategoryList();
    if (result.code === 0) {
      const categorys = result.categorylist;
      this.setState({
        categorys
      });
    }
  };

  validatorPrice = (rule, value, callback) => {
    if (value === "") {
      callback("价格必须输入！");
    } else if (value * 1 < 0) {
      callback("价格必须大于0！");
    } else {
      callback();
    }
  };

  addGoods = async event => {
    event.preventDefault();
    const { files, goods_description } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { goods_name, goods_price, goods_type_id } = values;
        var formData = new FormData();
        formData.append("files", files);
        formData.append("goods_name", goods_name);
        formData.append("goods_price", goods_price);
        formData.append("goods_type_id", goods_type_id);
        formData.append("goods_description", goods_description);
        formData.append("stock", 0);
        const result = await reqAddGoods(formData);
        console.log(result);
        if (result.code == 0) {
          message.success(result.message);
          this.props.history.replace("/goods/goodslist");
        } else {
          message.error(result.message);
        }
      }
    });
  };

  updateGoods = () => {
    console.log("fakjsdf");
  };

  getfile = e => {
    this.setState({
      files: e
    });
  };

  getTexts = text => {
    this.setState({
      goods_description: text
    });
    console.log("Fasdfasd", text);
  };

  componentWillMount() {
    this.product = memoryUtils.product;
    this.isUpdate = !!this.product.goods_id;
  }

  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const { categorys } = this.state;
    const { isUpdate, product } = this;
    const { getFieldDecorator } = this.props.form;

    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );

    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    };

    return (
      <Card title={title} className="detail">
        <Form {...formLayout}>
          <Item label="商品名称">
            {getFieldDecorator("goods_name", {
              initialValue: product.goods_name,
              rules: [{ required: true, message: "请输入" }]
            })(<Input placeholder="商品名称" />)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("goods_price", {
              initialValue: product.goods_price,
              rules: [
                { validator: this.validatorPrice },
                { required: true, message: "请输入" }
              ]
            })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("goods_type_id", {
              initialValue: product.goods_type_id || "",
              rules: [{ required: true, message: "请选择商品类别" }]
            })(
              <Select>
                <option value="">请选择</option>
                {categorys.map(c => (
                  <Option value={c.goods_type_id} key={c.goods_type_id}>
                    {c.goods_type_name}
                  </Option>
                ))}
              </Select>
            )}
          </Item>
          <Item label="商品图片">
            <Upload
              getFiles={this.getfile.bind(this)}
              imgs={product.goods_picture}
            ></Upload>
          </Item>
          <Item label="商品描述" wrapperCol={{ span: 20 }}>
            <RichTextEditor
              detail={product.goods_description}
              getText={this.getTexts.bind(this)}
            ></RichTextEditor>
          </Item>
          <Item label="提交">
            <Button
              type="primary"
              htmlType="submit"
              onClick={isUpdate ? this.updateGoods : this.addGoods}
            >
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);
