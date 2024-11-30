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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { getDeleteRequests } from "@/lib/cruds/userCrud";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const fetchDeleteRequests = async () => {
    setLoading(true);
    try {
      const data = await getDeleteRequests();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch delete requests.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDeleteRequests(); // Initial fetch when the component loads
  }, []);

  const handleStatusUpdate = async (userId: string, status: boolean) => {
    setIsDeleting(true);
    try {
      await fetch("/api/deleteUser", {
        method: "POST",
        body: JSON.stringify({ userId, requestAccepted: status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Delete request updated.");
      await fetchDeleteRequests(); // Refresh the user list
    } catch (error) {
      toast.error("An error occurred while updating the delete request.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className=" flex flex-col users-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <h2 className="text-xl font-semibold bg-white p-5 px-3 md:px-8  rounded-md w-full">
        User Management
      </h2>
      <div className=" bg-white p-5 px-3 md:px-8 rounded-md shadow-sm w-full">
        <Table>
          {!users.length && !loading && (
            <TableCaption className=" py-2"> No Delete Requests.</TableCaption>
          )}
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold text-center ">
                PID
              </TableHead>
              <TableHead className=" text-slate-950 font-bold">Name</TableHead>
              <TableHead className=" text-slate-950 font-bold text-center">
                Email
              </TableHead>
              <TableHead className=" text-slate-950 font-bold text-center">
                Businesses Followed
              </TableHead>

              <TableHead className=" text-center text-slate-950 font-bold">
                Account Delete Request
              </TableHead>
            </TableRow>
          </TableHeader>
          {!loading && (
            <TableBody>
              {users.map((user: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-thin border-b pb-4 text-center pt-4 text-slate-400 border-slate-200">
                      #{index + 1}
                    </TableCell>
                    <TableCell className="font-thin capitalize border-b pb-4 truncate max-w-[100px] pt-4 border-slate-200">
                      {user.name}
                    </TableCell>
                    <TableCell className="font-thin  border-b text-center pb-4 pt-4 truncate max-w-[200px] border-slate-200">
                      {user.email}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700 border-b text-center pb-4 pt-4 border-slate-200">
                      {user.followedBusinesses.length}
                    </TableCell>

                    <TableCell className="font-thin text-center border-b pb-4 pt-4  space-x-2 border-slate-200">
                      <Button
                        disabled={isDeleting}
                        onClick={() => handleStatusUpdate(user.userId, true)}
                        className="rounded-md disabled:opacity-40 inline-flex items-center hover:text-green-600 hover:bg-green-500/20 bg-green-500/30 text-green-700 px-10 py-6 gap-2"
                      >
                        Accept
                      </Button>
                      <Button
                        disabled={isDeleting}
                        onClick={() => handleStatusUpdate(user.userId, false)}
                        className="rounded-md disabled:opacity-40 inline-flex items-center hover:bg-red-500/20 bg-red-500/30 text-red-600 px-10 py-6 gap-2"
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
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
      </div>
    </div>
  );
};

export default Page;
