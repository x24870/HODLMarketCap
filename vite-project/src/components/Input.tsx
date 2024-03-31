import React from "react";

interface Props {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

const Input = ({ value, placeholder, onValueChange }: Props) => {
  return (
    <input
      type="text"
      className="form-control my-2" // Bootstrap classes for styling
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default Input;
