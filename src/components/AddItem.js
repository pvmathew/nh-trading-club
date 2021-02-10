import React, { useState, useEffect, useContext } from "react";
import ItemSuggestions from "./AddItem/ItemSuggestions";
import VariationDropdown from "./AddItem/VariationSuggestions";
import CategoryDropdown from "./AddItem/CategoryDropdown";
import { addItem } from "./api/items";
import { Context } from "../AppContext";
import { motion } from "framer";

const axios = require("axios");

export default function AddItem(props) {
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [variationName, setVariation] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryVisibility, showCategories] = useState(false);

  const [variations, setVariations] = useState([]);
  const [itemSuggestions, setItemSuggestions] = useState([]);

  const [suggestionsVisibility, showSuggestions] = useState(false);
  const [variationsVisibility, showVariations] = useState(false);

  const [selectedItem, selectItem] = useState([]);
  const [image, loadImage] = useState("");

  const [err, setErr] = useState("");

  const { currentToken, currentUser } = useContext(Context);

  const handleKeyPress = (e) => {
    // if enter is pressed, close suggestions and select item
    if (e.charCode === 13) {
      e.preventDefault();
      showSuggestions(false);
      setItemName(itemSuggestions[0]);
      setSelectedItem(itemSuggestions[0]);
    }
  };

  useEffect(() => {
    // empty all fields when category changes
    setItemName("");
    setVariation("");
    setPrice("");
    loadImage("");
  }, [categoryName]);

  useEffect(() => {
    setCategories(["Housewares", "Miscellaneous"]);
  }, []);

  const setSelectedItem = () => {
    selectItem((prevState) => {
      return prevState.filter((item) => item.name.includes(itemName));
    });

    axios
      .get(
        "http://localhost:5000/api/db?category=" +
          categoryName +
          "&itemName=" +
          selectedItem[0].name
      )
      .then((res) => {
        setVariations([...new Set(res.data.map((item) => item.var))]);
        setVariation(selectedItem[0].var);
        loadImage(selectedItem[0].img);
      });

    // setVariations([...new Set(selectedItem.map((item) => item.var))]);
    setVariation(selectedItem[0].var);
    loadImage(selectedItem[0].img);
  };

  useEffect(() => {
    console.log(selectedItem);
    console.log(variations);
  }, [variations]);

  useEffect(() => {
    if ((itemName.length > 3 && !image) || (image && suggestionsVisibility)) {
      showSuggestions(true);
      console.log("Searching in the DB now..");
      axios
        .get(
          "http://localhost:5000/api/db?category=" +
            categoryName +
            "&itemName=" +
            itemName
        )
        .then((res) => {
          let uppercase = res.data.map((data) => {
            let name = data.name.replace(/\b\w/g, (c) => c.toUpperCase());
            return { ...data, name: name };
          });
          let set = [...new Set(uppercase)];
          selectItem(res.data);

          setItemSuggestions(
            [...new Set([...set].map((item) => item.name))].slice(0, 5)
          );
        })
        .catch((err) => console.log(err));
    } else {
      showSuggestions(false);
      setItemSuggestions([]);
    }
  }, [itemName, image, suggestionsVisibility]);

  return (
    <>
      <motion.div
        animate={{ opacity: "100%" }}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 "
      >
        <div className="relative w-auto mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-gray-600 text-2xl font-semibold">
                Create New Listing
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.toggleAddItem()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none text-gray-600">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex justify-between items-center">
              {image && <img className="" src={image}></img>}

              <form className="bg-white px-8 pt-6 pb-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <button
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between"
                    id="category"
                    type="text"
                    value={categoryName}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!categoryVisibility) {
                        showCategories(true);
                      } else {
                        showCategories(false);
                      }
                    }}
                  >
                    <div>{categoryName || "Select"}</div>
                    <div className="mt-2 mr-1 text-gray-500">^</div>
                  </button>
                  {categoryVisibility && (
                    <CategoryDropdown
                      categoryName={categoryName}
                      categories={categories}
                      showCategories={showCategories}
                      setCategoryName={setCategoryName}
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="item"
                  >
                    Item Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="item"
                    type="text"
                    value={itemName}
                    onChange={(e) => {
                      setItemName(e.target.value);
                      if (e.target.value.length === 0) {
                        showSuggestions(false);
                      }
                    }}
                    autoComplete="off"
                    onFocus={() => showSuggestions(true)}
                    disabled={!categoryName.length}
                    onKeyPress={(e) => handleKeyPress(e)}
                    onBlur={() => showSuggestions(false)}
                  />
                  {suggestionsVisibility && (
                    <ItemSuggestions
                      itemSuggestions={itemSuggestions}
                      setItemName={setItemName}
                      showSuggestions={showSuggestions}
                      selectItem={setSelectedItem}
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="variation"
                  >
                    Variation
                  </label>
                  <button
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between"
                    id="variation"
                    type="text"
                    value={variationName}
                    onBlur={() => showVariations(false)}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!variationsVisibility) {
                        showVariations(true);
                      } else {
                        showVariations(false);
                      }
                    }}
                    disabled={variations.length <= 1}
                  >
                    <div>{variationName}</div>
                    <div className="mt-2 mr-1 text-gray-500">^</div>
                  </button>
                  {variationsVisibility && (
                    <VariationDropdown
                      selectedItem={selectedItem}
                      variationSuggestions={variations}
                      showVariations={showVariations}
                      setVariation={setVariation}
                      loadImage={loadImage}
                    />
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <div className="flex items-center ">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <p className="ml-2 text-gray-500">Bells</p>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="bg-teal-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => {
                  console.log(
                    itemName,
                    selectedItem[0].name,
                    variationName,
                    image
                  );
                  if (
                    itemName.toLowerCase() !==
                      selectedItem[0].name.toLowerCase() ||
                    !variationName ||
                    !image
                  )
                    setErr("Please fill in all fields!");
                  else {
                    addItem({
                      itemName,
                      variationName,
                      price,
                      image,
                      token: currentToken,
                      user: currentUser,
                    });
                  }
                }}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
