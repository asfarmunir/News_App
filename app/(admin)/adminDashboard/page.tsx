import React from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
import Graph from "@/components/shared/Graph";
const page = () => {
  return (
    <div className=" flex flex-col items-start justify-start p-4 bg-slate-50 w-full">
      <div className=" flex items-center justify-normal flex-wrap sm:flex-nowrap gap-2 md:gap-6  p-4 w-full">
        <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
          <div>
            <p className=" font-semibold text-xs md:text-base text-slate-400">
              Total Businesses
            </p>
            <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
              1200
            </h1>
          </div>
          <Image
            src={"/icons/briefcaseBlack.svg"}
            width={20}
            height={20}
            className="w-7 md:w-11 bg-brown-300 p-1 md:p-2.5 rounded-xl h-7 md:h-10 mt-2 text-slate-700"
            alt="img"
          />
        </div>
        <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
          <div>
            <p className=" font-semibold text-xs md:text-base text-slate-400">
              Total Alerts
            </p>
            <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
              830
            </h1>
          </div>
          <Image
            src={"/icons/newspaperBlack.svg"}
            width={20}
            height={20}
            className="w-7 md:w-11 bg-brown-300 p-1 md:p-2.5 rounded-xl h-7 md:h-10 mt-2 text-slate-700"
            alt="img"
          />
        </div>
        <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
          <div>
            <p className=" font-semibold text-xs md:text-base text-slate-400">
              Pending Requests
            </p>
            <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
              830
            </h1>
          </div>
          <Image
            src={"/icons/addUser.svg"}
            width={20}
            height={20}
            className="w-7 md:w-11 bg-brown-300 p-1 md:p-2.5 rounded-xl h-7 md:h-10 mt-2 text-slate-700"
            alt="img"
          />
        </div>
        <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
          <div>
            <p className=" font-semibold text-xs md:text-base text-slate-400">
              Accepted Requests
            </p>
            <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
              600
            </h1>
          </div>
          <Image
            src={"/icons/addUser.svg"}
            width={20}
            height={20}
            className="w-7 md:w-11 bg-brown-300 p-1 md:p-2.5 rounded-xl h-7 md:h-10 mt-2 text-slate-700"
            alt="img"
          />
        </div>
      </div>

      <Graph />
      <div className=" bg-white p-5 rounded-lg w-full">
        <h3 className=" text-slate-800 font-bold text-2xl pb-3">Statistics</h3>

        <div className="flex items-center justify-start gap-3  md:gap-6 flex-wrap">
          <div className=" bg-brown/30 w-full sm:w-fit flex items-center justify-start sm:justify-center py-3 md:py-5 px-5  rounded-lg">
            <Image
              src={"/images/growth.png"}
              width={40}
              height={40}
              alt="growth"
              className=" mr-3 "
            />
            <div>
              <p className=" text-slate-700 text-xs md:text-sm font-thin">
                Max Registrations (month)
              </p>
              <h3 className=" text-sm md:text-base font-semibold">March</h3>
            </div>
          </div>
          <div className=" bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-3 md:py-5 px-5  rounded-lg">
            <Image
              src={"/images/wallet.png"}
              width={40}
              height={40}
              alt="growth"
              className=" mr-3"
            />
            <div>
              <p className=" text-slate-700 text-xs md:text-sm font-thin">
                Average Registrations (month)
              </p>
              <h3 className=" text-sm md:text-base font-semibold">2000 SAR</h3>
            </div>
          </div>
          <div className=" bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-1 md:py-2 px-2 md:pr-6  rounded-lg">
            <Image
              src={"/images/loss.png"}
              width={50}
              height={50}
              className=" mr-0 md:mr-2 w-[70px] h-[68px]"
              alt="growth"
            />
            <div>
              <p className=" text-slate-700 text-xs md:text-sm font-thin">
                Least Registrations (month)
              </p>
              <h3 className=" text-sm md:text-base font-semibold">April</h3>
            </div>
          </div>

          {/*  <div className=" bg-brown/30 flex items-center justify-center py-3 px-6 rounded-lg">
            <Image
              src={"/images/loss.png"}
              width={50}
              height={50}
              alt="growth"
            />
            <div>
              <p className=" text-slate-700 text-sm font-thin">
                Least News(month)
              </p>
              <h3 className=" font-semibold">April</h3>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
