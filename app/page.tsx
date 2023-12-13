"use client";

import Image from "next/image";
import noImage from "../public/images/sample.jpg";
import banner from "@/public/images/banner.jpg";
import runningNike from "@/public/images/running-nike.webp";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render on the server
  }
  return (
    <main className="flex min-h-screen flex-col">
      {/* // ! Banner */}
      <div className="hero-image flex justify-center items-center">
        <div className="hero-text inline-block rounded-3xl p-[30rem]">
          <div className=" w-full h-full relative">
            <Image
              alt={"sample"}
              src={banner}
              className="rounded-t-3xl w-full h-full"
            />
            <div className="absolute text-white flex flex-col gap-8 justify-center px-8 w-full h-full top-0 bg-[#2e2c2c54] rounded-t-3xl">
              <span className="text-5xl font-bold text-left">
                Great deal will available here!
              </span>
              <span className="text-2xl text-left">
                Great deal will available here! Great deal will available
                here!Great deal will available here!Great deal will available
                here!
              </span>
            </div>
          </div>
          <div className="flex justify-between font-bold items-center text-2xl bg-black rounded-b-3xl px-16 py-8 text-black bg-gradient-to-r from-gray-500 to-white shadow-2xl">
            <span>Click our latest update's!</span>
            <button className="flex gap-4 items-center border-2 border-black py-4 px-8 rounded-full text-2xl">
              Click Me! <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6f6]">
        <div className="grid grid-cols-3 gap-4 py-16 container mx-auto px-auto">
          {Array.from({ length: 3 }, (_, idx) => (
            <div
              key={idx}
              className="relative shadow-2xl grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
            >
              <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('/images/running-nike.webp')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
              </div>
              <div className="relative p-6 px-6 py-14 md:px-12">
                <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                  Best Seller
                </h2>
                <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                  Price
                </h5>
                <Image
                  alt="tania andrew"
                  src="/images/banner.jpg"
                  className="relative inline-block h-[74px] w-[74px] rounded-full border-2 border-white object-cover object-center"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* // * Content */}
      <div className="flex items-center gap-4 w-full justify-between py-16 container mx-auto px-4">
        {Array.from({ length: 4 }, (_, idx) => (
          <div key={idx} className="border rounded-2xl ">
            <div className="relative flex flex-col h-full bg-white text-dark-theme rounded-2xl">
              <div className="relative shadow-md overflow-hidden text-gray-700 bg-white rounded-t-xl bg-clip-border w-full">
                <Image alt={"sample"} src={noImage} />
              </div>
              <div className="flex justify-between p-6 text-dark-theme">
                <span className="block antialiased leading-relaxed ">
                  Product Name
                </span>
                <span className="font-bold text-2xl">Price</span>
              </div>
              <span className="text-right px-6 pb-6 text-emerald-500">
                status
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
