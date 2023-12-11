"use client";
import React from "react";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { usePathname } from "next/navigation";

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

  return (
    <div className="flex flex-col min-h-screen">
      {!pathname.includes("/admin") && <Menu />}
      <div className="relative flex-grow overflow-x-hidden">
        {props.children}
      </div>
      {!pathname.includes("/admin") && <Footer />}
    </div>
  );
}
