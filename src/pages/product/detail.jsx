import React from "react";
// import
import { Card, Icon, message, List } from "antd";
import LinkButton from "../../components/link-button";

// import {  reqAddCategory } from "../../api/index";
const Item = List.Item;

export default class ProductDetail extends React.Component {
  render() {
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">商品名称：</span>
            <span>fasjdhaskd</span>
          </Item>
        </List>
      </Card>
    );
  }
}
