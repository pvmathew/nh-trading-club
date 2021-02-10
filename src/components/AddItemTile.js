import React, { useContext, useState } from "react";
import { Context } from "../AppContext";

export default function AddItemTile(props) {
  const { currentToken } = useContext(Context);
  const { tileIsHidden, hideTile } = useState(false);

  const loginCheck = () => {
    if (!currentToken) {
      alert("Please login!");
    } else {
      props.toggleAddItem();
    }
  };

  return (
    <button
      onClick={loginCheck}
      className="static text-center bg-white shadow-md rounded p-4 hover:bg-teal-300 text-gray-500 hover:text-white"
    >
      <span className="text-2xl">+ Add Item</span>
    </button>
  );
}
