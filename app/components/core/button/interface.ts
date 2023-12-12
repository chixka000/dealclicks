import { MouseEventHandler } from "react";

export interface ButtonProps {
  // wrapperClass, buttonClass, label, onClick, id
  label: string;
  type?: "button" | "submit" | "reset";
  buttonClass?: string;
  id?: string;
  wrapperClass?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
