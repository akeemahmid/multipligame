import Snakegrid from "@/components/Snakegrid";
import Image from "next/image";
import logo from "../public/multiimage.png";
import { FaXTwitter } from "react-icons/fa6";
export default function Home() {
  return (
    <div className="container flex-wrap mx-auto text-center flex flex-col">
      <nav className=" w-full bg-[#090a0c] text-[#FFFFFFB2] border-1 border-[#3a2d52] rounded-4xl mt-5 md:mt-7 py-3 md:py-4 px-4 md:px-8  ">
        <div className="flex items-center justify-between">
          <a href="https://multipli.fi/">
            <Image src={logo} alt="name" className="w-[90px] md:w-[150px]" />
          </a>
          <h3 className="font-semibold text-[18px] md:text-xl md:font-bold">
            Game/Quiz
          </h3>
        </div>
      </nav>

      <Snakegrid />

      <div className="flex w-full items-end cursor-pointer justify-end  text-right mt-[5%] ">
        <a
          href="https://x.com/haakimii__"
          className="rounded-3xl py-4 px-5  bg-gradient-to-r text-white  from-[#a66cff] to-[#3E3170] font-bold text-[16px] flex items-center gap-2"
        >
          <FaXTwitter className="text-xl" />
          Hakimi
        </a>
      </div>
    </div>
  );
}
