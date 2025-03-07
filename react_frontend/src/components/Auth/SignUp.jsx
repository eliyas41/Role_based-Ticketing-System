import { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Alert, Spin, Select, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const api_url = import.meta.env.VITE_API_URL;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      role: "user",
      isSubmitting: false,
      redirectToLogin: false,
      error: "",
      successMessage: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRoleChange = (value) => {
    this.setState({ role: value });
  };

  handleSubmit = async (values) => {
    this.setState({ isSubmitting: true, error: "", successMessage: "" });
    try {
      const response = await fetch(`${api_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      this.setState({
        successMessage: "Successfully registered! Redirecting to login...",
        isSubmitting: false,
      });
      setTimeout(() => this.setState({ redirectToLogin: true }), 2000);
    } catch (error) {
      this.setState({ error: error.message, isSubmitting: false });
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f4f4f4" }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <Link to="/" className="mb-6 sm:mx-auto flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
              <svg
                className="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </Link>
          <Card bordered={false} style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <Typography.Title level={2} className="text-center">Sign Up</Typography.Title>
            {this.state.error && <Alert message={this.state.error} type="error" showIcon className="mb-3" />}
            {this.state.successMessage && <Alert message={this.state.successMessage} type="success" showIcon className="mb-3" />}

            <Form layout="vertical" onFinish={this.handleSubmit}>
              <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: "Enter your full name!" }]}>
                <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true, message: "Enter your email!" }, { type: "email", message: "Invalid email!" }]}>
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter your password!" }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
              </Form.Item>

              <Form.Item name="role" label="Role" initialValue="user">
                <Select onChange={this.handleRoleChange}>
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block disabled={this.state.isSubmitting}>
                  {this.state.isSubmitting ? <Spin size="small" /> : "Sign Up"}
                </Button>
              </Form.Item>
            </Form>

            <Typography.Text className="text-center">
              Already have an account? <Link to="/login">Log In</Link>
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignUp;
