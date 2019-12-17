import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import PropTypes from "prop-types";

import "./index.less";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1146139_r758brakqs9.js"
});

export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.string
  };
  state = {
    fileslist: [], //显示列表
    bigImg: ""
  };

  getfile = e => {
    var _this = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      let { fileslist } = _this.state;
      fileslist.push(this.result);
      _this.setState({ fileslist });
    };
    this.props.getFiles(e.target.files[0]); //传入后台的文件
  };

  showBigImg = item => {
    if (item) {
      this.setState({
        bigImg: item
      });
    } else {
      this.setState({
        bigImg: ""
      });
    }
  };

  deleteImg = index => {
    let { fileslist } = this.state;
    fileslist.splice(index, 1);
    this.setState({ fileslist });
  };

  componentWillMount() {
    if (!!this.props.imgs) {
      let { fileslist } = this.state;
      fileslist.push(require("../../" + this.props.imgs));
      this.setState({ fileslist });
    }
  }

  render() {
    const { fileslist, bigImg } = this.state;
    const AddButton = (
      <div className="add-upload img-box">
        <input type="file" accept="true" onChange={this.getfile} />
        <div className="add-img">
          <IconFont type="icon-addgrey" />
        </div>
        <div className="upload">
          <span>Upload</span>
        </div>
      </div>
    );
    return (
      <div className="clearfix">
        {fileslist.map((item, index) => {
          return (
            <div className="file-img img-box" key={index}>
              <div className="img">
                <img src={item} alt="商品图片" />
              </div>
              <div className="button-box">
                <span>
                  <IconFont
                    key="icon-eye"
                    type="icon-eye"
                    onClick={() => {
                      this.showBigImg(item);
                    }}
                  />

                  <IconFont type="icon-xiazai" key="icon-xiazai" />
                  <IconFont
                    key="icon-dustbin"
                    type="icon-dustbin"
                    onClick={() => {
                      this.deleteImg(index);
                    }}
                  />
                </span>
              </div>
            </div>
          );
        })}

        {fileslist.length >= 1 ? null : AddButton}
        <div
          className={bigImg ? "big-img" : "hidden"}
          onClick={() => {
            this.showBigImg();
          }}
        >
          <div className="big-img-box">
            <img src={bigImg} alt="datu" />
          </div>
        </div>
      </div>
    );
  }
}
