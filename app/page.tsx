import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" bg-slate-100 shadow-lg w-1/2 p-24 flex flex-col items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-3 font-bold text-cyan-700">
          <h2>Auth Pages - </h2>
          <Link href={"/login"}>here</Link>
        </div>
        <div className="flex items-center justify-center gap-3 font-bold text-cyan-700">
          <h2>Admin Dashbaord - </h2>
          <Link href={"/adminDashboard"}>here</Link>
        </div>
        <div className="flex items-center justify-center gap-3 font-bold text-cyan-700">
          <h2>Business Dashbaord - </h2>
          <Link href={"/businessDashboard"}>here</Link>
        </div>
      </div>
    </main>
  );
}
