import { InputCheckboxProps } from "./interface";

export default function InputCheckbox({
  wrapperClass = "text-[#262626]",
  inputClass,
  labelClass = "font-medium",
  label,
  onChange = () => {},
  id,
  name,
  checked,
}: InputCheckboxProps) {
  return (
    <div className={`flex gap-2 items-center ${wrapperClass ?? ""}`}>
      <input
        type="checkbox"
        id={`cb-${id ?? name}`}
        className={inputClass ?? ""}
        onChange={(e) => onChange(e.target.checked, name)}
        checked={checked}
      />

      <label
        htmlFor={`cb-${id ?? name}`}
        className={`cursor-pointer ${labelClass}`}
      >
        {label ?? null}
      </label>
    </div>
  );
}
