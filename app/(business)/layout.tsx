import Sidebar from "@/components/shared/Sidebar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  return (
    <div className={`h-screen flex bg-slate-50 `}>
      <Sidebar />

      <main className=" w-full flex flex-col items-start justify-start py-3">
        <div className="flex items-center justify-between shadow-sm bg-white py-4 px-10 w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Hello Andrew</h2>
            <p className=" text-sm text-slate-700 font-thin">
              2:34pm 27 May 2024
            </p>
          </div>
          <div>Andrew Tate</div>
        </div>
        {children}
      </main>
    </div>
  );
}
