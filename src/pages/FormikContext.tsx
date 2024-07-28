import React, { useState } from 'react';
import { Formik, Form, useFormikContext, FormikHelpers, FormikErrors } from 'formik';

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

// Hàm validate cho từng bước
const validateStep1 = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.field1) {
    errors.field1 = 'Field 1 is required';
  }
  return errors;
};

const validateStep2 = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.field2) {
    errors.field2 = 'Field 2 is required';
  }
  return errors;
};

const Step1Component: React.FC = () => {
  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div>
      <input
        type="text"
        name="field1"
        value={values.field1}
        onChange={handleChange}
        placeholder="Field 1"
      />
      {errors.field1 && touched.field1 && <div>{errors.field1}</div>}
      {/* Thêm các trường khác cho step 1 */}
    </div>
  );
};

const Step2Component: React.FC = () => {
  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div>
      <input
        type="text"
        name="field2"
        value={values.field2}
        onChange={handleChange}
        placeholder="Field 2"
      />
      {errors.field2 && touched.field2 && <div>{errors.field2}</div>}
      {/* Thêm các trường khác cho step 2 */}
    </div>
  );
};

const Step3Component: React.FC = () => {
  return (
    <>
    <p>123</p>
    </>
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
      setStep(step + 1);
    }
    actions.setSubmitting(false);
  };

  // Hàm validate cho toàn bộ form, kiểm tra theo từng bước
  const validate = (values: FormValues) => {
    console.log(values);
    
    switch (step) {
      case 1:
        return validateStep1(values);
      case 2:
        return validateStep2(values);
      default:
        return {};
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          {step === 1 && <Step1Component />}
          {step === 2 && <Step2Component />}
          {step === 3 && <Step3Component />}
          
          <div>
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
            <button type="submit">{step === 3 ? 'Submit' : 'Next'}</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
