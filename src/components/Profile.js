import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer";
import { Context } from "../AppContext";
import { getProfile } from "./api/profile";
import ConfirmDeleteItem from "./ConfirmDeleteItem";

export default function Profile(props) {
  const { currentUser, currentToken } = useContext(Context);
  const [userListings, setUserListings] = useState([]);
  const [isConfirmDeleteVisible, showConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  const currentListings = userListings.map((listing, index) => {
    let className = "left-0 right-0 p-8 flex justify-between";
    if (index % 2 === 1) {
      className += " bg-gray-300";
    }

    return (
      <li className={className}>
        <div className="">
          <img className="inline" src={listing.image}></img>
          {listing.item}
        </div>
        <button
          className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mt-4 self-center w-40"
          type="button"
          onClick={() => {
            setItemToDelete(listing);
            showConfirmDelete(true);
          }}
        >
          Delete
        </button>
      </li>
    );
  });

  useEffect(() => {
    getProfile(currentUser, setUserListings);
  }, []);

  return (
    <motion.div
      animate={{ opacity: "100%" }}
      initial={{ opacity: "0%" }}
      className="fixed z-40 top-0 bg-white left-0 right-0 bottom-0 w-full h-full pt-40 md:pt-16 pb-20"
    >
      <div className="relative inset-0 h-full">
        {isConfirmDeleteVisible && (
          <ConfirmDeleteItem
            user={currentUser}
            token={currentToken}
            listing={itemToDelete}
            showConfirmDelete={showConfirmDelete}
          />
        )}

        <div className="border-0 relative flex flex-col w-full bg-white h-full">
          <div className="flex items-start justify-start p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-gray-600 text-2xl font-semibold">Dashboard</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={props.close}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex justify-between md:justify-around items-center">
            <div className="bg-white md:px-8 pt-6 pb-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="item"
                >
                  Username
                </label>
                <p className="ml-2 text-gray-500">{currentUser}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="variation"
                >
                  Email
                </label>
                <p className="ml-2 text-gray-500">BLAH Bells</p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Password
                </label>
                <div className="flex items-center ">
                  <p className="ml-2 text-blue-300">Change Password</p>
                </div>
              </div>
            </div>
            <img
              className="h-32 w-32 md:w-64 md:h-64 rounded-full border"
              src="https://coffitivity.com/assets/images/illustrations/headphones-man.png"
              alt="profile pic"
            ></img>
          </div>
          {/*current listings*/}
          <div className="flex-column items-center p-6 border-t border-solid border-gray-300 rounded-b h-full">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              Current Listings
            </h2>
            <ul className="overflow-y-scroll h-full">{currentListings}</ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
