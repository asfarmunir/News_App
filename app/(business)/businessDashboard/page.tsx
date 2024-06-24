import React from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
const page = () => {
  return (
    <div className=" flex flex-col items-start justify-start p-4 bg-slate-50 w-full">
      <div className=" flex items-center justify-normal gap-6 flex-wrap p-4 w-full">
        <div className=" bg-white flex flex-col items-start justify-start pl-6 py-4 pr-36 ">
          <p className=" font-thin text-slate-600">Total News</p>
          <h1 className=" text-3xl font-bold text-slate-700">1200</h1>
          <PiNewspaperFill className="w-10 bg-brown/60 p-2 rounded-lg h-10 mt-2 text-slate-700" />
        </div>
        <div className=" bg-white flex flex-col items-start justify-start pl-6 py-4 pr-36 ">
          <p className=" font-thin text-slate-600">Total News</p>
          <h1 className=" text-3xl font-bold text-slate-700">1200</h1>
          <PiNewspaperFill className="w-10 bg-brown/60 p-2 rounded-lg h-10 mt-2 text-slate-700" />
        </div>
        <div className=" bg-white flex flex-col items-start justify-start pl-6 py-4 pr-36 ">
          <p className=" font-thin text-slate-600">Total News</p>
          <h1 className=" text-3xl font-bold text-slate-700">1200</h1>
          <PiNewspaperFill className="w-10 bg-brown/60 p-2 rounded-lg h-10 mt-2 text-slate-700" />
        </div>
        <div className=" bg-white flex flex-col items-start justify-start pl-6 py-4 pr-36 ">
          <p className=" font-thin text-slate-600">Total News</p>
          <h1 className=" text-3xl font-bold text-slate-700">1200</h1>
          <PiNewspaperFill className="w-10 bg-brown/60 p-2 rounded-lg h-10 mt-2 text-slate-700" />
        </div>
      </div>
      <div className=" bg-white p-5 rounded-lg w-full">
        <h3 className=" text-slate-800 font-bold text-2xl pb-3">Statistics</h3>

        <div className="flex items-center justify-start gap-6">
          <div className=" bg-brown/30 flex items-center justify-center py-5 px-8 rounded-lg">
            <Image
              src={"/images/growth.png"}
              width={40}
              height={40}
              alt="growth"
              className=" mr-3"
            />
            <div>
              <p className=" text-slate-700 text-sm font-thin">
                Most News(month)
              </p>
              <h3 className=" font-semibold">March</h3>
            </div>
          </div>
          <div className=" bg-brown/30 flex items-center justify-center py-5 px-8 rounded-lg">
            <Image
              src={"/images/wallet.png"}
              width={40}
              height={40}
              alt="growth"
              className=" mr-3"
            />
            <div>
              <p className=" text-slate-700 text-sm font-thin">
                Average Posting (month)
              </p>
              <h3 className=" font-semibold">2000 SAR</h3>
            </div>
          </div>
          <div className=" bg-brown/30 flex items-center justify-center py-3 px-6 rounded-lg">
            <Image
              src={"/images/loss.png"}
              width={50}
              height={50}
              alt="growth"
              className=" mr-2 w-16 h-16"
            />
            <div>
              <p className=" text-slate-700 text-sm font-thin">
                Least News(month)
              </p>
              <h3 className=" font-semibold">April</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
