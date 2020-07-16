import React from "react";
import { Form, Icon, Input, Modal, message } from "antd";
import UserModel from "../models/UserModel";
import { handleErrors } from "../models/ErrorHandler";

class LoginForm extends React.Component {
  state = { saving: false };

  handleSubmit = () => {
    this.setState({ saving: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UserModel.login(values)
          .then(() => {
            message.success("Login successful");
            this.props.closeModal();
            this.setState({ saving: false });
          })
          .catch(err => {
            handleErrors(err);
            this.setState({ saving: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Login"
        visible={this.props.visible}
        okText="Login"
        confirmLoading={this.state.saving}
        onOk={this.handleSubmit}
        onCancel={this.props.closeModal}
      >
        <Form>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "login_form" })(LoginForm);
