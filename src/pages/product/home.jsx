import React from "react";

import LinkButton from "../../components/link-button";
import { reqGoodsList } from "../../api/index";
import { Card, Select, Table, Button, Icon, Input, message, Modal } from "antd";
const Option = Select.Option;

export default class ProductHome extends React.Component {
  state = {
    products: []
  };
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "goods_name",
        key: "goods_name"
      },
      // {
      //   title: "商品图片",
      //   dataIndex: "goods_picture",
      //   key: "goods_picture"
      // },

      {
        title: "商品类别",
        width: 100,
        dataIndex: "goods_type_name",
        key: "goods_type_name"
      },
      {
        title: "描述",
        dataIndex: "goods_description",
        key: "goods_description"
      },
      {
        title: "价格",
        dataIndex: "goods_price",
        key: "goods_price",
        render: goods_price => {
          return "¥" + goods_price;
        }
      },
      {
        title: "库存",
        width: 65,
        dataIndex: "stock",
        key: "stock"
      },
      {
        title: "操作",
        width: 150,
        render: product => (
          <span>
            <LinkButton
            // onClick={() => {
            //   this.showUpdate(category);
            // }}
            >
              修改
            </LinkButton>
            <LinkButton
            // onClick={() => {
            //   this.toProduct(category.goods_type_id);
            // }}
            >
              删除
            </LinkButton>
          </span>
        )
      }
    ];
  };

  getGoodsList = async () => {
    let data = {};
    const result = await reqGoodsList(data);
    if (result.code === 0) {
      this.setState({
        products: result.goodslist
      });
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getGoodsList();
  }

  render() {
    const { products } = this.state;

    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 150, margin: "0 15px" }} />
        <Button type="primary">搜索</Button>
      </span>
    );
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          dataSource={products}
          rowKey="goods_id"
          columns={this.columns}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true
          }}
        ></Table>
      </Card>
    );
  }
}
