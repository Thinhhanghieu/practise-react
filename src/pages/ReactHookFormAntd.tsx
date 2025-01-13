import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, Button, Form } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type FormValues = {
  date: string | null; // Sử dụng chuỗi ISO 8601 để lưu trữ ngày ở định dạng UTC
};

const ReactHookForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      date: "2025-01-23T17:00:00Z",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dữ liệu form:", data);
    console.log(dayjs(data));
    
    // Xử lý dữ liệu form tại đây
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item label="Chọn ngày">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                console.log(date);

                const utcDate = date ? date.utc().format() : null;
                field.onChange(utcDate);
              }}
            />
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Gửi
      </Button>
    </Form>
  );
};

export default ReactHookForm;
