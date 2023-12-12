"use client";
import { useRouter } from "next/navigation";
import AUTHAPI from "../lib/api/admin/auth/request";

export default function Home() {
  const router = useRouter();

  const { data, error } = AUTHAPI.meSWR("", {
    onError: (error: any) => {
      router.push("/admin/login");
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-red underline">Deal Clicks Admin</div>
    </main>
  );
}
