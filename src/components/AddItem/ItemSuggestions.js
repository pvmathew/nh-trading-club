import React from "react";

export default function ItemSuggestions(props) {
  const itemSuggestions = props.itemSuggestions;

  const suggestions = itemSuggestions.map((suggestion, index) => (
    <li className="" key={index}>
      <button
        className="bg-white w-full text-left hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
        onClick={(e) => {
          e.preventDefault();
          props.showSuggestions(false);
          props.setItemName(suggestion);
          props.selectItem(suggestion);
        }}
      >
        {suggestion}
      </button>
    </li>
  ));

  return (
    <div>
      <ul className="absolute  bg-white text-gray-700 shadow-md pt-1">
        {suggestions}
      </ul>
    </div>
  );
}
