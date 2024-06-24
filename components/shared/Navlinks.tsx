import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = ({ links }) => {
  const currentPath = usePathname();

  return (
    <div className="flex flex-col items-start justify-normal gap-2 px-2 pb-4 border-b border-b-slate-300 mx-6 ">
      {links.map((link) => {
        return (
          <Link
            className={`flex items-center gap-4 w-full p-4  ${
              currentPath === link.href
                ? " bg-brown/80 text-amber-200/90 rounded-md hover:text-amber-300/70 font-bold"
                : "text-slate-200"
            }`}
            href={link.href}
            key={link.href}
          >
            {link.icon}
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
