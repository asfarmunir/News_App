"use client";
import React, { useEffect, useState } from "react";
import { PiNewspaperFill } from "react-icons/pi";
import Image from "next/image";
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
import { IoClose } from "react-icons/io5";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  QueryDocumentSnapshot,
  startAfter,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import db from "@/lib/firebaseConfig";
import { ThreeDots } from "react-loader-spinner";
import { deleteAlert } from "@/lib/cruds/newsCrud";

interface IAlert {
  name: string;
  description: string;
  link: string;
  date: string;
  creatorId: string;
  creatorEmail: string;
  timeStamps: string;
  newsId: string;
}

const Page = () => {
  const collectionRef = collection(db, "alerts");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<IAlert[]>([]);
  const [count, setCount] = useState(0);
  const pageLimit = 10;
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [firstDoc, setFirstDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [page, setPage] = useState(1);

  const fetchData = async (userEmail: string) => {
    setLoading(true);

    const countQuery = query(
      collectionRef,
      where("creatorEmail", "==", userEmail)
    );
    const docsCount = await getCountFromServer(countQuery); // Adjust collection path if necessary
    setCount(docsCount.data().count);

    const q = query(
      collectionRef,
      where("creatorEmail", "==", userEmail),
      orderBy("name"),
      limit(pageLimit)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const items: IAlert[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as IAlert);
      });
      setNews(items);
      setLoading(false);
      setFirstDoc(querySnapshot.docs[0]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });

    return () => unsub();
  };

  useEffect(() => {
    if (user && user.email) {
      fetchData(user.email);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleNext = () => {
    if (lastDoc) {
      setLoading(true);
      const q = query(
        collectionRef,
        where("creatorEmail", "==", user.email),
        orderBy("name"),
        startAfter(lastDoc),
        limit(pageLimit)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        const items: IAlert[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data() as IAlert);
        });
        setNews(items);
        setFirstDoc(querySnapshot.docs[0]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setPage(page + 1);
        setLoading(false);
      });
      return () => unsub();
    }
  };

  const handlePrevious = () => {
    if (page > 1 && firstDoc) {
      setLoading(true);
      const q = query(
        collectionRef,
        where("creatorEmail", "==", user.email),
        orderBy("name"),
        endBefore(firstDoc),
        limitToLast(pageLimit)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        const items: IAlert[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data() as IAlert);
        });
        setNews(items);
        setFirstDoc(querySnapshot.docs[0]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setPage(page - 1);
        setLoading(false);
      });
      return () => unsub();
    }
  };

  const deleteHandler = (id: string) => async () => {
    setLoading(true);
    await deleteAlert(id);
    setCount(count - 1);
    setLoading(false);
  };

  return (
    <div className=" flex flex-col items-start justify-start p-4 gap-6 bg-slate-50 w-full">
      <Link href={"/businessDashboard/news/add"}>
        <Button className=" ml-2 md:ml-4 bg-primary text-base md:text-lg text-white px-6 md:px-10 py-6 md:py-7 rounded-lg">
          {" "}
          Post Alerts{" "}
          <IoMdAdd className="w-5 md:w-6 h-5 md:h-6 ml-6 md:ml-8 text-black bg-brown  rounded-lg " />
        </Button>
      </Link>
      <div className=" bg-white p-5 px-3 md:px-8 rounded-md shadow-sm w-full">
        <h2 className=" text-slate-900 font-bold text-2xl mb-4">Alerts</h2>
        <Table>
          {!news.length && !loading && (
            <TableCaption className=" py-2"> No Alerts added yet.</TableCaption>
          )}
          <TableHeader className=" bg-brown/50">
            <TableRow>
              <TableHead className=" text-slate-950 font-bold text-center ">
                PID
              </TableHead>
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
          {!loading && (
            <TableBody>
              {news.map((item, index) => {
                if (new Date(item.date) > new Date()) return null; // Skip future news items

                return (
                  <TableRow key={index}>
                    <TableCell className="font-thin border-b pb-4 text-center pt-4 text-slate-400 border-slate-200">
                      #{index + 1}
                    </TableCell>
                    <TableCell className="font-thin border-b pb-4 truncate max-w-[100px] pt-4 border-slate-200">
                      <AlertDialog>
                        <AlertDialogTrigger className=" capitalize truncate max-w-28 font-bold ">
                          {item.name}
                        </AlertDialogTrigger>
                        <AlertDialogContent className=" md:min-w-[800px] bg-white  flex items-center justify-center flex-col py-3 gap-6 ">
                          <div className=" w-full flex items-end justify-end">
                            <AlertDialogCancel className=" bg-red-500 text-white text-lg font-bold rounded-md">
                              <IoClose className=" w-6 h-6 font-semibold " />
                            </AlertDialogCancel>
                          </div>
                          <AlertDialogHeader className=" px-12">
                            <AlertDialogTitle className=" capitalize text-3xl font-semibold">
                              {item.name}
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogDescription className=" capitalize max-h-72 overflow-y-auto text-slate-900 pb-6 px-12">
                            {item.description}
                          </AlertDialogDescription>
                          <div className=" w-full flex items-center justify-between px-12 mb-8">
                            <Link
                              href={"/"}
                              className=" text-indigo-400 text-sm font-bold "
                            >
                              {item.link}
                            </Link>
                            <p className=" text-sm font-bold text-slate-600">
                              {item.date}
                            </p>
                          </div>
                          {/* <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="font-thin capitalize border-b pb-4 pt-4 truncate max-w-[200px] border-slate-200">
                      {item.description}
                    </TableCell>
                    <TableCell className="font-semibold text-indigo-400 border-b pb-4 pt-4 border-slate-200">
                      {item.link}
                    </TableCell>
                    <TableCell className="font-bold border-b  pb-4 pt-4 border-slate-200">
                      {item.date}
                    </TableCell>
                    <TableCell className="font-thin text-center border-b pb-4 pt-4 border-slate-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <FaAngleDown className="w-7 h-7 p-1.5 border border-slate-300 hover:border-slate-500 rounded-full text-slate-900" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <AlertDialog>
                            <AlertDialogTrigger className="bg-gray-200/70 hover:bg-slate-100 my-1 font-semibold text-slate-900 text-center w-full px-8 py-3">
                              View full details
                            </AlertDialogTrigger>
                            <AlertDialogContent className=" md:min-w-[800px] bg-white  flex items-center justify-center flex-col py-3 gap-6 ">
                              <div className=" w-full flex items-end justify-end">
                                <AlertDialogCancel className=" bg-red-500 text-white text-lg font-bold rounded-md">
                                  <IoClose className=" w-6 h-6 font-semibold " />
                                </AlertDialogCancel>
                              </div>
                              <AlertDialogHeader className=" px-12">
                                <AlertDialogTitle className=" capitalize text-3xl font-semibold">
                                  {item.name}
                                </AlertDialogTitle>
                              </AlertDialogHeader>

                              <AlertDialogDescription className=" capitalize max-h-72 overflow-y-auto text-slate-900 pb-6 px-12">
                                {item.description}
                              </AlertDialogDescription>
                              <div className=" w-full flex items-center justify-between px-12 mb-8">
                                <Link
                                  href={"/"}
                                  className=" text-indigo-400 text-sm font-bold "
                                >
                                  {item.link}
                                </Link>
                                <p className=" text-sm font-bold text-slate-600">
                                  {item.date}
                                </p>
                              </div>
                              {/* <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                            </AlertDialogContent>
                          </AlertDialog>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger className="bg-red-100 my-1 hover:bg-red-200 font-semibold text-red-700 text-center w-full px-8 py-3">
                              Delete Post
                            </AlertDialogTrigger>
                            <AlertDialogContent className="  bg-white  flex items-center justify-center flex-col py-12 gap-6 ">
                              <h2 className=" text-slate-800 font-semibold text-lg">
                                {" "}
                                Are you sure want to delete this news
                              </h2>
                              <div className=" w-full flex items-center justify-center gap-4">
                                <Button
                                  onClick={deleteHandler(item.newsId)}
                                  className=" bg-red-600 text-white px-12 py-3 rounded-lg"
                                >
                                  {" "}
                                  Yes{" "}
                                </Button>
                                <AlertDialogCancel className=" bg-gray-200 text-slate-900 px-12 py-3 rounded-lg">
                                  {" "}
                                  No{" "}
                                </AlertDialogCancel>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        <div className=" w-full flex items-center justify-between mt-3 gap-4">
          <p className=" font-semibold text-xs md:text-sm text-slate-800">
            Total Post: {count}
          </p>
          {news.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <p className=" font-semibold text-sm text-nowrap text-slate-800 mr-2">
                1 - {Math.ceil(count / pageLimit)} of Pages
              </p>

              <button
                disabled={page === 1}
                onClick={handlePrevious}
                className="disabled:bg-transparent border  disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 border-slate-500 text-slate-500 py-3 font-thin px-3  text-sm  rounded-lg inline-flex items-center"
              >
                <FaArrowLeft />
              </button>
              <div className="flex gap-2">
                {Array.from(
                  { length: Math.ceil(count / pageLimit) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`border disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-300  disabled:cursor-not-allowed border-slate-500  w-10 h-10 font-thin flex items-center justify-center    rounded-lg ${
                        page === index + 1
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
                disabled={page >= Math.ceil(count / pageLimit)}
                onClick={handleNext}
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
