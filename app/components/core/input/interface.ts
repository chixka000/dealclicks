import { ChangeEvent, ChangeEventHandler } from "react";

export interface InputProps {
  // {type, id, inputClass, labelClass, label}
  label: string;
  id?: string;
  inputClass?: string;
  labelClass?: string;
  name: string;
  field?: string;
  onChange?: (value: any, property: any) => void;
}

export interface InputTextProps extends InputProps {
  type: "text" | "password" | "email" | "number";
  value?: string | number | readonly string[];
}

export interface InputCheckboxProps extends InputProps {
  wrapperClass?: string;
  checked?: boolean;
}
