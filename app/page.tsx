"use client"

import Image from "next/image";
import noImage from "../public/images/sample.jpg";
import React, { useEffect, useState } from "react";

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
      <div className="hero-image">
        <div className="hero-text inline-block">
          <button className="animate-bounce font-[700] hover:bg-light-theme hover:text-dark-theme text-[40px] rounded-tl-3xl rounded-br-3xl hover:rounded-tl-none hover:rounded-br-none hover:rounded-tr-3xl hover:rounded-bl-3xl transition duration-500 ease-in-out text-bold bg-dark-theme text-light-theme py-4 px-8 drop-shadow-2xl ">
            Click Me!
          </button>
        </div>
      </div>
      <div className="bg-[#f6f6f6]">
        <div className="grid grid-cols-3 gap-4 py-16 container mx-auto px-auto">
          {Array.from({ length: 3 }, (_, idx) => (
            <div className="relative shadow-2xl grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
              <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
              </div>
              <div className="relative p-6 px-6 py-14 md:px-12">
                <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                  Deal to click to check the details
                </h2>
                <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                  Mark Roda
                </h5>
                <img
                  alt="tania andrew"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  className="relative inline-block h-[74px] w-[74px] rounded-full border-2 border-white object-cover object-center"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
      {/* // * Content */}
      <div className="flex items-center w-full justify-between py-16 container mx-auto px-4">

        {Array.from({ length: 5 }, (_, idx) => (
          <div className="rounded-xl w-[250px] h-[290px] shadow-lg mx-auto mt-10 bg-gradient-to-r p-[6px] hover:from-[#04c3fd] from-light-theme hover:via-[#9333EA] via-none  hover:to-[#263852] to-dark-theme">
            <div className="relative flex flex-col h-full bg-white text-white rounded-lg">
              <div className="relative shadow-md overflow-hidden text-gray-700 bg-white shadow-lg rounded-t-xl bg-clip-border w-full">
                <Image alt={"sample"} src={noImage} />
              </div>
              <div className="p-6 text-center">

                {/* <h4 className="block mb-2 text-2xl antialiased font-bold leading-snug tracking-normal text-dark-theme">
                  Click Me!
                </h4> */}
                <p className="block text-bold antialiased text-[20px] font-medium leading-relaxed text-dark-theme">
                  CEO / Mark Roda
                </p>
                <div className="absolute grid overflow-hidden text-white shadow-lg  hover:shadow-light-theme h-28 place-items-center rounded-xl bg-white bg-clip-border shadow-2xl bottom-[-57px] w-full right-0">
                  <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-dark-theme">
                    Click Me!
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
