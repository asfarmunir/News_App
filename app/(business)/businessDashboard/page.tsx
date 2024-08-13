import React from "react";
import Graph from "@/components/shared/Graph";
import Image from "next/image";
import { getTotalAlerts } from "@/lib/cruds/newsCrud";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBusinessFollowers } from "@/lib/cruds/businessCrud";
import AlertStats from "@/components/shared/AlertStats";

interface IUser {
  email: string;
  uid: string;
}

const Page = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    redirect("/");
  }
  const userData = JSON.parse(userCookie?.value) as IUser;
  const alertsCount = await getTotalAlerts(userData.email);
  const followers = await getBusinessFollowers(userData.email);

  return (
    <div className=" flex flex-col items-start justify-start p-4 bg-slate-50 w-full">
      <div className=" flex items-center justify-normal flex-wrap sm:flex-nowrap gap-2 md:gap-6  p-4 w-full">
        <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
          <div>
            <p className=" font-semibold text-xs md:text-base text-slate-400">
              Total Alerts
            </p>
            <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
              {alertsCount! < 10 && alertsCount! > 0
                ? `0${alertsCount}`
                : alertsCount}
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
              Total Followers
            </p>
            {followers ? (
              <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
                {followers.length < 10 && followers.length > 0
                  ? `0${followers.length}`
                  : followers.length}
              </h1>
            ) : (
              <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
                0
              </h1>
            )}
          </div>
          <Image
            src={"/icons/followersBlack.svg"}
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

      <AlertStats />
    </div>
  );
};

export default Page;
