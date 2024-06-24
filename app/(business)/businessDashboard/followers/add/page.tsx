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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid name.",
  }),
  name: z.string().min(8, {
    message: "email must be at least 8 characters.",
  }),
  phoneNumber: z.string().min(8, {
    message: "phone number must be at least 8 characters.",
  }),
  location: z.string().min(8, {
    message: "location must be at least 8 characters.",
  }),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start p-5 px-4 md:px-8">
      <Link
        href={"/businessDashboard/followers"}
        className="flex items-center justify-start w-full mt-4"
      >
        <IoArrowBack className="w-6 h-6" />
        <h2 className="text-xl font-normal ml-4">Add Follower</h2>
      </Link>

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
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      ame
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-orange-100/50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-orange-100/50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
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
                        className="shadow appearance-none border rounded-xl bg-orange-100/50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
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
                        className="shadow appearance-none border rounded-xl bg-orange-100/50 w-full py-8 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-slate-900 w-full rounded-lg hover:bg-slate-700 mt-3 text-white font-semibold py-7 px-10 text-lg   focus:outline-none focus:shadow-outline"
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
                <span className=" capitalize">Add Follower</span>
                {/* )} */}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default page;
