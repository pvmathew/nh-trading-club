import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-white h-12 bottom-0 h-16 shadow-md border-t p-3 text-center text-gray-500 text-sm fixed z-50">
      <p>
        All images and item names pulled from{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1JIdQfBj4P_dBpRacml43nSUcsI7THLgU/edit#gid=2022104473"
          className="text-blue-200"
        >
          here
        </a>
        .
      </p>
      <p className="mb-2">Made with care in React</p>
    </div>
  );
}
