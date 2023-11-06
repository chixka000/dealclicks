import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

export const Menu = () => {
  // * comment
  // ? comment
  // ! comment
  // TODO: comment

  const subMenu = [
    { name: "Best Seller", url: "" },
    { name: "About Us", url: "" },
    { name: "Message Us", url: "" },
    { name: "Feedback?", url: "" },
  ];

  const menu = [{ name: "Shoes", url: "" }];

  return (
    <Fragment>
      <header className="border-b bg-white">
        <section className="flex sm:items-center relative px-10 min-h-[75px] bg-header drop-shadow-xl ">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              width={150}
              height={150}
              alt="logo"
              priority
            />
          </Link>

          <ul className="flex space-x-8 lg:absolute lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 max-lg:hidden">
            {subMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="font-bold text-white hover:text-light-theme text-[15px]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="lg:absolute lg:right-10 flex items-center ml-auto max-lg:justify-end">
            <div className="flex ml-auto lg:order-2">
              <button className="hover:text-light-theme">
                <FiSearch size={25} />
              </button>
              <button className="ml-7 hover:text-light-theme lg:hidden">
                <RxHamburgerMenu size={25} />
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap items-center py-1 relative drop-shadow-xl ">
          <ul className="flex justify-center lg:space-x-8 max-lg:space-y-2 max-lg:block w-full">
            {Array.from({ length: 10 }, (_, idx) => (
              <Fragment key={idx}>
                {menu.map((item, index) => (
                  <li className="max-lg:py-2" key={index}>
                    <Link
                      href={item.url}
                      className="lg:hover:text-light-theme font-bold text-dark-theme text-[14px] block"
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
