"use client";
import React, { useRef } from "react";
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
import { deleteAlert } from "@/lib/cruds/newsCrud";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const DeleteNews = (newsId: any) => {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const deleteHandler = (id: string) => async () => {
    toast.loading("Deleting news");
    await deleteAlert(id);
    if (triggerRef.current) {
      triggerRef.current.click();
    }
    router.refresh();
    router.push("/adminDashboard/news");
    window.location.reload();
    toast.dismiss();
    toast.success("News deleted successfully");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        ref={triggerRef}
        className="bg-red-100 my-1 hover:bg-red-200 font-semibold text-red-700 text-center w-full px-8 py-3"
      >
        Delete Post
      </AlertDialogTrigger>
      <AlertDialogContent className="  bg-white  flex items-center justify-center flex-col py-12 gap-6 ">
        <h2 className=" text-slate-800 font-semibold text-lg">
          {" "}
          Are you sure want to delete this news
        </h2>
        <div className=" w-full flex items-center justify-center gap-4">
          <Button
            onClick={deleteHandler(newsId)}
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
  );
};

export default DeleteNews;
