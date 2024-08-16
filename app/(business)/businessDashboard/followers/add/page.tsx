"use client";
import React, { useEffect } from "react";
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
import { ColorRing } from "react-loader-spinner";
import { useAuth } from "@/utils/AuthProvider";
import { getBusinessDetails } from "@/lib/cruds/businessCrud";
import { addFollowRequest } from "@/lib/cruds/userCrud";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  // phoneNumber: z.string().min(8, {
  //   message: "phone number must be at least 8 characters.",
  // }),
  // location: z.string().min(8, {
  //   message: "location must be at least 8 characters.",
  // }),
});

const Page = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [businessData, setBusinessData] = useState<any>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      details();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const details = async () => {
    const data = await getBusinessDetails(user.email);
    setBusinessData(data);
    console.log(data);
  };

  const [validations, setValidations] = useState<string>("");

  const router = useRouter();
  async function onSubmit(values: any) {
    setValidations("");
    setLoading(true);
    const data = {
      businessId: businessData.businessId,
      businessName: businessData.BusinessName,
      businessEmail: businessData.email,
      businessFollowers: businessData.followers,
    };
    const res = await addFollowRequest(values.email, data);
    if (!res.success) {
      setValidations(res.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Follower added successfully");
    router.push("/businessDashboard/followers/add/success");
  }
  return (
    <div className=" flex flex-col w-full items-start justify-start p-5 px-4 md:px-8">
      <div className=" w-full flex gap-4 items-center justify-start mt-4">
        <Link
          href={"/businessDashboard/followers"}
          className="flex flex-row  items-center justify-start flex-nowrap"
        >
          <IoArrowBack className="w-6 h-6" />
          <h2 className="text-xl font-normal ml-4 text-nowrap ">
            Add Follower
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
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="block text-lg text-gray-600  mb-2">
                      User Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="shadow appearance-none border rounded-xl bg-brown-50  w-full py-8 px-6 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </FormControl>
                    <FormMessage />
                    {validations && (
                      <FormDescription className="text-red-500 font-semibold">
                        {validations}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full mt-2 items-center justify-center">
              <Button
                type="submit"
                className="bg-slate-700 w-full rounded-lg hover:bg-slate-600 mt-5 text-white font-semibold py-7 px-10 text-lg   focus:outline-none focus:shadow-outline"
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
                  <span className=" capitalize">Add Follower</span>
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
