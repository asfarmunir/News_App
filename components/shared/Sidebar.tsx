"use client";
import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import { RiDashboardFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";
import { MdHelp } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const Sidebar = () => {
  const businessLinks = [
    {
      name: "Dashboard",
      icon: <RiDashboardFill className="w-6 h-6" />,
      href: "/businessDashboard",
    },
    {
      name: "Followers",
      icon: <FaPeopleGroup className="w-6 h-6" />,
      href: "/businessDashboard/followers",
    },
    {
      name: "News",
      icon: <PiNewspaperFill className="w-6 h-6" />,
      href: "/businessDashboard/news",
    },
  ];

  return (
    <div>
      <div className="bg-slate-200 flex h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        {/* SideBar */}
        <div
          id="menu"
          className="hidden relative md:block bg-primary rounded-tr-3xl rounded-br-3xl  h-full   text-slate-300  w-64  overflow-y-auto pb-8"
        >
          <div id="logo" className="my-16 px-8">
            <h1 className="text-lg md:text-2xl font-bold pb-2 text-white mb-2">
              News App
            </h1>
          </div>
          <Navlinks links={businessLinks} />
          <Link
            className={
              "flex items-center gap-4 px-12 mt-2 w-full p-4 text-slate-200  "
            }
            href={"/help"}
          >
            <MdHelp className="w-6 h-6 mr-3" />
            Help
          </Link>
          <button
            className={
              "flex absolute bottom-3 font-semibold  items-center gap-4 px-12 mt-2 w-full p-4 text-brown/100  "
            }
          >
            <FaArrowLeftLong className="w-3 h-3 mr-1" />
            Log Out
          </button>
        </div>
        {/* Movbile Sidebar */}
        <div className="flex md:hidden ">
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
            <Navlinks links={businessLinks} />
            <Link
              className={
                "flex items-center gap-4 px-12 mt-2 w-full p-4 text-slate-200  "
              }
              href={"/help"}
            >
              <MdHelp className="w-6 h-6 mr-3" />
              Help
            </Link>
            <button
              className={
                "flex absolute bottom-3 font-semibold  items-center gap-4 px-12 mt-2 w-full p-4 text-brown/100  "
              }
            >
              <FaArrowLeftLong className="w-3 h-3 mr-1" />
              Log Out
            </button>
          </div>
        </div>
        {/* Mobile Sidebar end */}
      </div>
    </div>
  );
};

export default Sidebar;
