import React, { useEffect, useContext } from "react";
// import { motion } from "framer";
import { Context } from "../AppContext";

export default function Profile(props) {
  const { currentUser } = useContext(Context);
  const fakeListings = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ];

  const aboutContent = props.aboutPageIsVisible
    ? "bg-white h-full pt-40 md:pt-24 pb-20 h-screen w-1/2 absolute left-0 transition duration-500"
    : "bg-white h-full pt-40 md:pt-24 pb-20 h-screen w-1/2 absolute left-0 transform -translate-x-1/2 transition duration-500";

  return (
    <div className={aboutContent}>
      <div className="relative inset-0 md:pt-12">
        <div className="border-0 relative flex flex-col w-full bg-white ">
          <div className="flex items-start justify-start p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-gray-600 text-2xl font-semibold">
              About this site
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => props.toggleAboutPage(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600">
                ×
              </span>
            </button>
          </div>
          <div className="bg-white md:px-8 pt-6 pb-8">
            <div className="mb-4">
              <p className="ml-2 text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum quaerat eligendi debitis aliquam quis animi. Enim
                exercitationem harum, eius, incidunt veniam voluptas, dolores
                eos ratione recusandae pariatur aut officia consequatur!
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="variation"
              >
                Technologies Used
              </label>
              <p className="ml-2 text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                voluptas ad accusamus asperiores doloribus dicta ipsum dolorem
                quasi inventore iure! Adipisci, vitae officia at consectetur
                provident sequi assumenda nemo quo.
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Who am I?
              </label>
              <div className="flex items-center ">
                <p className="ml-2 text-blue-300">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum corporis, fuga quo quis quasi nesciunt eaque
                  inventore facere. Explicabo suscipit sequi aliquid iste harum
                  nostrum illo officia magni unde! Consequuntur.
                </p>
              </div>
            </div>
          </div>
          {/*current listings*/}
          <div className="flex-column items-center p-6 border-t border-solid border-gray-300 rounded-b">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              My Other Works
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
