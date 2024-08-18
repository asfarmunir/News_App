"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAuth } from "@/utils/AuthProvider";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBusinessFollowers, removeFollower } from "@/lib/cruds/businessCrud";
import { fetchUserDetails } from "@/lib/cruds/userCrud";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";

interface Follower {
  userId: string;
  followedOn: any;
}

interface User {
  id: string;
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user && user.email) {
      const BusinessDetails = async () => {
        const businessFollowers = await getBusinessFollowers(user.email);

        if (businessFollowers) {
          setFollowers(businessFollowers);
          const usersArray: User[] = [];
          for (const follower of businessFollowers) {
            const user = await fetchUserDetails(follower.userId);
            console.log("🚀 ~ BusinessDetails ~ user:", user);
            if (user) {
              usersArray.push({
                id: follower.userId,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                location: user.location,
                followedOn: follower.followedOn,
              });
            }
          }
          setUsers(usersArray);
        }

        setLoading(false);
      };

      BusinessDetails();
    }
  }, [user]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const removeHandler = async (userId: string) => {
    toast.loading("Removing follower...");
    const res = await removeFollower(user.email, userId);
    if (res.success) {
      toast.dismiss();
      toast.success(res.message);
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      toast.dismiss();
      toast.error(res.message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <Link href={"/businessDashboard/followers/add"}>
        <Button className="ml-4 bg-primary text-base md:text-lg text-white px-6 md:px-10 py-6 md:py-7 rounded-lg">
          {" "}
          Add Follower{" "}
          <IoMdAdd className="w-5 md:w-6 h-5 md:h-6 ml-5 text-black bg-brown rounded-lg " />
        </Button>
      </Link>
      <div className="bg-white p-5 px-8 rounded-md shadow-sm w-full">
        <h2 className="text-slate-900 font-bold text-2xl mb-4">Followers</h2>
        <Table>
          {!followers.length && !loading && (
            <TableCaption className="py-2">
              {" "}
              This business has no followers yet.{" "}
            </TableCaption>
          )}
          <TableHeader className="bg-brown/50">
            <TableRow>
              <TableHead className="text-slate-950 font-bold">PID</TableHead>
              <TableHead className="text-slate-950 font-bold">Name</TableHead>
              <TableHead className="text-slate-950 font-bold">Email</TableHead>
              <TableHead className="text-slate-950 font-bold">
                Phone Number
              </TableHead>
              <TableHead className="text-slate-950 font-bold">
                Location
              </TableHead>
              <TableHead className="text-slate-950 font-bold">
                Followed On
              </TableHead>
              <TableHead className="text-center text-slate-950 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {!loading && (
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200 text-slate-400">
                    #{indexOfFirstItem + index + 1}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
                    {user.name}
                  </TableCell>
                  <TableCell className="font-thin border-b pb-4 pt-4 border-slate-200">
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
                        <DropdownMenuItem
                          onClick={() => removeHandler(user.id)}
                          className="bg-red-100 my-1 font-semibold text-red-700 text-center w-full px-12 py-3"
                        >
                          Remove Follower
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
          <div className="w-full flex py-4 justify-center">
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
          <p className="font-semibold text-xs md:text-sm text-slate-800">
            Total Followers: {users.length}
          </p>
          {followers.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <p className=" font-semibold text-sm text-nowrap text-slate-800 mr-2">
                1 - {Math.ceil(totalPages / itemsPerPage)} of Pages
              </p>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
              >
                <FaArrowLeft />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
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
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
