"use client";
import { getBusinessStats } from "@/lib/cruds/businessCrud";
import { getTotalAlertCount } from "@/lib/cruds/newsCrud";
import Image from "next/image";
import React, { useEffect } from "react";

const AdminFigures = () => {
  const [alertsCount, setAlertsCount] = React.useState<any>(0);
  const [totalBusinesses, setTotalBusinesses] = React.useState<any>({
    total: 0,
    acceptedCount: 0,
    notAcceptedCount: 0,
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      const alerts = await getTotalAlertCount();
      setAlertsCount(alerts);
    };
    const fetchBusinesses = async () => {
      const businesses = await getBusinessStats();
      console.log("🚀 ~ fetchBusinesses ~ businesses:", businesses);
      setTotalBusinesses(businesses);
    };
    fetchAlerts();
    fetchBusinesses();
  }, []);

  return (
    <div className=" flex items-center justify-normal flex-wrap sm:flex-nowrap gap-2 md:gap-6  p-4 w-full">
      <div className=" bg-white flex flex-row sm:flex-col  items-start justify-between sm:justify-start pl-6 py-4 w-full ">
        <div>
          <p className=" font-semibold text-xs md:text-base text-slate-400">
            Total Businesses
          </p>
          <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
            {totalBusinesses.total! < 10 && totalBusinesses.total! > 0
              ? `0${totalBusinesses.total}`
              : totalBusinesses.total}
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
            Pending Requests
          </p>
          <h1 className=" text-xl md:text-3xl font-bold text-slate-700">
            {totalBusinesses.notAcceptedCount! < 10 &&
            totalBusinesses.notAcceptedCount! > 0
              ? `0${totalBusinesses.notAcceptedCount}`
              : totalBusinesses.notAcceptedCount}
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
            {totalBusinesses.acceptedCount! < 10 &&
            totalBusinesses.acceptedCount! > 0
              ? `0${totalBusinesses.acceptedCount}`
              : totalBusinesses.acceptedCount}
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
  );
};

export default AdminFigures;
