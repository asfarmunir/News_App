import React from "react";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex items-center justify-start pt-24 flex-col w-full h-svh gap-4">
      <Image src="/images/success.png" alt="Success" width={120} height={120} />
      <h2 className="text-xl font-semibold text-black">Alert Posted</h2>
      <p className="text-slate-600 font-thin text-sm max-w-xs text-center">
        Now users will be able to see your alert on their feed.
      </p>
      <Link
        href={"/businessDashboard/followers/add"}
        className=" w-[95%] bg-primary rounded-lg py-5 text-white text-center  mt-4"
      >
        Add Another Post
      </Link>
    </div>
  );
};

export default page;
