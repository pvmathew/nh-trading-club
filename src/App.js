import React, { useState, useEffect } from "react";
import { Provider } from "./AppContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddItem from "./components/AddItem";
import About from "./components/About";

import Main from "./components/Main";

function App() {
  const [loginIsVisible, toggleLogin] = useState(false);
  const [signupIsVisible, toggleSignup] = useState(false);
  const [profileIsVisible, toggleProfile] = useState(false);
  const [addItemIsVisible, toggleAddItem] = useState(false);
  const [itemPageIsVisible, toggleItemPage] = useState(false);
  const [aboutPageIsVisible, toggleAboutPage] = useState(false);

  const [navStatus, setNavStatus] = useState("free");

  useEffect(() => {
    console.log(itemPageIsVisible);
  }, [itemPageIsVisible]);

  const mainContent = aboutPageIsVisible
    ? "App bg-gray-300 h-screen max-h-screen w-screen relative transform shadow-lg transition duration-500 translate-x-1/2"
    : "App bg-gray-300 h-screen max-h-screen w-screen relative transform shadow-lg transition duration-500";

  return (
    <Provider>
      <div id="wrapper" className="w-full overflow-hidden bg-black">
        <About
          toggleAboutPage={toggleAboutPage}
          aboutPageIsVisible={aboutPageIsVisible}
        />
        <div id="main-content" className={mainContent}>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={
              props.navStatus === "fixed" &&
              !props.profileIsVisible &&
              !props.itemPageIsVisible
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            className="w-full h-full inset-0 lg:bg-black absolute"
          ></motion.div> */}
          <Nav
            profileIsVisible={profileIsVisible}
            addItemIsVisible={addItemIsVisible}
            itemPageIsVisible={itemPageIsVisible}
            navStatus={navStatus}
            toggleLogin={() => {
              if (signupIsVisible) toggleSignup(false);
              toggleLogin(true);
            }}
            toggleSignup={() => {
              if (loginIsVisible) toggleLogin(false);
              toggleSignup(true);
            }}
            toggleProfile={() => {
              if (profileIsVisible) toggleProfile(false);
              toggleProfile(true);
            }}
            loginIsVisible={loginIsVisible}
            signupIsVisible={signupIsVisible}
            toggleAboutPage={toggleAboutPage}
          />
          {loginIsVisible ? (
            <Login close={() => toggleLogin(false)} />
          ) : signupIsVisible ? (
            <Signup close={() => toggleSignup(false)} />
          ) : profileIsVisible ? (
            <Profile close={() => toggleProfile(false)} />
          ) : null}

          {addItemIsVisible && (
            <AddItem
              toggleAddItem={() => toggleAddItem((prevState) => !prevState)}
            />
          )}
          <Main
            setNavStatus={setNavStatus}
            toggleAddItem={() => toggleAddItem((prevState) => !prevState)}
            toggleItemPage={() => toggleItemPage((prevState) => !prevState)}
            toggleAboutPage={() => toggleAboutPage((prevState) => !prevState)}
          ></Main>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
