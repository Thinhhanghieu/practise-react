import React, { useState } from 'react';
import { Formik, Form, useFormikContext, FormikHelpers } from 'formik';

interface FormValues {
  field1: string;
  field2: string;
  // Thêm các trường khác tùy theo nhu cầu của bạn
}

const initialValues: FormValues = {
  field1: '',
  field2: '',
  // Khởi tạo các trường khác tùy theo nhu cầu của bạn
};

// Hàm tạo giá trị ngẫu nhiên
const getRandomValue = (length: number) => Math.random().toString(36).substring(2, length + 2);

const Step1Component: React.FC = () => {
  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="field1"
          value={values.field1}
          onChange={handleChange}
          placeholder="Field 1"
          className="p-2 border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:outline-none"
        />
        {errors.field1 && touched.field1 && (
          <div className="text-red-500 text-sm mt-1">{errors.field1}</div>
        )}
      </div>
      {/* Thêm các trường khác cho step 1 */}
    </div>
  );
};

const Step2Component: React.FC = () => {
  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="field2"
          value={values.field2}
          onChange={handleChange}
          placeholder="Field 2"
          className="p-2 border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:outline-none"
        />
        {errors.field2 && touched.field2 && (
          <div className="text-red-500 text-sm mt-1">{errors.field2}</div>
        )}
      </div>
      {/* Thêm các trường khác cho step 2 */}
    </div>
  );
};

const Step3Component: React.FC = () => {
  return (
    <div>
      <p className="text-lg font-semibold">123</p>
    </div>
  )
  // Nội dung của Step 3
};

const MyForm = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === 3) {
      console.log('Submitted data:', values);
      // Thực hiện các hành động cần thiết khi hoàn thành tất cả các bước
    } else {
      // Cập nhật giá trị các trường thuộc bước hiện tại bằng giá trị ngẫu nhiên
      if (step === 1) {
        actions.setFieldValue('field1', getRandomValue(8)); // Ví dụ: tạo giá trị ngẫu nhiên cho field1
      } else if (step === 2) {
        actions.setFieldValue('field2', getRandomValue(8)); // Ví dụ: tạo giá trị ngẫu nhiên cho field2
      }

      setStep(step + 1);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-4">
          {step === 1 && <Step1Component />}
          {step === 2 && <Step2Component />}
          {step === 3 && <Step3Component />}

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg ${step === 3 ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {step === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
