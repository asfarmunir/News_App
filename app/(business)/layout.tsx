import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { RiDashboardFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiNewspaperFill } from "react-icons/pi";
import BusinessNavbar from "@/components/shared/BusinessNavbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessLinks = [
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
      href: "/businessDashboard",
    },
    {
      name: "Followers",
      icon: [
        <Image
          key={1}
          src="/icons/followers.svg"
          width={20}
          height={20}
          alt="icon"
        />,
        <Image
          key={2}
          src="/icons/followersWhite.png"
          width={20}
          height={20}
          alt="icon"
        />,
      ],

      href: "/businessDashboard/followers",
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
      href: "/businessDashboard/news",
    },
  ];

  return (
    <div className={`h-screen flex bg-slate-50 `}>
      <Sidebar links={businessLinks} />

      <main className=" w-full  overflow-auto flex flex-col items-start justify-start pb-3">
        <BusinessNavbar />
        {children}
      </main>
    </div>
  );
}
