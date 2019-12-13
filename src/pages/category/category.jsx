import React from "react";
import { Card, Table, button, Icon, Button, message, Modal } from "antd";
import { reqCategoryList, reqAddCategory } from "../../api/index";
import LinkButton from "../../components/link-button";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends React.Component {
  state = {
    loading: false,
    categorys: [],
    showStatus: 0 //0，都不显示，1添加，2修改
  };

  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "goods_type_name",
        key: "goods_type_name"
      },
      {
        title: "操作",
        width: 300,
        render: category => (
          <span>
            <LinkButton
              onClick={() => {
                this.showUpdate(category);
              }}
            >
              修改分类
            </LinkButton>
            <LinkButton
              onClick={() => {
                this.toProduct(category.goods_type_id);
              }}
            >
              商品列表
            </LinkButton>
          </span>
        )
      }
    ];
  };

  toProduct = id => {
    this.props.history.replace("/goodslist");
  };

  showAdd = () => {
    this.setState({
      showStatus: 1
    });
  };

  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        });
        let data = { goods_type_name: values.categoryName };
        const result = await reqAddCategory(data);
        if (result.code === 0) {
          message.success(result.message);
          this.getCategory();
        } else {
          message.error(result.message);
        }
      } else {
        message.error("添加出错");
      }
    });
  };

  showUpdate = category => {
    this.category = category;
    this.setState({
      showStatus: 2
    });
  };
  updateCategory = id => {
    this.setState({
      showStatus: 0
    });

    this.getCategory();
  };

  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };

  getCategory = async () => {
    this.setState({ loading: true });
    const result = await reqCategoryList();
    this.setState({ loading: false });
    if (result.code === 0) {
      const categorys = result.categorylist;
      this.setState({
        categorys
      });
    } else {
      message.error("获取分类列表失败");
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getCategory();
  }

  render() {
    const title = "一级分类列表";

    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    );

    const { categorys, loading } = this.state;
    const category = this.category || {};
    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          dataSource={categorys}
          rowKey="goods_type_id"
          loading={loading}
          columns={this.columns}
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true
          }}
          bordered
        />
        <Modal
          title="添加分类"
          visible={this.state.showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={form => {
              this.form = form;
              console.log(form);
            }}
          ></AddForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={this.state.showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.goods_type_name}
            setForm={form => {
              this.form = form;
            }}
          ></UpdateForm>
        </Modal>
      </Card>
    );
  }
}
