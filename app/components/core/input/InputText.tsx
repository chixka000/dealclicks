import { InputTextProps } from "@/app/components/core/input/interface";

export default function InputText({
  type,
  id,
  inputClass = "border-2 border-[#c4c4c4] w-full rounded leading-[40px] px-4 focus:border-[#3b71ca] text-[#c4c4c4] font-medium tracking-[2px]",
  labelClass = "peer-focus:text-[#3b71ca] peer-focus:font-medium bg-white px-1 text-[#c4c4c4] ",
  label,
  onChange = () => {},
}: InputTextProps) {
  return (
    <div className="relative">
      <input
        id={`ipt-${id}`}
        type={type}
        className={`peer placeholder:text-transparent outline-none transition-all duration-300 ease-in-out ${
          inputClass ?? ""
        }`}
        onChange={onChange}
      />

      <label
        htmlFor={`ipt-${id}`}
        className={`absolute left-4 -top-3 transition-all duration-300 ease-in-out ${
          labelClass ?? ""
        }`}
      >
        {label ?? ""}
      </label>
    </div>
  );
}
