import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
const page = () => {
  return (
    <>
      <div className=" w-full flex gap-4 items-center justify-start mt-4 p-6 px-8">
        <Link
          href={"/businessDashboard/news"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <IoArrowBack className="w-6 h-6" />
          <h2 className="text-xl font-normal ml-4 text-nowrap ">Post Alert</h2>
        </Link>

        <div className=" w-full border border-slate-300/80"></div>
      </div>
      <div className="flex items-center justify-start pt-12 flex-col w-full h-svh gap-4">
        <Image
          src="/images/success.png"
          alt="Success"
          width={120}
          height={120}
        />
        <h2 className="text-xl font-semibold text-black">Alert Posted</h2>
        <p className="text-slate-600 font-thin text-sm max-w-xs text-center">
          Now users will be able to see your alert on their feed.
        </p>
        <Link
          href={"/businessDashboard/news/add"}
          className=" w-[95%] bg-primary rounded-lg py-5 text-white text-center  mt-4"
        >
          Add Another Post
        </Link>
      </div>
    </>
  );
};

export default page;
