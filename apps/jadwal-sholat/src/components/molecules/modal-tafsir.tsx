"use client";

import { cx } from "classix";
import { X } from "lucide-react";
import { memo, useRef } from "react";
import { useClickOutside } from "~hooks";
import { SuratProps } from "~interfaces";
import useGlobalStore from "~store";

export function ModalTafsir({ surat }: SuratProps): JSX.Element {
  const { tafsir, setTafsir } = useGlobalStore((state) => ({
    tafsir: state.tafsir,
    setTafsir: state.setTafsir,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setTafsir, modalRef);

  return (
    <>
      {tafsir ? (
        <div
          aria-modal="true"
          className={cx(
            "modal-blur fixed inset-0 top-0 z-50",
            "flex min-h-screen w-full items-center justify-center",
            "overflow-x-hidden  backdrop-blur-[3px]"
          )}
        >
          <div className="relative w-full max-w-2xl p-4 md:h-auto">
            <div
              ref={modalRef}
              className={cx(
                "relative rounded-lg bg-white shadow",
                "dark:bg-gray-800 dark:text-white"
              )}
            >
              <div className="flex items-center justify-between rounded-t border-b p-4">
                <h3 className="text-xl font-semibold">
                  Tafsir Surat {surat.asma.id.short}
                </h3>
                <button
                  type="button"
                  className={cx(
                    "ml-auto inline-flex items-center rounded-lg",
                    "bg-transparent p-1.5 text-sm text-gray-400 transition-all",
                    "hover:bg-gray-200",
                    "dark:text-white dark:hover:text-gray-900"
                  )}
                  onClick={() => setTafsir(!tafsir)}
                  aria-label="close modal tafsir"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6 p-6">
                <p className="text-base leading-relaxed ">{surat.tafsir.id}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

memo(ModalTafsir);
