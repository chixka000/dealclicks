import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";

export const Menu = () => {
  const [isShow, setShow] = React.useState(false);

  const handleShow = () => {
    setShow(!isShow);
  };
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
      <header className="border-b bg-white">
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
                  className="font-bold text-2xl text-dark-theme hover:text-light-theme"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-2 border-dark-theme rounded-full px-4">
            <input type="text" className="outline-none" />
            <button
              onClick={handleShow}
              className="text-dark-theme p-2 rounded-full"
            >
              <LuSearch size={25} />
            </button>
          </div>
        </section>
        <div
          className={`flex flex-wrap items-center py-2 relative drop-shadow-xl transition-transform duration-500`}
        >
          <ul className="flex justify-center lg:space-x-8 max-lg:space-y-2 max-lg:block w-full">
            {Array.from({ length: 10 }, (_, idx) => (
              <Fragment key={idx}>
                {menu.map((item, index) => (
                  <li className="max-lg:py-2" key={index}>
                    <Link
                      href={item.url}
                      className="lg:hover:text-light-theme font-base text-dark-theme text-[17px] block tracking-wider"
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
