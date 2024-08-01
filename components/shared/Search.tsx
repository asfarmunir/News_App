"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Search = ({ placeholder = "Search..." }: { placeholder?: string }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  useEffect(() => {
    if (pathname !== "/") {
      setQuery("");
    }
  }, [pathname]);

  return (
    <div className=" bg-brown-400 inline-flex items-center py-1 px-4 rounded-lg">
      <CiSearch className="w-8 h-8 mr-2 text-slate-700 " />
      <Input
        className=" 
                bg-transparent  
                text-slate-900
                focus:outline-0
                focus:ring-0
                focus:border-none
                placeholder-slate-900 
                "
        placeholder={placeholder}
        value={query !== null ? query : ""}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
