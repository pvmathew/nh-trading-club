import React from "react";
import { motion, Scroll, useCycle } from "framer";

export default function ItemPage(props) {
  const listing = props.listing;

  const className =
    "fixed z-45 top-0 bg-white left-0 right-0 bottom-0 w-full h-full pt-40 md:pt-24";

  return (
    <motion.div
      animate={{ opacity: "100%" }}
      initial={{ opacity: "0%" }}
      className={className}
    >
      <div className="relative inset-0 md:pt-12">
        <div className="border-0 relative flex flex-col w-full bg-white ">
          <div className="flex items-start justify-start p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-gray-600 text-2xl font-semibold">
              {listing.item}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => props.showItemPage()}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-2 flex justify-center items-center">
            <form className="bg-white pl-4 pt-6 pb-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="item"
                >
                  Item Name
                </label>
                <p className="ml-2 text-gray-500">{listing.item} Bells</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="variation"
                >
                  Variation
                </label>
                <p className="ml-2 text-gray-500">{listing.variation} Bells</p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <div className="flex items-center ">
                  <p className="ml-2 text-gray-500">{listing.price} Bells</p>
                </div>
              </div>
            </form>
            <img className="h-64 w-64" src={listing.image}></img>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <label className="text-gray-700 text-sm font-bold" htmlFor="price">
              Sold By:
            </label>
            <p className="ml-2 text-gray-500 mr-4">{listing.username}</p>

            <button
              className="bg-teal-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
              type="button"
            >
              Buy Item
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
