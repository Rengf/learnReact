import React from "react";

import LinkButton from "../../components/link-button";
import { reqOrderList } from "../../api/index";
import { dateFormat } from "../../utils/dateUtils";
import "./orders.less";
import { Card, Select, Table, Button, Icon, Input, message, Modal } from "antd";
const Option = Select.Option;

export default class OrderHome extends React.Component {
  state = {
    orderCount: 0,
    orderlists: [],
    page: 0,
    pagesize: 10
  };
  initColumns = () => {
    this.columns = [
      {
        title: "订单号",
        width: 150,
        dataIndex: "order_no",
        key: "order_no"
      },

      {
        title: "客户",
        width: 150,
        dataIndex: "user_name",
        key: "user_name",
        render: user_name => {
          return user_name || "线下客户";
        }
      },
      {
        title: "订单状态",
        width: 100,
        dataIndex: "order_status",
        key: "order_status",
        render: order_status => {
          return order_status == "0"
            ? "未付款"
            : order_status == "1"
            ? "已付款"
            : order_status == 2
            ? "已发货"
            : "其他";
        }
      },

      {
        title: "销售途径",
        width: 100,
        dataIndex: "sales_way",
        key: "sales_way",
        render: sales_way => {
          return sales_way == "0" ? "线上购买" : "线下购买";
        }
      },
      {
        title: "商品名",
        width: 150,
        dataIndex: "goods_name",
        key: "goods_name"
      },
      {
        title: "数量",
        width: 65,
        dataIndex: "product_count",
        key: "product_count"
      },
      {
        title: "产品总价",
        width: 85,
        dataIndex: "product_amount_total",
        key: "product_amount_total",
        render: goods_price => {
          return "¥" + goods_price;
        }
      },
      {
        title: "支付金额",
        width: 85,
        dataIndex: "order_amount_total",
        key: "order_amount_total",
        render: goods_price => {
          return "¥" + goods_price;
        }
      },
      {
        title: "快递",
        width: 65,
        dataIndex: "logistics",
        key: "logistics",
        render: logistics => {
          return logistics || "自取";
        }
      },
      {
        title: "运费",
        width: 65,
        dataIndex: "logistics_fee",
        key: "logistics_fee",
        render: goods_price => {
          return goods_price ? "¥" + goods_price : 0;
        }
      },
      {
        title: "发票",
        width: 65,
        dataIndex: "invoice",
        key: "invoice",
        render: invoice => {
          return invoice || "否";
        }
      },
      {
        title: "收货地址",
        width: 200,
        dataIndex: "province",
        key: "address",
        render: province => {
          return province;
        }
      },
      {
        title: "支付渠道",
        width: 90,
        dataIndex: "pay_channel",
        key: "pay_channel"
      },
      {
        title: "下单时间",
        width: 170,
        dataIndex: "addorder_time",
        key: "addorder_time",
        render: time => {
          return dateFormat(time, "yyyy-MM-dd HH:mm:ss");
        }
      },
      {
        title: "备注",
        width: 65,
        dataIndex: "user_remarks",
        key: "user_remarks"
      },
      {
        title: "操作",
        width: 120,
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

  getOrderList = async (limit = 10, pages = 0) => {
    let data = {
      limit: limit,
      pages: pages
    };
    const result = await reqOrderList(data);
    if (result.code === 0) {
      this.setState({
        orderCount: result.orderlist.count,
        orderlists: result.orderlist.data
      });
    }
  };

  pageChange = page => {
    this.getOrderList(page.pageSize, (page.current - 1) * page.pageSize);
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getOrderList();
  }

  render() {
    const { orderlists, orderCount } = this.state;

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
          className="orderTable"
          bordered
          dataSource={orderlists}
          rowKey="order_id"
          columns={this.columns}
          pagination={{
            showQuickJumper: true,
            total: orderCount
          }}
          onChange={this.pageChange}
        ></Table>
      </Card>
    );
  }
}
