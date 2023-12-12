import { ButtonProps } from "@/app/components/core/button/interface";

export default function Button({
  wrapperClass = "bg-[#3b71ca] rounded",
  buttonClass = "w-full px-6 py-2 text-white font-semibold tracking-[2px]",
  label,
  onClick = () => {},
  id,
  type,
}: ButtonProps) {
  return (
    <div className={wrapperClass ?? ""}>
      <button
        id={`btn-${id ?? label}`}
        className={buttonClass ?? ""}
        onClick={onClick}
        type={type}
      >
        {label ?? ""}
      </button>
    </div>
  );
}
