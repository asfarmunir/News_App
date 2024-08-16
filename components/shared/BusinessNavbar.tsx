"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { getCurrentTime } from "@/lib/utils";
import { getBusinessDetails } from "@/lib/cruds/businessCrud";
const BusinessNavbar = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDetails = async () => {
    const data = await getBusinessDetails(user.email);
    setUserData(data);
  };

  return (
    <div className="flex items-center justify-between shadow-sm bg-white pb-4 py-3 px-5 md:px-10 w-full">
      <div className="flex flex-col">
        <h2 className=" text-lg md:text-xl font-bold">Business Dashboard</h2>
        <p className=" text-xs md:text-sm text-slate-700 font-thin">
          {getCurrentTime()}
        </p>
      </div>
      <div className=" inline-flex items-center gap-4">
        <p className=" text-sm md:text-base font-semibold">
          {userData?.BusinessOwnerName}
        </p>
        <Image
          src="/images/profile.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default BusinessNavbar;
