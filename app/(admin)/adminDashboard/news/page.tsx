"use client";
import React, { useState, useEffect } from "react";
import { getAllAlerts } from "@/lib/cruds/newsCrud";
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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Search from "@/components/shared/Search";
import Link from "next/link";
import { FaAngleDown, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import DeleteNews from "@/components/shared/DeleteNews";

type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ searchParams }: SearchParamProps) => {
  const searchText = (searchParams?.query as string) || "";

  const fetchAlerts = async () => {
    setLoading(true);
    const alerts = await getAllAlerts(searchText);
    setAlerts(alerts);
    setCurrentPage(1); // Reset to page 1 after new data is fetched
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(alerts.length / itemsPerPage);

  // Get current items
  const currentItems = alerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start p-4  bg-slate-50 w-full">
      <div className=" w-full flex gap-4 items-center justify-start mt-4 px-6">
        {searchText !== "" && (
          <>
            <div className="flex flex-row w-full gap-4  items-center mb-7 justify-start flex-nowrap">
              <h2 className="text-lg font-normal ml-4 text-nowrap">
                Showing Posts for{" "}
                <span className="text-gray-800 font-semibold capitalize">
                  {searchText}
                </span>
              </h2>
              <div className=" w-full border border-slate-300/80"></div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className=" bg-white pt-5 px-8 rounded-md shadow-sm w-full">
          <div className=" w-full flex items-center  justify-between mb-4">
            <h2 className=" text-slate-900 font-bold text-2xl ">
              Posted Alerts
            </h2>
            <div className="inline-flex items-center gap-2">
              <p className=" font-semibold text-lg">Business:</p>
              <Search />
            </div>
          </div>{" "}
        </div>
        <div className="w-full bg-white p-5 px-8 rounded-md shadow-sm">
          <Table>
            {currentItems.length === 0 && !loading && (
              <TableCaption className=" py-5 font-semibold">
                No Alerts Found for this Business
              </TableCaption>
            )}
            <TableHeader className="bg-brown/50">
              <TableRow>
                <TableHead className="text-slate-950 font-bold text-center">
                  PID
                </TableHead>
                <TableHead className="text-slate-950 font-bold">
                  Title
                </TableHead>
                <TableHead className="text-slate-950 font-bold text-center">
                  Business Name
                </TableHead>
                <TableHead className="text-slate-950 font-bold">
                  Owner Name
                </TableHead>
                <TableHead className="text-slate-950 font-bold">
                  Posted On
                </TableHead>
                <TableHead className="text-center text-slate-950 font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {!loading && (
              <TableBody>
                {currentItems.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">#{index + 1}</TableCell>
                    <TableCell className="truncate font-semibold max-w-[100px]">
                      {alert.name}
                    </TableCell>
                    <TableCell className="text-center truncate max-w-[200px]">
                      {alert.creatorDetails?.BusinessName}
                    </TableCell>
                    <TableCell>
                      {alert.creatorDetails?.BusinessOwnerName}
                    </TableCell>
                    <TableCell className=" font-bold">{alert.date}</TableCell>
                    <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger
                              className=" bg-slate-50 hover:bg-slate-100 my-1 font-semibold
                       text-slate-900 text-center w-full px-8 py-3 "
                            >
                              View full details
                            </AlertDialogTrigger>
                            <AlertDialogContent className=" bg-white md:min-w-[700px] 2xl:min-w-[900px]  flex items-center justify-center flex-col py-3 gap-6 ">
                              <div className=" w-full flex items-end justify-end">
                                <AlertDialogCancel className=" bg-red-500 text-white text-lg font-bold rounded-md">
                                  <IoClose className=" w-6 h-6 font-semibold " />
                                </AlertDialogCancel>
                              </div>
                              <AlertDialogHeader className=" px-12">
                                <AlertDialogTitle className=" capitalize text-3xl font-semibold">
                                  {alert.name}
                                </AlertDialogTitle>
                              </AlertDialogHeader>

                              <AlertDialogDescription className=" text-slate-900 max-h-60 2xl:max-h-80 overflow-y-auto px-12">
                                {alert.description}
                              </AlertDialogDescription>
                              <div className=" w-full flex items-center justify-between px-12 mb-8">
                                <Link
                                  href={"/"}
                                  className=" text-indigo-400 text-sm font-thin "
                                >
                                  {alert.link}
                                </Link>
                                <p className=" text-sm font-thin text-slate-600">
                                  {alert.date}
                                </p>
                              </div>
                              {/* <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                            </AlertDialogContent>
                          </AlertDialog>
                          <DropdownMenuSeparator />
                          <DeleteNews newsId={alert.newsId} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
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

          <div className=" w-full flex items-center justify-between mt-3 gap-4">
            <p className=" font-semibold text-xs md:text-sm text-slate-800">
              Total Alerts: {alerts.length}
            </p>
            {alerts.length > 0 && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
                >
                  <FaArrowLeft />
                </button>
                <div className="flex gap-2">
                  {Array.from(
                    { length: Math.ceil(alerts.length / itemsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        className={`border disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-300  disabled:cursor-not-allowed border-slate-500  w-10 h-10 font-thin flex items-center justify-center    rounded-lg ${
                          currentPage === index + 1
                            ? "bg-primary  text-white"
                            : "bg-white  text-black"
                        }`}
                        // disabled={page === index + 1}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  // disabled={currentPage === totalPages}
                  disabled={
                    currentPage >= Math.ceil(alerts.length / itemsPerPage)
                  }
                  className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
