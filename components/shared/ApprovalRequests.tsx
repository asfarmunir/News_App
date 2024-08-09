"use client";
import React, { useState, useEffect } from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import {
  getAllApprovalRequests,
  approveRequest,
} from "@/lib/cruds/businessCrud";
import { ThreeDots } from "react-loader-spinner";
const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRequests = async () => {
      console.log("helo");

      const requests = getAllApprovalRequests((requests) => {
        setRequests(requests);
        setIsLoading(false);
      });
      //   setIsLoading(false);

      console.log("velo");
    };
    fetchRequests();
  }, []);

  console.log("Requests -> requests", requests);

  const acceptRequest = async (email: string) => {
    console.log("accepting request", email);

    const response = await approveRequest(email);
    console.log("acceptRequest -> response", response);
  };

  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <div className=" w-full flex gap-4 items-center justify-start mt-4 px-6">
        <Link
          href={"/adminDashboard/businesses"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <IoArrowBack className="w-6 h-6" />
          <h2 className="text-xl font-normal ml-4 text-nowrap ">
            Follow Requests
          </h2>
        </Link>

        <div className=" w-full border border-slate-300/80"></div>
      </div>

      <div className=" bg-white p-5 px-2 md:px-8 rounded-md shadow-sm w-full">
        <div className=" w-full flex items-center  justify-between mb-4">
          <h2 className=" text-slate-900 font-bold text-2xl ">
            Follow Requests
          </h2>
          <Button className="rounded-xl inline-flex items-center gap-2">
            Accept All <FaCheck className="w-3 h-3 text-white" />
          </Button>
        </div>

        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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

              <TableHead className=" text-center  text-slate-950 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading && (
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-thin border-b pb-4 pt-4 text-center text-slate-500 border-slate-200">
                    #{index + 1}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {request.BusinessName}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {request.BusinessOwnerName}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {request.PhoneNumber}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {request.BusinessCategory}
                  </TableCell>

                  <TableCell className="text-center border-b flex items-center justify-center w-full gap-3  border-slate-200">
                    <Button
                      onClick={() => acceptRequest(request.email)}
                      className="rounded-md inline-flex items-center hover:text-green-600 hover:bg-green-500/20 bg-green-500/30 text-green-700 px-10 py-6 gap-2"
                    >
                      Accept
                    </Button>
                    <Button className="rounded-md inline-flex items-center hover:bg-red-500/20 bg-red-500/30 text-red-600 px-10 py-6 gap-2">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {isLoading && (
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
            Total Requests:{" "}
            {requests.length < 10 && requests.length > 0
              ? `0${requests.length}`
              : requests.length}
          </p>
          {/* <div className="hidden md:flex items-center">
            <p className=" font-semibold text-sm text-nowrap text-slate-800 mr-2">
              1-2 of pages
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
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Requests;
