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
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <Link href={"/businessDashboard/news/add"}>
        <Button className=" ml-4 bg-primary text-lg text-white px-10 py-7 rounded-lg">
          {" "}
          Post News{" "}
          <IoMdAdd className="w-6 h-6 ml-5 text-black bg-brown  rounded-lg " />
        </Button>
      </Link>
      <div className=" bg-white p-5 px-8 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-2xl mb-4">Followers</h2>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold">PID</TableHead>
              <TableHead className=" text-slate-950 font-bold">Title</TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Description
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">Links</TableHead>
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
              <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                #123
              </TableCell>
              <TableCell className="font-thin border-b pb-4 truncate max-w-[100px] pt-4 border-slate-200">
                <AlertDialog>
                  <AlertDialogTrigger className=" truncate max-w-28 ">
                    We have got a new project to work on.
                  </AlertDialogTrigger>
                  <AlertDialogContent className=" bg-white  flex items-center justify-center flex-col py-3 gap-6 ">
                    <div className=" w-full flex items-end justify-end">
                      <AlertDialogCancel className=" bg-red-500 text-white text-lg font-bold rounded-md">
                        X
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                sunt eum natus itaque assumenda distinctio? Non, quos. Nobis
                aperiam cumque repellendus aliquid dolores, atque, deserunt
                eveniet deleniti, porro corporis enim!
              </TableCell>
              <TableCell className="font-thin text-indigo-400 border-b pb-4 pt-4 border-slate-200">
                www.google.com
              </TableCell>
              <TableCell className="font-semibold border-b  pb-4 pt-4 border-slate-200">
                27 May 2024
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
          <p className=" font-semibold text-sm text-slate-800">
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
