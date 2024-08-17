"use client";
import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  name: z.string().min(3, {
    message: "email must be at least 8 characters.",
  }),
  ownerName: z.string().min(3, {
    message: "owner name must be at least 8 characters.",
  }),
  phoneNumber: z.string().min(8, {
    message: "phone number must be at least 8 characters.",
  }),
  category: z.string().min(4, {
    message: "category must be at least 4 characters.",
  }),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Nike",
      ownerName: "fameer",
      phoneNumber: "23232323",
      category: "sports",
    },
  });

  const router = useRouter();
  async function onSubmit(values: any) {
    console.log(values);
    router.push("/adminDashboard/businesses/add/success");
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start p-5 px-4 md:px-8">
      <div className=" w-full flex gap-4 items-center justify-start mt-4">
        <Link
          href={"/adminDashboard/businesses"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <IoArrowBack className="w-6 h-6" />
          <h2 className="text-xl font-normal ml-4 text-nowrap ">
            Add Business
          </h2>
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
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-16">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="shadow appearance-none border rounded-xl  bg-brown-50 md:w-[95%] w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Owner Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="ownerName"
                        placeholder="ownerName"
                        {...field}
                        className="shadow appearance-none border rounded-xl  bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-16">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="  Phone Number"
                        {...field}
                        className="shadow appearance-none border rounded-xl  bg-brown-50 md:w-[95%] w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="category"
                        {...field}
                        className="shadow appearance-none border rounded-xl  bg-brown-50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full mt-2 items-center justify-center">
              <Button
                type="submit"
                className="bg-slate-700 w-full rounded-lg hover:bg-slate-600 mt-3 text-white font-semibold py-7 px-10 text-lg   focus:outline-none focus:shadow-outline"
              >
                {/* {loading ? (
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
                    ) : ( */}
                <span className=" capitalize">Add Business</span>
                {/* )} */}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default Page;
