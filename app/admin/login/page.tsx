"use client";

import LoginForm from "@/app/components/form/LoginForm";
import AUTHAPI from "@/app/lib/api/admin/auth/request";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  AUTHAPI.meSWR("", {
    onSuccess: () => {
      router.push("/admin");
    },
  });

  return (
    <main className="flex min-h-screen flex-col p-24 bg-gray-100 justify-center items-center">
      <div className="text-red max-w-xl w-full flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
