import React, { useState, useMemo } from 'react';

interface ExpensiveComponentProps {
  number: number;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = ({ number }) => {
  // Hàm tính toán đắt đỏ
  const computeExpensiveValue = (num: number): number => {
    console.log('Calculating...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  };

  // Sử dụng useMemo để ghi nhớ giá trị tính toán
  const expensiveValue = useMemo(() => computeExpensiveValue(number), [number]);

  return <div>Expensive Value: {expensiveValue}</div>;
};

const UseMemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [number, setNumber] = useState<number>(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count ({count})</button>
      <button onClick={() => setNumber(number + 1)}>Change Number ({number})</button>
      <ExpensiveComponent number={number} />
    </div>
  );
};

export default UseMemo;
