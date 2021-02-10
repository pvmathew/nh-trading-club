import React, { useEffect } from "react";
import { motion } from "framer";
import { Link, animateScroll as scroll } from "react-scroll";

export default function Slider(props) {
  const sliderRef = React.createRef();
  useEffect(() => {
    props.setSliderHeight(sliderRef.current.clientHeight);
  }, []);

  return (
    <div
      ref={sliderRef}
      className="slider relative shadow-md mt-40 sm:mt-32 lg:mt-0"
    >
      <img
        className="relative"
        src="https://www.switch-torrents.com/uploads/images/4280.jpg"
        // src="https://wallpapercave.com/wp/wp5728306.jpg"
        alt="slider test"
      ></img>
      <div className="w-full h-full top-0 bg-black absolute opacity-25 "></div>
      <div className="flex flex-col justify-center text-center absolute inset-0">
        <h1 className="text-white  text-2xl md:text-6xl">
          Who doesn't like bells?
        </h1>
        <p className="text-white">Trade. Sell. Repeat.</p>
        <button
          className="bg-teal-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mt-4 self-center w-40"
          type="button"
          onClick={() => props.toggleAboutPage()}
        >
          Learn More
        </button>
      </div>
      <motion.button
        animate={{ y: 10 }}
        transition={{
          yoyo: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
        onClick={() => props.scrollDown()}
        className="shadow-lg border-2 border-white rounded pl-2 pr-2 fixed right-0 bottom-0 mb-24 mr-8 text-white text-3xl focus:outline-none "
      >
        v
      </motion.button>
    </div>
  );
}
