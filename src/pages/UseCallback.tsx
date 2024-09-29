import React, { useState, useCallback } from 'react';

interface ExpensiveComponentProps {
  onButtonClick: () => void;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = React.memo( ({ onButtonClick }) => {
  console.log('Rendering ExpensiveComponent');

  return (
    <div>
      <button onClick={onButtonClick}>Click Me</button>
    </div>
  );
});



const UseCallBack: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // Sử dụng useCallback để ghi nhớ hàm onButtonClick, tranh render ko can thiet khi count thay đổi
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Hàm này không phụ thuộc vào state hoặc props

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count ({count})</button>
      <ExpensiveComponent onButtonClick={handleClick} />
    </div>
  );
};

export default UseCallBack;
