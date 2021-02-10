import React from "react";

export default function VariationSuggestions(props) {
  const variationSuggestions = props.variationSuggestions;

  const suggestions = variationSuggestions.map((suggestion, index) => (
    <li className="" key={index}>
      <button
        className="bg-white w-full text-left hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
        onClick={(e) => {
          console.log("I was clicked!");

          e.preventDefault();
          props.showVariations(false);
          props.setVariation(suggestion);
          let selectedItem = props.selectedItem.find(
            (item) => item.var === suggestion
          );

          props.loadImage(selectedItem.img);
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
