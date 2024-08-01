"use client";
import React from "react";
import Image from "next/image";
import { useState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { addBusiness } from "@/lib/cruds/businessCrud";
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
import { ColorRing } from "react-loader-spinner";

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
  PhoneNumber: z.string().min(11, {
    message: "Invalid Phone Number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignUp = () => {
  const [validation, setValidation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "nike1234",
      BusinessOwnerName: "Matt David",
      BusinessName: "Nike",
      BusinessCategory: "clothing",
      PhoneNumber: "93298157238",
    },
  });

  type submissionType = {
    email: string;
    password: string;
    BusinessOwnerName: string;
    BusinessName: string;
    BusinessCategory: string;
    PhoneNumber: string;
  };

  async function onSubmit(values: submissionType) {
    setLoading(true);
    try {
      const normalizedValues = {
        ...values,
        BusinessName: values.BusinessName.toLowerCase(), // Ensure the BusinessName is lowercase
      };
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (createdUser) {
        const newValues = {
          ...normalizedValues,
          businessId: createdUser.user?.uid,
        };
        await addBusiness(newValues);
        setLoading(false);

        if (triggerRef.current) {
          triggerRef.current.click();
        }
      }
      //   router.push("/"); // Navigate to the home page
    } catch (error: any) {
      setLoading(false);
      console.error("Error signing up:", error);
      toast.error(error.message);
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
      <div className=" w-full md:w-[60%] max-h-screen overflow-y-auto h-full flex items-start justify-start p-8 pt-24 px-10 md:px-28   flex-col gap-6  ">
        <AlertDialog>
          <AlertDialogTrigger ref={triggerRef} className=" hidden">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent className=" bg-white flex flex-col items-center justify-center">
            <Image
              src="/images/reqSent.png"
              alt="sent"
              width={180}
              height={180}
              className="
                 mb-4
                "
            />
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-center mb-4">
                Request Sent
              </AlertDialogTitle>
              <p className="text-gray-500  mb-4 font-thin text-center">
                Your request for business account registration is sent,
                Meanwhile please wait until we send you confirmation email to
                you, so you can login then.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" bg-slate-800 text-lg mt-6 text-white rounded-full px-16 py-6">
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
              className=" w-full gap-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="block text-lg text-gray-600 font-thin mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                    <FormLabel className="block text-lg text-gray-600 font-thin mb-2">
                      Business Owner Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Owner Name"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                    <FormLabel className="block text-lg text-gray-600 font-thin mb-2">
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Name"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                    <FormLabel className="block text-lg text-gray-600 font-thin mb-2">
                      Business Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Category"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                    <FormLabel className="block text-lg text-gray-600 font-thin mb-2">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                    <FormLabel className="w-full  flex items-center justify-between text-lg text-gray-600 font-thin mb-2">
                      <p>Password</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="shadow appearance-none border rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="bg-slate-700 hover:bg-slate-600 mt-3 text-white font-semibold py-7 px-12 rounded-full text-lg   focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
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
                    <span className=" capitalize">SIGN UP</span>
                  )}
                </Button>
                <p className="text-xs font-thin mt-2">
                  Already have an account?
                  <Link className="font-semibold text-slate-800" href={"/"}>
                    {" "}
                    Sign In
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

export default SignUp;
