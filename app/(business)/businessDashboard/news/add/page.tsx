"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addAlert } from "@/lib/cruds/newsCrud";
import { Textarea } from "@/components/ui/textarea";
import { ColorRing } from "react-loader-spinner";
import { useAuth } from "@/utils/AuthProvider";
import { getBusinessDetails } from "@/lib/cruds/businessCrud";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  link: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  date: z.string().min(8, {
    message: "Please enter a valid date.",
  }),
  description: z.string().min(15, {
    message: "Description must be at least 15 characters.",
  }),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link: "www.link.com",
      description: "description is just nothing more",
      date: "2024-02-12",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const [userData, setUserData] = useState<any>(null);
  console.log("🚀 ~pPage ~ userData:", userData);

  useEffect(() => {
    if (user) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDetails = async () => {
    const data = await getBusinessDetails(user.email);
    setUserData(data);
  };

  interface IFormInput {
    name: string;
    link: string;
    date: string;
    description: string;
  }

  const router = useRouter();

  async function onSubmit(values: IFormInput) {
    if (!userData) return;
    setIsLoading(true);
    const newsData = {
      ...values,
      creatorId: userData.businessId,
      creatorEmail: userData.email,
      businessName: userData.BusinessName,
    };
    try {
      await addAlert(newsData);
      setIsLoading(false);
      toast.success("Alert added successfully");
      router.push("/businessDashboard/news/add/success");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error("Error adding alert");
    }
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start p-5 px-4 md:px-8">
      <div className=" w-full flex gap-4 items-center justify-start mt-4">
        <Link
          href={"/businessDashboard/news"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <IoArrowBack className="w-6 h-6" />
          <h2 className="text-xl font-normal ml-4 text-nowrap ">Alerts</h2>
        </Link>

        <div className=" w-full border border-slate-300/80"></div>
      </div>

      <Form {...form}>
        <div
          id="first"
          className="flex flex-col  items-center justify-center w-full gap-4  my-6"
        >
          <form
            id="container"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-20">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="shadow appearance-none border mr-0 md:mr-6  rounded-xl bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="link"
                        placeholder="link"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Schedule Post
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-brown-50 w-full md:w-[45%] py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Location"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className="block text-lg text-gray-600  mb-2">
                    Description
                  </FormLabel>
                  <FormControl>
                    {/* <Input
                      type="text"
                      placeholder="description"
                      {...field}
                      className="shadow appearance-none border rounded-xl bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    /> */}
                    <Textarea
                      placeholder="description"
                      {...field}
                      className="shadow appearance-none border rounded-xl bg-brown-50 w-full md:w-3/4  h-64 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-full mt-2 items-center justify-center">
              <Button
                type="submit"
                className="bg-slate-700 w-full rounded-lg hover:bg-slate-600 mt-6 text-white font-semibold py-7 px-10 text-lg   focus:outline-none focus:shadow-outline"
              >
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                    ]}
                  />
                ) : (
                  <span className=" capitalize">Post Alert</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default Page;
