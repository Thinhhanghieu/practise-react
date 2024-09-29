import React from "react";
import { Button, Form, InputNumber, Select } from "antd";

interface CommonFormProps {
  form: any;
  onValuesChange: (changedValues: any) => void;
  formItems: any[];
}

const CommonForm: React.FC<CommonFormProps> = ({ form, onValuesChange, formItems }) => {
      const onFinish = (values: any) => {
    console.log("Form Values:", values);
  };
  return (
    <Form form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
      {formItems.map((item) => (
        <Form.Item key={item.name} name={item.name} label={item.label}>
          {item.type === "select" ? (
            <Select>
              {item.options?.map((option:any) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <InputNumber style={{ width: "100%" }} addonAfter={item.suffix} />
          )}
        </Form.Item>
        
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
