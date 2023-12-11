"use client";

import { Button } from "@/app/components/core/button";
import { InputCheckbox, InputText } from "@/app/components/core/input";
import LoginForm from "@/app/components/form/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-gray-100 justify-center items-center">
      <div className="text-red max-w-xl w-full flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
