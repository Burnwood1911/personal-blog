/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from "next";
import Logo from "../assets/blog-bg.png";

const Footer: NextPage = () => {
  return (
    <div className=" m-auto mt-24  max-w-5xl bg-teal-300 p-4">
      <footer className=" flex items-center justify-between">
        <img className="h-12" src={Logo.src} alt="Logo" />
        <span>
          Made with ❤️ and <b>TypeScript</b>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
