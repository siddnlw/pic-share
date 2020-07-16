import React from "react";
import { Form, Icon, Input, Modal, message } from "antd";
import UserModel from "../models/UserModel";
import { handleErrors } from "../models/ErrorHandler";

class SignupForm extends React.Component {
  state = { saving: false };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ saving: true });
        UserModel.signup(values)
          .then(() => {
            this.setState({ saving: false });
            message.success("Signup successful");
            this.props.closeModal();
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
        title="Signup"
        visible={this.props.visible}
        okText="Signup"
        confirmLoading={this.state.saving}
        onOk={this.handleSubmit}
        onCancel={this.props.closeModal}
      >
        <Form>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input you name!" }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Name"
              />
            )}
          </Form.Item>
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

export default Form.create({ name: "signup_form" })(SignupForm);
