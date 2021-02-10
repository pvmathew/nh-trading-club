import React from "react";

export default function CategoryDropdown(props) {
  const categories = props.categories;

  const dropdownItems = categories.map((category, index) => (
    <li className="" key={index}>
      <button
        className="bg-white w-full text-left hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
        onClick={(e) => {
          e.preventDefault();
          props.showCategories(false);
          props.setCategoryName(category);
        }}
      >
        {category}
      </button>
    </li>
  ));

  return (
    <div>
      <ul className="absolute  bg-white text-gray-700 shadow-md pt-1">
        {dropdownItems}
      </ul>
    </div>
  );
}
