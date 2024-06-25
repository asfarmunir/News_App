"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  BusinessOwnerName: z.string().min(3, {
    message: "Business Owner Name must be at least 3 characters.",
  }),
  BusinessName: z.string().min(3, {
    message: "Business Name must be at least 3 characters.",
  }),
  BusinessCategory: z.string().min(3, {
    message: "Business Category must be at least 3 characters.",
  }),
  PhoneNumber: z.number().min(10, {
    message: "Phone Number must be at least 10 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const page = () => {
  // ignote Eslint error
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "asfarma@gamil.com",
      password: "aaaaaaaaa",
      BusinessOwnerName: "aaaaaaaa",
      BusinessName: "aaaaaa",
      BusinessCategory: "aaaaaa",
      PhoneNumber: 1234567890,
    },
  });

  type submissionType = {
    email: String;
    password: String;
    BusinessOwnerName: String;
    BusinessName: String;
    BusinessCategory: String;
    PhoneNumber: Number;
  };

  async function onSubmit(values: submissionType) {
    console.log(values);

    if (triggerRef.current) {
      triggerRef.current.click();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-svh w-full">
      <div className="overflow-hidden relative hidden lg:block w-[40%] bg-yellow-200 h-screen ">
        <Image
          src="/images/box.png"
          alt="Login"
          width={1000}
          height={800}
          className="
          object-cover
          object-center
          w-full
          h-full
          
          "
        />
        <Image
          src="/images/Group.png"
          alt="Login"
          width={530}
          height={530}
          className="
           absolute
           top-0
           left-20

          "
        />
      </div>
      <div className=" w-full md:w-[60%] max-h-screen overflow-y-auto h-full flex items-start justify-start p-8 pt-24 px-10 md:px-20  flex-col gap-4  ">
        <AlertDialog>
          <AlertDialogTrigger ref={triggerRef} className=" hidden">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent className=" bg-white flex flex-col items-center justify-center">
            <Image
              src="/images/reqSent.png"
              alt="sent"
              width={230}
              height={230}
              className="
                 mb-4
                "
            />
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-center mb-4">
                Request Sent
              </AlertDialogTitle>
              <p className="text-gray-600 text-sm mb-4 font-thin text-center">
                Your request for business account registration is sent,
                Meanwhile please wait until we send you confirmation email to
                you, so you can login then.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" bg-black text-white rounded-full px-12 py-3">
                Okay
              </AlertDialogCancel>
              {/* <AlertDialogAction>Okay</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <h2 className=" text-2xl font-bold">News App</h2>
        <h4 className="  text-slate-600 ">Create Account Now!!!</h4>
        <h1
          className="
          text-5xl 
          font-semibold
          text-slate-800
          "
        >
          Sign Up
        </h1>

        <Form {...form}>
          <div
            id="first"
            className="flex  flex-col items-center justify-center w-full gap-4 max-w-xl my-6"
          >
            <form
              id="container"
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BusinessOwnerName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Business Owner Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Owner Name"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="BusinessName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Name"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BusinessCategory"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Business Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Category"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="w-full  flex items-center justify-between text-lg text-gray-600  mb-2">
                      <p>Password</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-orange-100/80 w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-red-400 font-semibold">
                      {validation}
                    </p>
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-full items-center justify-center mt-8">
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-700 mt-3 text-white font-semibold py-7 px-16 rounded-full text-lg   focus:outline-none focus:shadow-outline"
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
                  <span className=" capitalize">SIGN UP</span>
                  {/* )} */}
                </Button>
                <p className="text-xs font-thin mt-2">
                  Already have an account?
                  <Link
                    className="font-semibold text-slate-800"
                    href={"/login"}
                  >
                    {" "}
                    Sign IN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default page;
