/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from "next";
import Logo from "../assets/logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar: NextPage = () => {
  const session = useSession();

  return (
    <div>
      <div className="m-auto flex max-w-5xl items-center justify-between pt-2 pb-2">
        <Link href="/" passHref>
          <img
            className="h-12 cursor-pointer object-cover"
            src={Logo.src}
            alt="Logo"
          />
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="https://twitter.com/Burnw00d" passHref>
            <FaTwitter className="cursor-pointer text-blue-400 hover:scale-110" />
          </Link>
          <Link href="https://github.com/burnwood1911" passHref>
            <FaGithub className="cursor-pointer hover:scale-110" />
          </Link>
          <Link href="https://instagram.com/alexander__rossi" passHref>
            <FaInstagram className="cursor-pointer text-pink-500 hover:scale-110" />
          </Link>
          {session.status === "authenticated" && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex rounded-sm bg-teal-300 p-2 text-black"
            >
              <FaSignOutAlt />
            </button>
          )}
          {session.status === "authenticated" && (
            <Link href="/write" passHref>
              <span className="flex cursor-pointer rounded-sm bg-teal-300 p-2 text-black">
                <FaEdit />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
