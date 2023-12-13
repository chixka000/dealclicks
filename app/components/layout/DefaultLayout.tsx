"use client";
import React from "react";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { usePathname } from "next/navigation";
import SideNav from "./admin/SideNav";
import useUserProfile from "@/app/lib/store/userProfile";

export default function DefaultLayout(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  const pathname = usePathname();
  const user = useUserProfile((state) => state.user);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        pathname.includes("/admin") ? "bg-gray-100" : ""
      }`}
    >
      {!pathname.includes("/admin") && <Menu />}
      <div className="relative flex overflow-x-hidden">
        {pathname.includes("/admin") && user && <SideNav />}
        <div className="relative flex-grow">{props.children}</div>
      </div>
      {!pathname.includes("/admin") && <Footer />}
    </div>
  );
}
