import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const FormAntd: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulating API error
      if (values.username === "error") {
        throw new Error("Invalid username or password");
      }
      
      console.log("Login successful:", values);
      message.success("Login successful");
    } catch (error: any) {
      console.error("Login failed:", error);
      form.setFields([
        {
          name: 'username',
          errors: [error.message || "Login failed"],
        },
        {
          name: 'password',
          errors: [error.message || "Login failed"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ maxWidth: 300, margin: "0 auto" }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input suffix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAntd;
