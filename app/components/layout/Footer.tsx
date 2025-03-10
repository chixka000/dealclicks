import Image from "next/image";
import React from "react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-8 text-dark-theme">
      <div className="flex items-center justify-evenly gap-8 px-20 gap-28 bg-white w-full py-12 border-y border-dark-theme">
        <div className="flex justify-center bg-white rounded-full border-2 border-dark-theme h-48 w-48">
          <Image
            className="object-contain"
            src="/images/logo.png"
            width={200}
            height={200}
            alt="logo"
            priority
          />
        </div>

        {/* <div className="border-l-2 h-[20rem]" /> */}

        <div className="flex flex-col gap-8 border-x-2 px-20">
          <span className="text-6xl font-bold">Great Deal!</span>
          <span className="text-2xl">VIRTUAL DEAL</span>
          <span className="text-lg break-words w-[21rem]">
            Sed lorem ipsum dolor sit amet nullam consequat feugiat et nisl
            tempus adipiscing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 w-fit">
          <div className="flex justify-center">
            <FaFacebook size={80} className="text-[#0866ff]" />
          </div>
          <div className="flex justify-center">
            <MdEmail size={80} className="text-red-500" />
          </div>
          <div className="flex justify-center">
            <RiInstagramFill size={80} className="text-pink-500" />
          </div>
          <div className="flex justify-center">
            <FaTiktok size={80} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};
