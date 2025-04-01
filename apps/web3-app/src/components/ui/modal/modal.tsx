import React from "react";
import Dialog from "./dialog";

class Modal extends React.PureComponent {
  /* 渲染底部按钮 */
  renderFooter = () => {
    const { onOk, onCancel, cancelText, okText, footer } = this.props as any;
    /* 触发 onOk / onCancel 回调  */
    if (footer && React.isValidElement(footer)) return footer;
    return (
      <div className="model_bottom">
        <div className="model_btn_box">
          <button
            className="searchbtn"
            onClick={(e) => {
              onOk && onOk(e);
            }}
          >
            {okText || "确定"}
          </button>
          <button
            className="concellbtn"
            onClick={(e) => {
              onCancel && onCancel(e);
            }}
          >
            {cancelText || "取消"}
          </button>
        </div>
      </div>
    );
  };

  /* 渲染顶部 */
  renderTop = () => {
    const { title, onClose } = this.props as any;
    return (
      <div className="model_top">
        <p>{title}</p>
        <span className="model_top_close" onClick={() => onClose && onClose()}>
          x
        </span>
      </div>
    );
  };

  /* 渲染弹窗内容 */
  renderContent = () => {
    const { content, children } = this.props as any;
    return React.isValidElement(content) ? content : children ? children : null;
  };
  render() {
    const { visible, width = 500, closeCb, onClose } = this.props as any;
    return (
      <Dialog
        closeCb={closeCb}
        onClose={onClose}
        visible={visible}
        width={width}
      >
        {this.renderTop()}
        {this.renderContent()}
        {this.renderFooter()}
      </Dialog>
    );
  }
}
