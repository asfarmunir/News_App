import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { RiDashboardFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";

export default async function RootLayout({ children }) {
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
    <div className={`h-screen flex bg-slate-50 `}>
      <Sidebar links={businessLinks} />

      <main className=" w-full  overflow-auto flex flex-col items-start justify-start py-3">
        <div className="flex items-center justify-between shadow-sm bg-white py-4 px-5 md:px-10 w-full">
          <div className="flex flex-col">
            <h2 className=" text-lg md:text-xl font-bold">Hello Andrew</h2>
            <p className=" text-xs md:text-sm text-slate-700 font-thin">
              2:34pm 27 May 2024
            </p>
          </div>
          <div className=" inline-flex items-center gap-4">
            <p className=" text-sm md:text-base font-semibold">Andrew Tate</p>
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
