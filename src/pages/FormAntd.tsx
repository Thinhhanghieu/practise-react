import React, { useState } from "react";
import { Form, Button } from "antd";
import CommonForm from "./CommonForm";
import { initialFormItems } from "../constant/general.constant";

const FormAntd: React.FC = () => {
  const [form] = Form.useForm();
  const [formItems, setFormItems] = useState<any>(initialFormItems);

  const onValuesChange = (changedValues: any) => {
    // Check if the selected field has changed
    if (changedValues.selectedField) {
      const selectedField = changedValues.selectedField;
      const updatedFormItems = formItems.map((item: any) => {
        if (item.name === "numberInput") {
          return {
            ...item,
            suffix: selectedField === "amount" ? "123" : selectedField === "ratio" ? "%" : "",
          };
        }
        return item;
      });
      setFormItems(updatedFormItems);
    }
  };

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <CommonForm form={form} onValuesChange={onValuesChange} formItems={formItems} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAntd;
