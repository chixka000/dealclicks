import { InputCheckbox, InputText } from "@/app/components/core/input";
import Link from "next/link";
import { Button } from "@/app/components/core/button";

export default function LoginForm() {
  return (
    <div className="rounded-xl w-[70%] flex flex-col justify-center items-center bg-white p-6 shadow-md">
      <h1 className="text-[50px] font-bold">LOGO</h1>
      <form className="w-full flex flex-col gap-6">
        <InputText id="email" type="email" label="Email Address" />

        <InputText id="password" type="password" label="Password" />

        <div className="flex justify-between items-center">
          <InputCheckbox id="remember-me" label="Remember me" />

          <Link href={"#"} className="text-[#262626] font-medium">
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <Button label="Login" id="login" />

          <div className="flex gap-1">
            <p>{`Don't have an account?`}</p>
            <Link href="#" className="text-[#3b71ca] font-semibold">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
