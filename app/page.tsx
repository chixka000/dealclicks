import Image from "next/image";
import noImage from "../public/images/sample.jpg";

export default function Home() {
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
      {/* // * Content */}
      <div className="flex items-center w-full justify-between py-16 gap-8 container mx-auto px-4">
        {Array.from({ length: 3 }, (_, idx) => (
          <div className="flex flex-col text-center">
            <div className="relative">
              <Image alt={"sample"} src={noImage} />
              <span className="absolute bottom-0 left-0 right-0 bg-black text-white text-center p-2 bg-opacity-50">
                Click Me!
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#f6f6f6]">
        <div className="grid grid-cols-3 gap-4 py-16 container mx-auto px-auto">
          {Array.from({ length: 9 }, (_, idx) => (
            <div className="flex flex-col">
              <Image alt={"sample"} src={noImage} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
