"use client";

import { cx } from "classix";
import { BookMarked, Clock4, Home, List, LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugify } from "~lib/helpers";

const SwitchTheme = dynamic(
  () => import("~components/atoms").then((obj) => obj.SwitchTheme),
  {
    ssr: false,
  }
);

const navbarList = [
  {
    id: 1,
    title: "Sholat",
    icon: Clock4,
  },
  {
    id: 2,
    title: "Asma'ul Husna",
    icon: List,
  },
  {
    id: 3,
    title: "Qur'an",
    icon: BookMarked,
  },
];

export function Navbar(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav
      className={cx(
        "bg-gray-50 dark:bg-gray-800",
        "md:border-r md:border-r-gray-300 md:dark:border-r-gray-600"
      )}
    >
      <div
        className={cx(
          "fixed bottom-0 z-50 grid w-full grid-cols-5 grid-rows-1 gap-4",
          "border-t border-t-gray-300 bg-gray-50 py-4 text-white",
          "dark:border-t-[1px] dark:border-t-gray-600 dark:bg-gray-800",
          "md:sticky md:top-0 md:left-0 md:flex md:max-h-screen md:min-h-screen",
          "md:max-w-[80px] md:flex-col md:items-center md:justify-center md:gap-10",
          "md:border-t-0 md:px-7 md:dark:border-t-0"
        )}
      >
        <div className="flex w-full items-center justify-center">
          <Link href="/">
            <button
              type="button"
              aria-label="home"
              className={cx(
                "flex cursor-pointer flex-col items-center justify-center px-4",
                "transition-all",
                "md:p-2.5",
                pathname === "/"
                  ? "text-gray-600 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              <Home size={24} />
              <p className="hidden text-sm font-semibold md:block">Home</p>
            </button>
          </Link>
        </div>
        {navbarList.map((item) => {
          const Icon: LucideIcon = item.icon;
          return (
            <div
              key={item.id}
              className="flex w-full items-center justify-center"
            >
              <Link href={slugify(item.title)} passHref>
                <button
                  className={cx(
                    "flex cursor-pointer flex-col items-center justify-center px-4",
                    "transition-all md:p-2.5",
                    pathname.includes(slugify(item.title) as string)
                      ? "text-gray-600 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <Icon size={24} />
                  <p className="hidden text-sm font-bold md:block">
                    {item.title}
                  </p>
                </button>
              </Link>
            </div>
          );
        })}
        <SwitchTheme flexDir="col" justifyItems="center" isMarginLeft={false} />
      </div>
    </nav>
  );
}
