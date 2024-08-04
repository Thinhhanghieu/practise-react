import React from 'react';
import { Formik, FormikHelpers, Form } from 'formik';

// Đối tượng chứa các phạm vi độ tuổi và các giá trị tương ứng
const ageOptions: Record<string, { min: number; max?: number }> = {
  '18+': { min: 18 },
  '20-25': { min: 20, max: 25 },
  '25-35': { min: 25, max: 35 },
  '35-50': { min: 35, max: 50 },
  '50+': { min: 50 }
};

// Hàm lấy số ngẫu nhiên trong một phạm vi
const getRandomAge = (range: string): number => {
  const option = ageOptions[range];
  if (option.max !== undefined) {
    return Math.floor(Math.random() * (option.max - option.min + 1)) + option.min;
  }
  return option.min; // Trả về số cụ thể cho "18+" và "50+"
};

// Hàm chọn ngẫu nhiên một phạm vi độ tuổi từ danh sách
const getRandomAgeOption = (): string => {
  const keys = Object.keys(ageOptions);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

// Định nghĩa các kiểu cho Formik
interface FormValues {
  age: string;
}

const AgeSelector: React.FC = () => {
  return (
    <Formik
      initialValues={{ age: '' }}
      onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
        console.log('Selected age:', values.age);
        console.log('Age:', getRandomAge(values.age));
        actions.setSubmitting(false);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="flex flex-col space-y-2">
            {Object.keys(ageOptions).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFieldValue('age', option)}
                className={`p-2 border rounded ${
                  values.age === option ? 'bg-red-500 text-white' : 'bg-white text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="button"
              onClick={() => {
                const randomOption = getRandomAgeOption();
                setFieldValue('age', randomOption);
                const age = getRandomAge(randomOption);
                console.log('Random Age:', age);
                // Bạn có thể làm gì đó với giá trị ngẫu nhiên ở đây, ví dụ như hiển thị nó hoặc lưu vào state nếu cần
              }}
              className="p-2 bg-green-500 text-white rounded"
            >
              Get Random Age
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AgeSelector;
