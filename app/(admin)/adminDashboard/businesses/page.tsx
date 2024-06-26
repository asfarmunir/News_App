import React from "react";
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

const page = () => {
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
            <p className=" absolute -top-3 -left-3 text-xs bg-red-600 text-white rounded-full p-2 pr-2.5">
              +2
            </p>
          </Button>
        </Link>
      </div>
      <div className=" bg-white p-5 px-2 md:px-8 rounded-md shadow-sm w-full">
        <div className=" w-full flex items-center  justify-between mb-4">
          <h2 className=" text-slate-900 font-bold text-2xl ">Businesses</h2>
          <Image
            src={"/icons/filter.svg"}
            width={35}
            height={35}
            alt="icon"
            className=" hover:shadow-2xl hover:cursor-pointer"
          />
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
              <TableCell className="font-semibold text-center border-b pb-4 pt-4 border-slate-200">
                27/03/2024
              </TableCell>
              <TableCell className="font-semibold underline border-b pb-4 pt-4 text-center text-indigo-500 border-slate-200">
                300
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
