import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksProps {
  links: {
    name: string;
    href: string;
    icon: [JSX.Element, JSX.Element];
  }[];
}

const Navlinks = ({ links }: NavlinksProps) => {
  const currentPath = usePathname();

  return (
    <div className="flex flex-col items-start justify-normal px-2 pb-4 gap-5 border-b border-b-slate-300 mx-6 ">
      {links.map((link) => {
        return (
          <Link
            className={`flex items-center gap-4 w-full p-4  ${
              currentPath === link.href
                ? " bg-brown-100 text-brown-200 rounded-md hover:text-brown font-bold"
                : "text-slate-200"
            }`}
            href={link.href}
            key={link.href}
          >
            {currentPath === link.href ? link.icon[0] : link.icon[1]}
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
