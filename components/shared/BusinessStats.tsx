"use client";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { getAllBusinesses } from "@/lib/cruds/businessCrud";

interface IBusiness {
  name: string;
  description: string;
  link: string;
  date: string;
  creatorId: string;
  creatorEmail: string;
  timestamp: Timestamp;
  businessId: string;
  creatorDetails?: any;
}

interface BusinessStats {
  monthWithMostRegistrations: string;
  monthWithLeastRegistrations: string;
  averageRegistrationsPerMonth: number;
}

const getMonthYearKey = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const calculateBusinessStats = (businesses: IBusiness[]): BusinessStats => {
  const registrationsPerMonth: { [key: string]: number } = {};

  businesses.forEach((business) => {
    const date = new Date(business.timestamp.seconds * 1000);
    const key = getMonthYearKey(date);

    if (!registrationsPerMonth[key]) {
      registrationsPerMonth[key] = 0;
    }

    registrationsPerMonth[key]++;
  });

  const months = Object.keys(registrationsPerMonth);
  const registrationCounts = Object.values(registrationsPerMonth);

  const maxRegistrations = Math.max(...registrationCounts);
  const minRegistrations = Math.min(...registrationCounts);
  const totalRegistrations = registrationCounts.reduce((a, b) => a + b, 0);
  const averageRegistrationsPerMonth = totalRegistrations / months.length;
  const monthWithMostRegistrations =
    months[registrationCounts.indexOf(maxRegistrations)];
  const monthWithLeastRegistrations =
    months[registrationCounts.indexOf(minRegistrations)];

  return {
    monthWithMostRegistrations,
    monthWithLeastRegistrations,
    averageRegistrationsPerMonth,
  };
};

const BusinessStatsDisplay = () => {
  const [stats, setStats] = useState<BusinessStats | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await getAllBusinesses(); // Fetch businesses from Firestore
      const stats = calculateBusinessStats(businesses);
      setStats(stats);
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="w-full">
      {stats && (
        <div className="bg-white p-5 rounded-lg w-full">
          <h3 className="text-slate-800 font-bold text-2xl pb-3">
            Business Registration Statistics
          </h3>

          <div className="flex items-center justify-start gap-3 md:gap-6 flex-wrap">
            <div className="bg-brown/30 w-full sm:w-fit flex items-center justify-start sm:justify-center py-3 md:py-5 px-5 rounded-lg">
              <Image
                src={"/images/growth.png"}
                width={40}
                height={40}
                alt="growth"
                className="mr-3"
              />
              <div>
                <p className="text-slate-700 text-xs md:text-sm font-thin">
                  Max Registrations (month)
                </p>
                <h3 className="text-sm md:text-base font-semibold">
                  {stats.monthWithMostRegistrations}
                </h3>
              </div>
            </div>
            <div className="bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-3 md:py-5 px-5 rounded-lg">
              <Image
                src={"/images/wallet.png"}
                width={40}
                height={40}
                alt="average"
                className="mr-3"
              />
              <div>
                <p className="text-slate-700 text-xs md:text-sm font-thin">
                  Average Registrations (month)
                </p>
                <h3 className="text-sm md:text-base font-semibold">
                  {stats.averageRegistrationsPerMonth.toFixed(0)}
                </h3>
              </div>
            </div>
            <div className="bg-brown/30 flex w-full sm:w-fit items-center justify-start sm:justify-center py-1 md:py-2 px-2 md:pr-6 rounded-lg">
              <Image
                src={"/images/loss.png"}
                width={50}
                height={50}
                className="mr-0 md:mr-2 w-[70px] h-[68px]"
                alt="least"
              />
              <div>
                <p className="text-slate-700 text-xs md:text-sm font-thin">
                  Least Registrations (month)
                </p>
                <h3 className="text-sm md:text-base font-semibold">
                  {stats.monthWithLeastRegistrations}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessStatsDisplay;
