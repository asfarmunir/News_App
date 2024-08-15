import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { PiNewspaperFill } from "react-icons/pi";
import { getCurrentTime } from "@/lib/utils";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminLinks = [
    {
      name: "Dashboard",
      icon: [
        <Image
          key={1}
          src="/icons/dashboard.svg"
          width={20}
          height={20}
          alt="icon"
        />,
        <Image
          key={2}
          src="/icons/dashboardWhite.png"
          width={20}
          height={20}
          alt="icon"
        />,
      ],
      href: "/adminDashboard",
    },
    {
      name: "Businesses",
      icon: [
        <Image
          key={1}
          src="/icons/briefcase.svg"
          width={20}
          height={20}
          alt="icon"
        />,
        <Image
          key={2}
          src="/icons/briefcaseWhite.svg"
          width={20}
          height={20}
          alt="icon"
        />,
      ],

      href: "/adminDashboard/businesses",
    },
    {
      name: "Alerts",
      icon: [
        <Image
          key={1}
          src="/icons/newspaper.svg"
          width={20}
          height={20}
          alt="icon"
        />,
        <Image
          key={2}
          src="/icons/newspaperWhite.png"
          width={20}
          height={20}
          alt="icon"
        />,
      ],
      href: "/adminDashboard/news",
    },
  ];
  return (
    <div className={`h-screen flex bg-slate-50 `}>
      <Sidebar links={adminLinks} />

      <main className=" w-full  overflow-auto flex flex-col items-start justify-start pb-3">
        <div className="flex items-center justify-between shadow-sm bg-white pb-4 py-3 px-5 md:px-10 w-full">
          <div className="flex flex-col">
            <h2 className=" text-lg md:text-xl font-bold">Admin Dashboard</h2>
            <p className=" text-xs md:text-sm text-slate-700 font-thin">
              {getCurrentTime()}
            </p>
          </div>
          <div className=" inline-flex items-center gap-4">
            <p className=" text-sm md:text-base font-semibold">Super Admin</p>
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
