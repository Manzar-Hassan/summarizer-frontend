"use client";
import Image from "next/image";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import Button from "./Button";
import ThemeToggelButton from "./ThemeToggelButton";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/briefly.png"
                alt="Logo"
                width={100}
                height={100}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-4">
              <ThemeToggelButton />
            </div>

            <div className="ml-4 flex items-center">
              <Button name="Sign In" icon={<RiLoginBoxLine />} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
