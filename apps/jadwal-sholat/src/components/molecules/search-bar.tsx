"use client";

import { cx } from "classix";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { useKeydown } from "~hooks";

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ search, setSearch }: SearchBarProps): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useKeydown({ ref: ref, isShiftKey: true, key1: "Enter", key2: "Escape" });

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 pl-3">
          <Search size={20} />
        </div>
        <input
          ref={ref}
          className={cx(
            "block w-[300px] rounded-md",
            "border-2 border-solid border-gray-400",
            "bg-gray-50 bg-clip-padding",
            "px-3 py-1 pl-10 font-semibold transition ease-in-out",
            "placeholder:ml-6",
            "focus:border-blue-600 focus:outline-none",
            "dark:border-gray-600 dark:bg-gray-700",
            "dark:placeholder-gray-400 dark:focus:border-blue-500"
          )}
          value={search}
          type="text"
          placeholder="Search...."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-1.5 hidden md:inline-block">
        <kbd
          className={cx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5",
            "text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Shift
        </kbd>{" "}
        <b>+</b>{" "}
        <kbd
          className={cx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5",
            "text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Enter
        </kbd>
      </div>
    </div>
  );
}
