"use client";
import React from "react";
import Image from "next/image";
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const page = () => {
  // ignote Eslint error
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center min-h-svh w-full">
      <div className=" overflow-hidden relative hidden lg:block w-[40%] bg-yellow-200 h-screen ">
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
          width={1000}
          height={800}
          className="
           absolute
         
           top-0
           left-20

          "
        />
      </div>
      <div className=" w-full md:w-[60%]  h-full flex items-start justify-start p-8 px-10 md:px-20  flex-col gap-4  ">
        <h2 className=" text-2xl font-bold">News App</h2>
        <h4 className="  text-slate-600 ">Welcome back!!!</h4>
        <h1
          className="
          text-5xl 
          font-semibold
          text-slate-800
          "
        >
          Sign In
        </h1>

        <Form {...form}>
          <div
            id="first"
            className="flex flex-col items-center justify-center w-full gap-4 max-w-xl my-6"
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
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="w-full  flex items-center justify-between text-lg text-gray-600  mb-2">
                      <p>Password</p>
                      <p>Forget Password?</p>
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
              <div className="flex flex-col w-full items-center justify-center">
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-700 mt-3 text-white font-semibold py-7 px-10 rounded-full text-lg   focus:outline-none focus:shadow-outline"
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
                  <span className=" capitalize">SIGN IN</span>
                  <FaArrowRight className=" text-xl ml-4" />
                  {/* )} */}
                </Button>
                <p className="text-xs font-thin mt-2">
                  Dont have an account?
                  <Link
                    className="font-semibold text-slate-800"
                    href={"/signup"}
                  >
                    {" "}
                    Sign up
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
