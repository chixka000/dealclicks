import Image from "next/image";
import noImage from "../public/images/no-image.webp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* // ! Banner */}
      <div className="hero-image">
        <div className="hero-text inline-block">
          <button className="font-[700] hover:bg-light-theme hover:text-dark-theme text-[40px] rounded-tl-3xl rounded-br-3xl hover:rounded-tl-none hover:rounded-br-none hover:rounded-tr-3xl hover:rounded-bl-3xl transition duration-300 ease-in-out text-bold bg-dark-theme text-light-theme py-4 px-8 drop-shadow-2xl ">
            Click Me!
          </button>
        </div>
      </div>
      {/* // * Content */}
      <div className="flex items-center w-full justify-between py-16 container mx-auto px-4">
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            key={idx}
            className="border-black border-2 p-16 flex flex-col text-center"
          >
            <span>LOGO</span>
            Click Me!
          </div>
        ))}
      </div>
      <div className="bg-[#f6f6f6]">
        <div className="grid grid-cols-3 gap-4 py-16 container mx-auto px-auto">
          {Array.from({ length: 9 }, (_, idx) => (
            <div
              key={idx}
              className="border-black border-2 p-16 flex flex-col text-center"
            >
              <span>LOGO</span>
              Click Me!
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
