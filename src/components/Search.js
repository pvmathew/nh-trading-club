import React, { useState } from "react";

export default function Search(props) {
  const { search, setSearch, setQueriedItems, items } = props;
  const [query, setQuery] = useState("");

  if (query) {
    return (
      <div className="ml-8 inline flex items-center justify-between pl-2 rounded-lg border-2 border-gray-400 h-10  min-w-24 max-w-screen">
        <p>{query}</p>
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          onClick={() => {
            setQuery("");
            setSearch("");
            setQueriedItems([]);
          }}
        >
          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600">
            ×
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={() => {
          setQuery(search);

          setQueriedItems(
            items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )
          );
        }}
        className="ml-4 flex-col md:flex-row justify-center items-center"
      >
        <input
          className="md:ml-4 pl-2 pr-2 rounded-lg border-2 border-gray-400 h-10 w-full md:w-64"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button
          type="submit"
          className="text-gray-500 bg-white pl-2 pr-2 pt-1 pb-1 rounded self-center w-full md:w-10 mt-4 md:ml-2"
        >
          GO
        </button>
      </form>
    );
  }
}
