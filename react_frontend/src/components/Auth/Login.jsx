import { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Alert, Spin, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

// Import API URL from environment variables
const api_url = import.meta.env.VITE_API_URL;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      error: "",
      redirectTo: null, // Store redirection path
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (values) => {
    this.setState({ isSubmitting: true, error: "" });

    try {
      const response = await fetch(`${api_url}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user info in localStorage if needed
      localStorage.setItem("user", JSON.stringify(data.sendBack));

      // Determine redirection path based on user role
      const userRole = data.userFound.role;
      const redirectTo = userRole === "admin" ? "/admin-dashboard" : "/user-dashboard";

      this.setState({ redirectTo });
    } catch (error) {
      this.setState({ error: error.message, isSubmitting: false });
    }
  };

  render() {
    // Redirect if login is successful
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} />;
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
            <Typography.Title level={2} className="text-center">
              Log In
            </Typography.Title>

            {this.state.error && <Alert message={this.state.error} type="error" showIcon className="mb-3" />}

            <Form layout="vertical" onFinish={this.handleSubmit}>
              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Enter a valid email address!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                  onChange={this.handleInputChange}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  onChange={this.handleInputChange}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={this.state.isSubmitting}
                >
                  {this.state.isSubmitting ? <Spin size="small" /> : "Log In"}
                </Button>
              </Form.Item>
            </Form>

            {/* Sign-up Link */}
            <Typography.Text className="text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Login;
