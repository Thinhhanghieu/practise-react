import React, { useState, useEffect } from "react";
import { AutoComplete, Input, Typography } from "antd";
import { useDebounce } from "../hooks/usedebound";

const { Text } = Typography;

// Giả lập API call
const fetchOptions = async (query: string) => {
  // Giả sử API trả về kết quả dựa trên query
  if (query) {
    return {
      borrower: [
        { label: `Borrower: ${query} 1`, value: `borrower-${query}1` },
        { label: `Borrower: ${query} 2`, value: `borrower-${query}2` },
        { label: `Borrower: ${query} 3`, value: `borrower-${query}3` },
      ],
      loan: [
        { label: `Loan: ${query} A`, value: `loan-${query}A` },
        { label: `Loan: ${query} B`, value: `loan-${query}B` },
        { label: `Loan: ${query} C`, value: `loan-${query}C` },
      ],
    };
  }
  return { borrower: [], loan: [] };
};

const AutoCompleteExample: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<{ label: string; options: any[] }[]>([]);

  // Debounce giá trị input
  const debouncedValue = useDebounce(inputValue, 500);

  // Khi debouncedValue thay đổi, gọi API để tìm kiếm dữ liệu
  useEffect(() => {
    if (debouncedValue) {
      fetchOptions(debouncedValue).then((data) => {
        const borrowerOptions = data.borrower;
        const loanOptions = data.loan;

        // Phân loại option thành 2 nhóm Borrower và Loan
        setOptions([
          {
            label: "Borrower",
            options: borrowerOptions,
          },
          {
            label: "Loan",
            options: loanOptions,
          },
        ]);
      });
    } else {
      setOptions([]); // Nếu không có input, reset options
    }
  }, [debouncedValue]);

  // Tạo hàm highlight từ khóa trong label
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text; // Nếu không có từ khóa tìm kiếm thì trả về văn bản gốc
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi")); // Tách văn bản tại từ khóa
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <AutoComplete
        value={inputValue}
        onChange={(value) => setInputValue(value)} // Cập nhật input value
        style={{ width: 300 }}
        options={options.flatMap((group) => [
          {
            label: <Text strong>{group.label}</Text>, // Tạo tiêu đề cho nhóm
            disabled: true, // Tắt tương tác với tiêu đề nhóm
          },
          ...group.options.map((option) => ({
            label: highlightText(option.label, debouncedValue), // Highlight từ khóa trong từng option
            value: option.value,
          })),
        ])}
        onSelect={(value,option)=> console.log(option)
        }
      >
        <Input.Search placeholder="Search..." enterButton />
      </AutoComplete>
    </div>
  );
};

export default AutoCompleteExample;
