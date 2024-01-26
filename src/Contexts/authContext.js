import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

// Firebase
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseinnit";

// Toast Notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const authContext = createContext();

export const useAuth = () => {
  const value = useContext(authContext);
  return value;
};
export const AuthContextProvider = ({ children }) => {
  return (
    <authContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        signIn,
        userList,
        logOut,
        signUp,
        currUser,
        setCurrUser,
      }}
    >
      <ToastContainer />
      {children}
    </authContext.Provider>
  ))
};
