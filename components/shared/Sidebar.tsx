"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navlinks from "./Navlinks";
import { MdHelp } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ILink {
  name: string;
  icon: [JSX.Element, JSX.Element];
  href: string;
}

const Sidebar = ({ links }: { links: ILink[] }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("User signed out");
      Cookies.remove("isAdmin");
      Cookies.remove("isLoggedIn");

      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      <div className="bg-slate-200 flex h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        {/* SideBar */}
        <div
          id="menu"
          style={{
            borderRadius: "0 1.9rem 1.9rem 0",
          }}
          className="hidden relative lg:block bg-primary   h-full   text-slate-300  w-64  overflow-y-auto pb-8"
        >
          <div id="logo" className="my-16 px-8">
            <h1 className="text-lg md:text-2xl font-bold pb-2 text-white mb-2">
              News App
            </h1>
          </div>
          <Navlinks links={links} />
          <Link
            className={
              "flex items-center gap-2 px-12 mt-3 w-full p-4 text-slate-200  "
            }
            href={"/help"}
          >
            <MdHelp className="w-6 h-6 mr-1.5" />
            Help
          </Link>
          <button
            onClick={handleSignOut}
            className={
              "flex absolute bottom-10 font-bold  items-center gap-4 px-12 mt-2 w-full p-4 text-brown/100  "
            }
          >
            <FaArrowLeftLong className="w-3 h-3 mr-1" />
            Log Out
          </button>
        </div>
        {/* Movbile Sidebar */}
        <div className="flex lg:hidden ">
          <input
            type="checkbox"
            id="drawer-toggle"
            className="relative sr-only peer"
            defaultChecked
          />
          <label
            htmlFor="drawer-toggle"
            className="absolute mt-[10%] opacity-80 left-2 inline-block p-4 transition-all duration-500 bg-primary rounded-lg peer-checked:rotate-180 peer-checked:left-64"
          >
            <div className="w-5 h-1 mb-2 rotate-45 bg-white rounded-lg" />
            <div className="w-5 h-1 -rotate-45 bg-white rounded-lg" />
          </label>
          <div className=" fixed top-0  transition-all duration-500 transform -translate-x-full rounded-tr-3xl rounded-br-3xl  shadow-lg peer-checked:translate-x-0 bg-primary min-h-screen  text-slate-300 w-64 z-30  left-0 h-screen overflow-y-scroll pb-8">
            <div id="logo" className="my-16 px-8">
              <h1 className="text-lg md:text-2xl font-bold pb-2 text-white mb-2">
                News App
              </h1>
            </div>
            <Navlinks links={links} />
            <Link
              className={
                "flex items-center gap-4 px-12 mt-2 w-full p-4 text-slate-200  "
              }
              href={"/help"}
            >
              <MdHelp className="w-6 h-6 mr-3" />
              Help
            </Link>
            <Link
              href={"/"}
              className={
                "flex absolute bottom-3 font-semibold  items-center gap-4 px-12 mt-2 w-full p-4 text-brown/100  "
              }
            >
              <FaArrowLeftLong className="w-3 h-3 mr-1" />
              Log Out
            </Link>
          </div>
        </div>
        {/* Mobile Sidebar end */}
      </div>
    </div>
  );
};

export default Sidebar;
