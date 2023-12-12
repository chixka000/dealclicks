import { InputCheckbox, InputText } from "@/app/components/core/input";
import Link from "next/link";
import { Button } from "@/app/components/core/button";
import useAuthStore from "@/app/lib/store/authStore";
import { useShallow } from "zustand/react/shallow";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { data, login, onChange } = useAuthStore(
    useShallow((state) => ({
      data: state.data,
      login: state.login,
      onChange: state.onChangeHandler,
    }))
  );

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login();

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl w-[70%] flex flex-col justify-center items-center bg-white p-6 shadow-md">
      <h1 className="text-[50px] font-bold">LOGO</h1>
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmitHandler}>
        <InputText
          id="email"
          type="email"
          label="Email Address"
          value={data?.email}
          name="email"
          onChange={onChange}
        />

        <InputText
          id="password"
          type="password"
          label="Password"
          name="password"
          value={data?.password}
          onChange={onChange}
        />

        <div className="flex justify-between items-center">
          <InputCheckbox
            id="remember-me"
            label="Remember me"
            name="remember"
            checked={data?.remember}
            onChange={onChange}
          />

          <Link href={"#"} className="text-[#262626] font-medium">
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <Button label="Login" id="login" type="submit" />

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
