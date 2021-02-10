import React, { useContext } from "react";
import { Context } from "../AppContext";
import { useState, useEffect } from "react";
import { Frame, motion } from "framer";

export default function Nav(props) {
  const { currentUser, setUser, setToken } = useContext(Context);
  const navClass =
    "flex bg-white lg:bg-transparent items-center flex-wrap p-4 z-50 w-full fixed shadow-md lg:shadow-none";

  const navTextColor =
    props.profileIsVisible || props.itemPageIsVisible
      ? "flex items-center flex-shrink-0 text-gray-500 lg:text-gray-500 mr-6 z-30"
      : "flex items-center flex-shrink-0 text-gray-500 lg:text-gray-200 mr-6 z-30";

  const loginTextClass =
    props.profileIsVisible || props.itemPageIsVisible
      ? "mr-2 text-gray-500 lg:text-gray-500"
      : "mr-2 text-gray-500 lg:text-gray-200";

  const hotlinksClass =
    props.profileIsVisible || props.itemPageIsVisible
      ? "block mt-4 lg:inline-block lg:mt-0 text-gray-500  lg:text-gray-500 hover:text-gray-300 mr-4"
      : "block mt-4 lg:inline-block lg:mt-0 text-gray-500  lg:text-gray-200 hover:text-gray-300 mr-4";

  const navButtonsClass =
    props.profileIsVisible || props.itemPageIsVisible
      ? "inline-block text-sm px-4 py-2 mr-4 leading-none border rounded text-gray-500  lg:text-gray-500 border-gray hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
      : "inline-block text-sm px-4 py-2 mr-4 leading-none border rounded text-gray-500  lg:text-gray-200 border-gray hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0";

  return (
    <nav className={navClass}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          props.navStatus === "fixed" &&
          !props.profileIsVisible &&
          !props.itemPageIsVisible
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        className="w-full h-full inset-0 lg:bg-gray-700 absolute"
      ></motion.div>
      <div className={navTextColor}>
        <svg
          className="h-5 w-5 mr-1 fill-current text-teal-400"
          xmlns="https://image.flaticon.com/icons/svg/497/497348.svg"
          viewBox="0 0 20 20"
        >
          <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z" />
        </svg>
        <span className="font-extrabold">New Horizons Trading Club</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto z-30">
        <div className="text-sm lg:flex-grow">
          <button
            href="#responsive-header"
            className={hotlinksClass}
            onClick={() => props.toggleAboutPage(true)}
          >
            About
          </button>
        </div>
        {currentUser === "" ? (
          <div>
            <button
              className="inline-block text-sm px-4 py-2 mr-4 leading-none border rounded text-gray-500 lg:text-gray-200 border-gray hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
              onClick={props.toggleSignup}
            >
              Sign Up
            </button>
            <button
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-500  lg:text-gray-200 border-gray hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
              onClick={props.toggleLogin}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <p className={loginTextClass}>
              Thanks for logging in, {currentUser}!
            </p>
            <button className={navButtonsClass} onClick={props.toggleProfile}>
              Profile
            </button>
            <button
              className={navButtonsClass}
              onClick={() => {
                setUser("");
                setToken("");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
