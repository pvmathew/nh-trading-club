import React, { useState, createContext, useEffect } from "react";
export const Context = createContext();

export const Provider = (props) => {
  const [currentUser, setUser] = useState(localStorage.getItem("user") || "");
  const [currentToken, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    if (!currentUser) localStorage.clear();
    localStorage.setItem("user", currentUser);
    localStorage.setItem("token", currentToken);
  }, [currentToken, currentUser]);

  return (
    <Context.Provider value={{ currentToken, setToken, setUser, currentUser }}>
      {props.children}
    </Context.Provider>
  );
};
