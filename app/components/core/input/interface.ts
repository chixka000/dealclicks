import { ChangeEventHandler } from "react";

export interface InputProps {
  // {type, id, inputClass, labelClass, label}
  label: string;
  id?: string;
  inputClass?: string;
  labelClass?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface InputTextProps extends InputProps {
  type: "text" | "password" | "email" | "number";
}

export interface InputCheckboxProps extends InputProps {
  wrapperClass?: string;
}
