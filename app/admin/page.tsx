"use client";
import { useRouter } from "next/navigation";
import AUTHAPI from "../lib/api/admin/auth/request";
import useUserProfile from "../lib/store/userProfile";

export default function Home() {
  const router = useRouter();

  AUTHAPI.meSWR("", {
    onError: () => {
      router.push("/admin/login");
    },
    onSuccess: (response: any) => {
      useUserProfile.setState({ user: response?.data?.user });
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-red underline">Deal Clicks Admin</div>
    </main>
  );
}
