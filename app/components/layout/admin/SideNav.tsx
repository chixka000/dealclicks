import Image from "next/image";
import Link from "next/link";
import useUserProfile from "@/app/lib/store/userProfile";
import { adminMenu } from "@/app/lib/const/adminMenu";

export default function SideNav() {
  const user = useUserProfile((state) => state.user);

  return (
    <div className="w-[20%] min-h-screen bg-white shadow-md flex flex-col gap-3">
      <div className="flex w-full flex-col gap-3 px-4 pt-6">
        <Link href={"#"} className="flex w-full flex-col gap-3 items-center">
          <Image
            src={"/images/profile/stepen.jpg"}
            alt="stephen"
            width={100}
            height={100}
            className="rounded-full shadow-lg"
          />
          <p className="leading-[20px] tracking-[1px] font-semibold text-[#555555]">
            {user?.fullName ?? "-"}
          </p>
        </Link>
        <hr className="border-[#c6c6c6] w-full" />
      </div>

      <div className="flex flex-col font-semibold text-[#555555]">
        {adminMenu.map((item, index) => (
          <Link
            href={item.url}
            className="flex gap-2 items-center p-4 hover:bg-gray-100"
            key={index}
          >
            {item.icon ?? null}
            <p className="tracking-[2px] leading-[30px]">{item.title ?? ""}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
