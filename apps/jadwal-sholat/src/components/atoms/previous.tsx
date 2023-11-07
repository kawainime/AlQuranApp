import { cx } from "classix";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SuratProps } from "~interfaces";
import { removeSelectedSurat } from "~lib/helpers";

export function Previous({ surat }: SuratProps): JSX.Element {
  return (
    <>
      {surat.number > 1 ? (
        <Link href={`/quran/surat/${surat.number - 1}`}>
          <button
            onClick={removeSelectedSurat}
            type="button"
            aria-label="Previous"
            className={cx(
              "flex items-center justify-center space-x-1 rounded-md",
              "border-2 border-black px-2 py-1 ",
              "dark:border-white dark:text-white"
            )}
          >
            <ArrowLeft size={20} />
            <p className="text-base font-bold">Previous</p>
          </button>
        </Link>
      ) : null}
    </>
  );
}
