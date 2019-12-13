import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string
  };
  state = {
    editorState: EditorState.createEmpty()
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/main/addimages");
      // xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("files", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  componentWillMount() {
    const detail = this.props.detail;
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      });
    }
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    var editorStates = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    this.props.getText(editorStates);
  };

  getDetail = () => {
    return draftToHtml(convertToRaw(this.editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorStyle={{ height: 350, border: "1px solid #ccc", padding: 10 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
      </div>
    );
  }
}
