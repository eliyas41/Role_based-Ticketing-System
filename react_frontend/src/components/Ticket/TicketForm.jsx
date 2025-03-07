import React, { Component } from "react";
import { Input, Button, Form, Modal, message } from "antd";
import { createTicket } from "../../utils/ticketService";
import getAuth from "../../utils/auth";

class TicketForm extends Component {
  state = {
    title: "",
    description: "",
    isLoading: false,
    error: "",
    successMessage: "",
    isModalVisible: false, // State to control modal visibility
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (values) => {
    const { title, description } = values;

    if (!title || !description) {
      this.setState({ error: "Title and description are required." });
      return;
    }

    this.setState({ isLoading: true, error: "", successMessage: "" });

    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;

      const newTicket = await createTicket(token, { title, description });

      this.setState({
        title: "",
        description: "",
        isLoading: false,
        successMessage: "Ticket created successfully!",
      });

      // Set timeout to clear success message and reload the page after 3 seconds
      setTimeout(() => {
        this.setState({ successMessage: "" });
        window.location.reload();
      }, 2000);

    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      message.error(error.message); // Display error message using Ant Design's message component
    }
  };

  showModal = () => {
    this.setState({
      isModalVisible: true, // Show modal when button is clicked
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false, // Close the modal when cancel button is clicked
    });
  };

  render() {
    const { title, description, error, successMessage, isLoading, isModalVisible } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create Ticket</Button>

        <Modal
          visible={isModalVisible}
          onCancel={this.handleCancel}
          footer={null} // Hide the default footer
          destroyOnClose // Destroy the modal content on close to reset the form state
        >
          <Form
            onFinish={this.handleSubmit}
            layout="vertical"
          >
            <h2 className="text-lg font-semibold mb-2">Create a New Ticket</h2>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input
                placeholder="Enter ticket title"
                value={title}
                onChange={this.handleInputChange}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter a description!" }]}
            >
              <Input.TextArea
                placeholder="Enter ticket description"
                value={description}
                onChange={this.handleInputChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                block
                loading={isLoading}
                style={{ width: 'auto', float: 'left' }}
              >
                {isLoading ? "Creating..." : "Create Ticket"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default TicketForm;
