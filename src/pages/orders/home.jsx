import React from "react";

import LinkButton from "../../components/link-button";
import { reqOrderList, reqSearchOrder } from "../../api/index";
import { dateFormat } from "../../utils/dateUtils";
import "../../assets/css/common.css";
import { Card, Select, Table, Button, Icon, Input, message, Modal } from "antd";
const Option = Select.Option;

export default class OrderHome extends React.Component {
  state = {
    orderCount: 0,
    orderlists: [],
    page: 0,
    pagesize: 10,
    searchmsg: ""
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

  getOrderList = async (limit = 10, pages = 0, searchmsg = "") => {
    let data = {
      limit: limit,
      pages: pages
    };
    let result = {};
    if (searchmsg == "") {
      result = await reqOrderList(data);
    } else {
      data.searchmsg = searchmsg;
      result = await reqSearchOrder(data);
      message.success(result.message);
    }

    if (result.code === 0) {
      this.setState({
        orderCount: result.orderlist.count,
        orderlists: result.orderlist.data
      });
    }
  };

  pageChange = page => {
    const { searchmsg } = this.state;
    this.getOrderList(
      page.pageSize,
      (page.current - 1) * page.pageSize,
      searchmsg
    );
  };

  searchOrder = () => {
    const { searchmsg } = this.state;
    this.getOrderList(10, 0, searchmsg);
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getOrderList();
  }

  render() {
    const { orderlists, orderCount, searchmsg } = this.state;

    const title = (
      <div>
        <label htmlFor="Input">查询订单：</label>
        <Input
          placeholder="关键字"
          value={searchmsg}
          style={{ width: 150, margin: "0 15px" }}
          onChange={event => this.setState({ searchmsg: event.target.value })}
        />
        <Button type="primary" onClick={this.searchOrder}>
          查询
        </Button>
      </div>
    );

    return (
      <Card title={title}>
        <Table
          className="orderTable"
          bordered
          dataSource={orderlists}
          rowKey="order_no"
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
