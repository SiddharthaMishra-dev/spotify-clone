"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const authModal = useAuthModal();
  const router = useRouter();
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)}>
      <div className="w-full flex justify-between items-center mb-4">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft
              className="text-white"
              size={35}
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight
              className="text-white"
              size={35}
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="p-2 bg-white rounded-full flex items-center justify-center hover:opacity-75 transition">
            <HiHome
              size={20}
              className="text-black"
            />
          </button>
          <button className="p-2 bg-white rounded-full flex items-center justify-center hover:opacity-75 transition">
            <BiSearch
              size={20}
              className="text-black"
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="bg-transparent font-medium text-neutral-300"
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="bg-white px-6 py-2"
              >
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
