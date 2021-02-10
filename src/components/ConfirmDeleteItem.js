import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer";
import { removeItem } from "./api/items";

export default function AddItem(props) {
  const [response, setResponse] = useState("");

  return (
    <>
      <motion.div
        animate={{ opacity: "100%" }}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 "
      >
        <div className="relative w-auto mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-gray-600 text-2xl font-semibold">
                Please Confirm
              </h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span
                  className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600"
                  onClick={() => props.showConfirmDelete(false)}
                >
                  ×
                </span>
              </button>
            </div>

            <div className="relative p-6 flex justify-between items-center">
              <div className="mr-8">
                <img src={props.listing.image} alt="item to remove"></img>
                <h3 className="text-center">{props.listing.item}</h3>
              </div>
              <div>Will you remove this item?</div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  removeItem(
                    props.listing._id,
                    props.user,
                    props.token,
                    setResponse
                  );
                  
                }}
              >
                Remove Listing
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
