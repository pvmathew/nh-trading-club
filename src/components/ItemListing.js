import React, { useState, useEffect } from "react";
import ItemPage from "./ItemPage";

export default function ItemListing(props) {
  const listing = props.item;
  const [itemPageIsVisible, showItemPage] = useState(false);

  useEffect(() => {
    props.toggleItemPage();
  }, [itemPageIsVisible]);

  return (
    <>
      <button className="m-1 w-full md:w-56" onClick={() => showItemPage(true)}>
        <li
          key={props.key}
          className="mt-4 h-64 md:w-auto flex flex-col rounded shadow-md bg-white"
        >
          <img className="w-40 self-center" src={listing.image} alt="listing" />

          <p>{listing.item}</p>
          {listing.variation !== "NA" && (
            <p className="text-gray-500">{listing.variation}</p>
          )}
          <div className="mt-auto ml-auto flex justify-end items-center">
            <p>{listing.price}</p>
            <img
              className="h-8"
              src="https://dodo.ac/np/images/thumb/1/1e/99k_Bells_NH_Inv_Icon.png/120px-99k_Bells_NH_Inv_Icon.png"
              alt="bells"
            ></img>
          </div>
        </li>
      </button>
      {itemPageIsVisible && (
        <ItemPage showItemPage={() => showItemPage(false)} listing={listing} />
      )}
    </>
  );
}
