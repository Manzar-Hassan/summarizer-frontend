"use client";
import Image from "next/image";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/briefly.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Contact
              </Link>
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
