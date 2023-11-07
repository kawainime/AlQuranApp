"use client";

import { cx } from "classix";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~components/atoms";
import { AsmaulHusnaProps } from "~interfaces";
import { arab } from "~lib/utils/fonts";

export function ListAsmaulHusna({
  asmaulHusna,
  deferredSearch,
  isAscending,
}: {
  asmaulHusna: AsmaulHusnaProps[];
  deferredSearch: string;
  isAscending: boolean;
}): JSX.Element {
  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna
        .filter((item) => {
          if (deferredSearch === "") return item;
          else if (
            item.latin.toLowerCase().includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
          return 0;
        }),
    [deferredSearch, asmaulHusna, isAscending]
  );

  return (
    <>
      {filteredAsmaulHusna.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filteredAsmaulHusna.map((item) => (
            <div
              data-cy="card"
              key={item.urutan}
              className={cx(
                "flex flex-col items-start justify-center",
                "overflow-hidden rounded-md text-left",
                "border-2 border-black bg-gray-100 p-4",
                "text-start tracking-wide cursor-pointer",
                "dark:border-white dark:bg-[#2A2A37]"
              )}
            >
              <h3 className="text-xl font-bold">{item.urutan}</h3>
              <div className="my-3 w-full text-right">
                <p className={cx("text-3xl font-medium", arab.className)}>
                  {item.arab}
                </p>
              </div>
              <p className="text-lg font-bold">
                {deferredSearch
                  ? reactStringReplace(
                      item.latin,
                      deferredSearch,
                      (match: string, index: number) => (
                        <span
                          key={index + 1}
                          className="bg-lime-400 dark:bg-lime-600"
                        >
                          {match}
                        </span>
                      )
                    )
                  : item.latin}
              </p>
              <p>{item.arti}</p>
            </div>
          ))}
        </div>
      ) : (
        <TidakAda title="Asma'ul Husna" />
      )}
    </>
  );
}
