import React from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

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
import { IoArrowBack } from "react-icons/io5";

const page = () => {
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
          <TableBody>
            <TableRow>
              <TableCell className="font-thin border-b pb-4 pt-4 text-center text-slate-500 border-slate-200">
                #123
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                Nike
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                John Doe
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                032042333
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                shoes
              </TableCell>

              <TableCell className="text-center border-b flex items-center justify-center w-full gap-3  border-slate-200">
                <Button className="rounded-md inline-flex items-center hover:text-green-600 hover:bg-green-500/20 bg-green-500/30 text-green-700 px-10 py-6 gap-2">
                  Accept
                </Button>
                <Button className="rounded-md inline-flex items-center hover:bg-red-500/20 bg-red-500/30 text-red-600 px-10 py-6 gap-2">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className=" w-full flex items-center justify-between mt-3">
          <p className=" font-semibold text-xs md:text-sm text-slate-800">
            Total Followers: 532
          </p>
          <div className="hidden md:flex items-center">
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

export default page;
