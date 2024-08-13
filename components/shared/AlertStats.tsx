"use client";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { getAllAlertsforStats } from "@/lib/cruds/newsCrud";
import Image from "next/image";

interface IAlert {
  name: string;
  description: string;
  link: string;
  date: string;
  creatorId: string;
  creatorEmail: string;
  timestamp: any;
  newsId: string;
  creatorDetails?: any;
}

interface AlertStats {
  monthWithMostAlerts: string;
  monthWithLeastAlerts: string;
  averageAlertsPerMonth: number;
}

const getMonthYearKey = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const calculateAlertStats = (alerts: IAlert[]): AlertStats => {
  const alertsPerMonth: { [key: string]: number } = {};

  alerts.forEach((alert) => {
    const date = new Date(alert.timestamp.seconds * 1000);
    const key = getMonthYearKey(date);

    if (!alertsPerMonth[key]) {
      alertsPerMonth[key] = 0;
    }

    alertsPerMonth[key]++;
  });

  const months = Object.keys(alertsPerMonth);
  const alertCounts = Object.values(alertsPerMonth);

  const maxAlerts = Math.max(...alertCounts);
  const minAlerts = Math.min(...alertCounts);
  const totalAlerts = alertCounts.reduce((a, b) => a + b, 0);
  const averageAlertsPerMonth = totalAlerts / months.length;
  const monthWithMostAlerts = months[alertCounts.indexOf(maxAlerts)];
  const monthWithLeastAlerts = months[alertCounts.indexOf(minAlerts)];

  return {
    monthWithMostAlerts,
    monthWithLeastAlerts,
    averageAlertsPerMonth,
  };
};

const AlertStats = () => {
  const [stats, setStats] = useState<AlertStats | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      const alerts = await getAllAlertsforStats(); // Fetch alerts from Firestore
      const stats = calculateAlertStats(alerts);
      setStats(stats);
    };

    fetchAlerts();
  }, []);

  return (
    <div className=" w-full">
      {stats && (
        <div className=" bg-white p-5 rounded-lg w-full">
          <h3 className=" text-slate-800 font-bold text-2xl pb-3">
            Statistics
          </h3>

          <div className="flex items-center justify-start gap-3  md:gap-6 flex-wrap">
            <div className=" bg-brown/30 w-full sm:w-fit flex items-center justify-start sm:justify-center py-3 md:py-5 px-5 md:px-8 rounded-lg">
              <Image
                src={"/images/growth.png"}
                width={40}
                height={40}
                alt="growth"
                className=" mr-3 "
              />
              <div>
                <p className=" text-slate-700 text-xs md:text-sm font-thin">
                  Most Alerts(month)
                </p>
                <h3 className=" text-sm md:text-base font-semibold">
                  {stats.monthWithMostAlerts}
                </h3>
              </div>
            </div>
            <div className=" bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-3 md:py-5 px-5 md:px-8 rounded-lg">
              <Image
                src={"/images/wallet.png"}
                width={40}
                height={40}
                alt="growth"
                className=" mr-3"
              />
              <div>
                <p className=" text-slate-700 text-xs md:text-sm font-thin">
                  Average Posting (month)
                </p>
                <h3 className=" text-sm md:text-base font-semibold">
                  {stats.averageAlertsPerMonth.toFixed(0)} SAR
                </h3>
              </div>
            </div>
            <div className=" bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-1 md:py-2 px-2 md:px-8 rounded-lg">
              <Image
                src={"/images/loss.png"}
                width={50}
                height={50}
                className=" mr-2 w-[70px] h-[68px]"
                alt="growth"
              />
              <div>
                <p className=" text-slate-700 text-xs md:text-sm font-thin">
                  Least Alerts(month)
                </p>
                <h3 className=" text-sm md:text-base font-semibold">
                  {stats.monthWithLeastAlerts}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertStats;
