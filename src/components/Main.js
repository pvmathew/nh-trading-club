import React, { useState, useEffect } from "react";
import ItemListing from "./ItemListing";
import AddItemTile from "./AddItemTile";
import Search from "./Search";
import Slider from "./Slider";
import { getItems } from "./api/items";

export default function Main(props) {
  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");
  const [queriedItems, setQueriedItems] = useState([]);
  const [sliderHeight, setSliderHeight] = useState(500);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState([]);

  const [nowShowingItems, setNowShowing] = useState([1, 12]);

  const mainRef = React.createRef();
  const scrollToMain = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth" });
    mainRef.current.addEventListener("scroll", console.log("test"));
  };

  useEffect(() => {
    getItems(setItems);
  }, []);

  useEffect(() => {
    let frontPage = items.slice(0, 12);
    setCurrentPageItems(frontPage);
  }, [items]);

  const listenScrollEvent = (event) => {
    const element = event.target;

    if (element.scrollTop > sliderHeight - 100) {
      props.setNavStatus("fixed");
    } else {
      props.setNavStatus("free");
    }
  };

  const loadPage = (page) => {
    setCurrentPage(page);
    let n = 12 * (page - 1);
    let i = items.slice(n, n + 12);
    setCurrentPageItems(i);
    setNowShowing([n + 1, n + i.length]);
  };

  const allItems = queriedItems.length ? queriedItems : currentPageItems;

  const itemTiles = allItems
    .sort()
    .map((item, key) => (
      <ItemListing
        toggleItemPage={props.toggleItemPage}
        key={key}
        item={item}
      />
    ));

  let p = [];
  for (let i = 1; i <= Math.ceil(items.length / 12); i++) {
    p.push(i);
  }
  const numPages = queriedItems.length
    ? null
    : p.map((p, index) => {
        let className = "ml-1 mr-1";
        if (index + 1 === currentPage) {
          className += " font-extrabold";
        }

        return (
          <button onClick={() => loadPage(p)}>
            <li className={className}>{p}</li>
          </button>
        );
      });

  return (
    <div
      className="main-div overflow-scroll relative left-0 top-0 w-screen  h-screen z-30"
      onScroll={listenScrollEvent}
    >
      <Slider
        toggleAboutPage={props.toggleAboutPage}
        setSliderHeight={setSliderHeight}
        scrollDown={scrollToMain}
      />
      <div
        ref={mainRef}
        id="main"
        name="main"
        className=" pl-8 pr-8 pt-6 pb-24"
      >
        <h2 className="font-black text-gray-500 text-xl md:text-4xl ">
          Looking for something?
        </h2>
        <h3 className="font-extrabold text-gray-600 text-lg mb-4">
          Recent Listings
        </h3>
        <div className="flex items-center border-t border-solid border-gray-400 pt-4">
          <AddItemTile toggleAddItem={() => props.toggleAddItem()} />
          <Search
            search={search}
            setSearch={setSearch}
            setQueriedItems={setQueriedItems}
            items={items}
            currentPageItems={setCurrentPageItems}
          />
        </div>
        <ul className="relative pt-4 flex-col text-center md:flex-row min-h-64">
          {itemTiles}
        </ul>
        <div className="mt-4 text-center flex justify-center text-gray-600 inline">
          <ul className="">{numPages}</ul>
          <p className="absolute italic right-0 mr-48">
            Now showing items {nowShowingItems[0]}-
            {items.length < 13 ? items.length : nowShowingItems[1]} of{" "}
            {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
