"use client";
import React, { useEffect, useState } from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useAuth } from "@/utils/AuthProvider";
import {
  Table,
  TableBody,
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
import { getBusinessFollowers } from "@/lib/cruds/businessCrud";
import { fetchUserDetails } from "@/lib/cruds/userCrud";
import { ThreeDots } from "react-loader-spinner";

interface Follower {
  userId: string;
  followedOn: any;
}

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  followedOn: any;
}

const Page = () => {
  const { user } = useAuth();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && user.email) {
      console.log("user", user);

      const BusinessDetails = async () => {
        const businessFollowers = await getBusinessFollowers(user.email);
        console.log("businessFollowers", businessFollowers);
        setFollowers(businessFollowers);

        const usersArray: User[] = [];
        for (const follower of businessFollowers) {
          const user = await fetchUserDetails(follower.userId);
          if (user) {
            usersArray.push({
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              location: user.location,
              followedOn: follower.followedOn,
            });
          }
        }
        setUsers(usersArray);
        setLoading(false);
      };

      BusinessDetails();
    }
  }, [user]);
  console.log("all user details", users);

  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <Link href={"/businessDashboard/followers/add"}>
        <Button className=" ml-4 bg-primary text-base md:text-lg text-white px-6 md:px-10 py-6 md:py-7 rounded-lg">
          {" "}
          Add Follower{" "}
          <IoMdAdd className="w-5 md:w-6 h-5 md:h-6 ml-5 text-black bg-brown  rounded-lg " />
        </Button>
      </Link>
      <div className=" bg-white p-5 px-8 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-2xl mb-4">Followers</h2>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold">PID</TableHead>
              <TableHead className=" text-slate-950 font-bold">Name</TableHead>
              <TableHead className=" text-slate-950 font-bold">Email</TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Phone Number
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Location
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">
                Followed On
              </TableHead>
              <TableHead className=" text-center text-slate-950 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {!loading && (
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200 text-slate-400">
                    #{index + 1}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {user.name}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200 ">
                    {user.email}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {user.location}
                  </TableCell>
                  <TableCell className="font-bold border-b pb-4 pt-4 border-slate-200">
                    {user.followedOn.toDate().toDateString()}
                  </TableCell>
                  <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-slate-100 my-1 font-semibold text-slate-900 text-center w-full px-12 py-3">
                          Hide Alert
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="bg-red-100 my-1 font-semibold text-red-700 text-center w-full px-12 py-3">
                          Block User
                        </DropdownMenuItem>
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
