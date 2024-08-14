"use client";
import React from "react";
import { useField } from "formik";
import Input from "./Input"; // Adjust the import path as needed

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <Input
        label={label}
        {...field}
        {...props}
        onChange={(value) =>
          field.onChange({ target: { name: props.name, value } })
        }
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
