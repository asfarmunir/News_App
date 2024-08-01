"use client";
import React, { useRef } from "react";
import Image from "next/image";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { isBusinessApproved } from "@/lib/cruds/businessCrud";
import { ColorRing } from "react-loader-spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Cookies from "js-cookie"; // Import js-cookie

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password",
  }),
});

const Login = () => {
  // ignote Eslint error
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "nike1234",
    },
  });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  async function onSubmit(values: { email: string; password: string }) {
    const { email, password } = values;
    setValidation("");
    setLoading(true);
    const isApproved = await isBusinessApproved(email);
    console.log("isApproved", isApproved);

    if (typeof isApproved === "boolean" && isApproved) {
      console.log("success");
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const userObj = {
          email: user.user.email,
          uid: user.user.uid,
        };
        console.log("🚀 ~ onSubmit ~ user:", user);
        sessionStorage.setItem("isAdmin", "false");
        sessionStorage.setItem("isLoggedIn", "true");
        Cookies.set("isAdmin", "false"); // Set the isAdmin cookie
        Cookies.set("isLoggedIn", "true"); // Set the isLoggedIn cookie
        Cookies.set("user", JSON.stringify(userObj));

        setLoading(false);
        toast.success("Login Successful");
        router.push("/businessDashboard");
      } catch (error) {
        console.error("Error logging in:", error);
        setValidation("Invalid email or password");
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (typeof isApproved === "object" && isApproved.message) {
        setValidation("Invalid email or password");
      } else {
        if (triggerRef.current) {
          triggerRef.current.click();
        }
      }
    }
  }

  // async function onSubmit(values: { email: string; password: string }) {
  //   const { email, password } = values;
  //   setLoading(true);
  //   const isApproved = await isBusinessApproved(email);
  //   console.log("isApproved", isApproved);
  //   if (isApproved) {
  //     console.log("success");
  //     // try {
  //     //   await signInWithEmailAndPassword(auth, email, password);
  //     //   toast.success("Login Successfull");
  //     //   router.push("/businessDashboard");
  //     // } catch (error) {
  //     //   console.error("Error logging in:", error);
  //     //   setValidation("Invalid email or password");
  //     // }
  //   } else {
  //     setLoading(false);
  //     isApproved.message
  //       ? toast.error(isApproved.message)
  //       : toast.error("Your request is not approved yet");
  //     return;
  //   }

  //   // router.push("/businessDashboard");
  // }

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
      <div className=" w-full md:w-[60%] overflow-y-auto max-h-screen  flex items-start justify-start p-8 px-10 md:px-28  flex-col gap-6  ">
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
            <AlertDialogHeader className=" pb-8">
              <AlertDialogTitle className="text-2xl text-center mb-4">
                Your request is not approved yet
              </AlertDialogTitle>
              <p className="text-gray-500   font-thin text-center">
                Your request is not approved yet. Please wait for the approval.
                We will notify you once your request is approved, Thank you.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" bg-slate-800 text-lg mt-8   text-white rounded-full px-16 py-6">
                Okay
              </AlertDialogCancel>
              {/* <AlertDialogAction>Okay</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <h2 className=" text-2xl font-bold">News App</h2>
        <h4 className="  text-slate-600 ">Welcome back!!!</h4>
        <h1
          className="
          text-5xl 
          font-semibold
          text-slate-800
          "
        >
          Sign in
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
                    <FormLabel className="block text-lg font-thin text-gray-600  mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="shadow appearance-none border  rounded-md  bg-brown-50   w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
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
                  <FormItem className="mb-12 mt-8">
                    <FormLabel className="w-full  flex items-center justify-between text-lg text-gray-600  mb-2">
                      <p className=" text-gray-600 font-thin">Password</p>
                      <p className="text-slate-400 text-sm font-thin">
                        Forget Password ?
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="shadow appearance-none border  rounded-md bg-brown-50 w-full py-6 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-red-400 font-semibold">
                      {validation}
                    </p>
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-full items-center  justify-center">
                <Button
                  type="submit"
                  className="bg-slate-700 hover:bg-slate-600 mt-3 text-white font-semibold py-7 px-8 rounded-full text-lg   focus:outline-none focus:shadow-outline"
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
                    <>
                      <span className=" capitalize">SIGN IN</span>
                      <FaArrowRight className=" text-xl ml-8" />
                    </>
                  )}
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
                <p className="text-xs font-thin mt-2">
                  Login as Admin?
                  <Link
                    className="font-semibold text-slate-800"
                    href={"/login"}
                  >
                    {" "}
                    Click here
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

export default Login;
