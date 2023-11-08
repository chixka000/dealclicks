import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";

export const Menu = () => {
  const [isShow, setShow] = React.useState(false)

  const handleShow = () => {
    setShow(!isShow)

  }
  const subMenu = [
    { name: "Best Seller", url: "" },
    { name: "About Us", url: "" },
    { name: "Message Us", url: "" },
    { name: "Feedback?", url: "" },
  ];

  const menu = [{ name: "Shoes", url: "" }];

  // console.log({ isShow })

  return (
    <Fragment>
      <header className="border-b bg-white font-sans">
        <section className="flex items-center justify-between relative px-10 min-h-[75px] shadow-md">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              width={150}
              height={150}
              alt="logo"
              priority
            />
          </Link>
          <ul className="flex space-x-8">
            {subMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="font-bold text-black hover:text-light-theme text-[15px]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>



          {/* <div className="lg:absolute lg:right-10 flex items-center ml-auto max-lg:justify-end">
            <div className="flex ml-auto lg:order-2">
              <button className="hover:text-light-theme">
                <FiSearch size={25} />
              </button>
              <button className="ml-7 hover:text-light-theme lg:hidden">
                <RxHamburgerMenu size={25} />
              </button>
            </div>asd
          </div> */}
          <div className="flex items-center gap-4">
            <button onClick={handleShow} className="border-2 border-dark-theme p-2 duration-300 hover:bg-dark-theme  rounded-full text-dark-theme hover:text-light-theme">
              <LuSearch size={20} />
            </button>
            <button className="bg-dark-theme hover:bg-light-theme text-light-theme hover:text-dark-theme py-2 px-6 hover:py-3 duration-300 rounded-3xl  font-bold">LET'S TALK</button>
          </div>
        </section>
        <div className={`flex flex-wrap items-center py-2 relative drop-shadow-xl transition-transform duration-500`}>
          <ul className="flex justify-center lg:space-x-8 max-lg:space-y-2 max-lg:block w-full">
            {Array.from({ length: 10 }, (_, idx) => (
              <Fragment key={idx}>
                {menu.map((item, index) => (
                  <li className="max-lg:py-2" key={index}>
                    <Link
                      href={item.url}
                      className="lg:hover:text-light-theme font-bold text-dark-theme text-[16px] block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        </div>
      </header>
    </Fragment>
  );
};
