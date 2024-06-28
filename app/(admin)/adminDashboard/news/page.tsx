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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
const page = () => {
  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <div className=" w-full flex gap-4 items-center justify-start mt-4 px-6">
        <Link
          href={"/adminDashboard/businesses"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <h2 className="text-lg font-normal ml-4 text-nowrap ">
            Showing Posts for Nike
          </h2>
        </Link>

        <div className=" w-full border border-slate-300/80"></div>
      </div>
      <div className=" bg-white p-5 px-8 rounded-md shadow-sm w-full">
        <div className=" w-full flex items-center  justify-between mb-4">
          <h2 className=" text-slate-900 font-bold text-2xl ">Alerts</h2>
          <div className="inline-flex items-center gap-2">
            <p className=" font-semibold text-lg">Business:</p>
            <div className=" bg-brown-400 inline-flex items-center py-1 px-4 rounded-lg">
              <CiSearch className="w-8 h-8 mr-2 text-slate-700 " />
              <Input
                type="text"
                className=" 
                bg-transparent  
                text-slate-900
                focus:outline-none
                focus:ring-0
                focus:border-transparent
                placeholder-slate-900
                
                
                "
                placeholder="Search"
              />
            </div>
          </div>
        </div>{" "}
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold text-center">
                PID
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">Title</TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Business Name
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Owner Name
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Posted On
              </TableHead>
              <TableHead className=" text-center text-slate-950 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-thin border-b pb-4 pt-4 text-slate-500 text-center border-slate-200">
                #123
              </TableCell>
              <TableCell className="font-thin border-b pb-4 truncate max-w-[100px] pt-4 border-slate-200">
                <AlertDialog>
                  <AlertDialogTrigger className=" truncate font-bold max-w-36 ">
                    We have got a new project to work on.
                  </AlertDialogTrigger>
                  <AlertDialogContent className=" bg-white  flex items-center justify-center flex-col py-3 gap-6 ">
                    <div className=" w-full flex items-end justify-end">
                      <AlertDialogCancel className=" bg-red-500 text-white text-lg font-bold rounded-md">
                        <IoClose className=" w-6 h-6 font-semibold " />
                      </AlertDialogCancel>
                    </div>
                    <AlertDialogHeader className=" px-12">
                      <AlertDialogTitle className=" text-3xl font-semibold">
                        We have got a new project to work on.
                      </AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogDescription className=" text-slate-900 px-12">
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers. This
                      action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </AlertDialogDescription>
                    <div className=" w-full flex items-center justify-between px-12 mb-8">
                      <Link
                        href={"/"}
                        className=" text-indigo-400 text-sm font-thin "
                      >
                        www.google.com
                      </Link>
                      <p className=" text-sm font-thin text-slate-600">
                        27/3/23
                      </p>
                    </div>
                    {/* <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 truncate max-w-[200px] border-slate-200">
                Nike
              </TableCell>
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                James Fod
              </TableCell>
              <TableCell className="font-bold border-b  pb-4 pt-4 border-slate-200">
                27/03/2024
              </TableCell>
              <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <button className="bg-slate-50 hover:bg-slate-100 my-1 font-semibold text-slate-900 text-center w-full px-8 py-3">
                      View full details
                    </button>
                    <DropdownMenuSeparator />

                    <button className="bg-red-100 my-1 hover:bg-red-200 font-semibold text-red-700 text-center w-full px-8 py-3">
                      Delete Post
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className=" w-full flex items-center justify-between mt-3">
          <p className=" font-semibold text-xs md:text-sm text-slate-800">
            Total Post: 1002
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
