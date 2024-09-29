import React from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';

interface IFormDataCreateGirlFr {
  age: string;
  specifyAge: number;
}

// utils.ts
export const getAgeRange = (age: number): string | undefined => {
  const AGE_OPTIONS: Record<string, { minAge: number; maxAge?: number }> = {
    '18+': { minAge: 18, maxAge: 20 },
    '20-25': { minAge: 20, maxAge: 25 },
    '25-35': { minAge: 25, maxAge: 35 },
    '35-50': { minAge: 35, maxAge: 50 },
    '50+': { minAge: 50, maxAge: 55 }
  };

console.log(Object.entries(AGE_OPTIONS));


  return Object.entries(AGE_OPTIONS).find(([_, { minAge, maxAge }]) => 
    age >= minAge && (maxAge === undefined || age <= maxAge)
  )?.[0];
};

const AGE_OPTIONS: Record<string, { minAge: number; maxAge?: number }> = {
  '18+': { minAge: 18, maxAge: 20 },
  '20-25': { minAge: 20, maxAge: 25 },
  '25-35': { minAge: 25, maxAge: 35 },
  '35-50': { minAge: 35, maxAge: 50 },
  '50+': { minAge: 50, maxAge: 55 }
};

const YourComponent: React.FC = () => {
  const { values, handleChange, setFieldValue } = useFormikContext<IFormDataCreateGirlFr>();

  const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = Number(e.target.value);

    if (!isNaN(inputAge)) {
      const range = getAgeRange(inputAge);
      console.log(range);
      
      setFieldValue('age', range || "");
    } else {
      setFieldValue('age', ""); // Clear age field if input is not a number
    }

    handleChange(e);
  };

  const handleAgeClick = (age: string) => {
    setFieldValue('age', age);
  };

  return (
    <Form>
      <div>
        <Field
          name="specifyAge"
          type="number"
          placeholder="Specify age"
          className="w-full p-2 rounded-lg bg-[#0A0A0AE5] text-white border border-gray-600 pr-16 focus:outline-none"
          onChange={handleChangeAge}
          value={values.specifyAge}
        />
      </div>

      <div>
        {Object.keys(AGE_OPTIONS).map((age) => (
          <button
            key={age}
            className={`px-4 py-2 rounded-lg ${
              values.age === age
                ? 'btn-primary rounded-md'
                : 'border-gray-500 border'
            }`}
            type='button'
            onClick={() => handleAgeClick(age)}
          >
            {age}
          </button>
        ))}
      </div>
    </Form>
  );
};

const FormikWrapper: React.FC = () => {
  const initialValues: IFormDataCreateGirlFr = {
    age: "",
    specifyAge: 0
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <YourComponent />
    </Formik>
  );
};

export default FormikWrapper;
