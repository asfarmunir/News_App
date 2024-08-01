"use client";
import React, { useState, useEffect } from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiWarningOctagonLight } from "react-icons/pi";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import db from "@/lib/firebaseConfig";
import { getAllBusinesses } from "@/lib/cruds/businessCrud";
import { ThreeDots } from "react-loader-spinner";

const Page = () => {
  const collectionRef = collection(db, "businesses");
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<any | null>([]);
  useEffect(() => {
    const fetchCount = async () => {
      const q = query(collectionRef, where("requestAccepted", "==", false));

      // Get the count of documents matching the query
      const docsCount = await getCountFromServer(q);
      setRequestCount(docsCount.data().count);
    };
    fetchCount();
  }, [collectionRef]);
  useEffect(() => {
    const fetchAllBusinesses = async () => {
      const businesses = await getAllBusinesses();
      console.log("🚀 ~ fetchAllBusinesses ~ businesses:", businesses);
      setBusinesses(businesses);
      setLoading(false);
    };
    fetchAllBusinesses();
  }, [collectionRef]);

  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <div className="flex items-center justify-start gap-3 md:gap-6  ">
        <Link href={"/adminDashboard/businesses/add"}>
          <Button className=" ml-2  md:ml-4 bg-primary text-xs md:text-lg text-white px-3 md:px-10 py-2 md:py-7 rounded-lg">
            {" "}
            Add Business{" "}
            <IoMdAdd className="w-3 md:w-6 h-3 md:h-6 ml-5 text-black bg-brown  rounded-lg " />
          </Button>
        </Link>
        <Link href={"/adminDashboard/businesses/joinRequests"}>
          <Button className=" relative  bg-primary text-xs md:text-lg text-white px-3 md:px-10 py-2 md:py-7 rounded-lg">
            {" "}
            Join Request{" "}
            <FaArrowRightLong className="w-4 h-4 ml-3 md:ml-5 text-white   rounded-lg " />
            {requestCount > 0 ? (
              <p className=" absolute -top-3 -left-3 text-xs bg-red-600 text-white rounded-full text-center content-center w-7 h-7  ">
                {requestCount}
              </p>
            ) : null}
          </Button>
        </Link>
      </div>
      <div className=" bg-white p-5 px-2 md:px-8 rounded-md shadow-sm w-full">
        <div className=" w-full flex items-center  justify-between mb-4">
          <h2 className=" text-slate-900 font-bold text-2xl ">
            Registered Businesses
          </h2>
          <Image
            src={"/icons/filter.svg"}
            width={35}
            height={35}
            alt="icon"
            className=" hover:shadow-2xl hover:cursor-pointer"
          />
        </div>
        <Table>
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold text-center">
                PID
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">Name</TableHead>
              <TableHead className=" text-slate-950 font-bold">Owner</TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Phone Number
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Category
              </TableHead>
              <TableHead className=" text-center text-slate-950 font-bold">
                Joined On
              </TableHead>
              <TableHead className="  inline-flex  items-center justify-center w-full pl-4 gap-1 text-slate-950 font-bold">
                Posts{" "}
                <PiWarningOctagonLight className="w-5 text-indigo-600 font-extrabold h-5" />
              </TableHead>
              <TableHead className=" text-center  text-slate-950 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-thin border-b pb-4 pt-4 text-center text-slate-500 border-slate-200">
                  #{index + 1}
                </TableCell>
                <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                  {business.BusinessName}
                </TableCell>
                <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                  {business.BusinessOwnerName}
                </TableCell>
                <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                  {business.PhoneNumber}
                </TableCell>
                <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                  {business.BusinessCategory}
                </TableCell>
                <TableCell className="font-semibold text-center border-b pb-4 pt-4 border-slate-200">
                  {business.timestamp.toDate().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-semibold tracking-wider underline border-b pb-4 pt-4 text-center text-indigo-500 border-slate-200">
                  {business.totalAlerts < 10
                    ? `0${business.totalAlerts}`
                    : business.totalAlerts}
                </TableCell>
                <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="bg-slate-50 my-1 font-semibold text-slate-900 text-center w-full px-8 py-3">
                        Restrict Business
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="bg-red-100 my-1 font-semibold text-red-700 text-center w-full px-8 py-3">
                        Block Business
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className=" w-full flex py-4 justify-center">
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#00000"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        <div className=" w-full flex items-center justify-between mt-3">
          <p className=" font-semibold text-xs md:text-sm text-slate-800">
            Total Followers: 532
          </p>
          <div className="hidden md:flex items-center">
            <p className=" font-semibold text-sm text-nowrap text-slate-800 mr-2">
              1-2 of Pages
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  {/* <PaginationEllipsis /> */}
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
