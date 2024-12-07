import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

import { ToastContainer } from "react-bootstrap";
import { User } from "./interfaces/User";

// import { useSetCurrentUser } from "./services/useSetCurrentUser";
import {
  getTokenLocalStorage,
  getUserDetail,
  removeTokenLocalStorage,
  tokenToDecoode,
} from "./services/userServices";
import { Jwt } from "./interfaces/Jwt";

interface GlobalPropsType {
  isUserLogedin: boolean;
  setIsUsserLogedin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;

  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const GlobalProps = createContext<GlobalPropsType>({
  isUserLogedin: false,
  setIsUsserLogedin: () => {},
  token: "",
  setToken: () => {},
  currentUser: null,
  setCurrentUser: () => {},

  isDarkMode: false,
  setIsDarkMode: () => {},
});

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark
// dark and light mode implementation

function App() {
  const localToken = getTokenLocalStorage() || "";
  // console.log(localToken);
  const [token, setToken] = useState(localToken);
  const [isUserLogedin, setIsUsserLogedin] = useState(
    localToken === "" ? false : true
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const globalContextValue = {
    isUserLogedin,
    setIsUsserLogedin,
    token,
    setToken,
    currentUser,
    setCurrentUser,
    isDarkMode,
    setIsDarkMode,
  };

  // check if user alreadt login before
  // useSetCurrentUser();
  useEffect(() => {
    if (localToken !== "") {
      // setIsUsserLogedin(true);
      const jwtUser: Jwt = tokenToDecoode(localToken);
      getUserDetail(jwtUser._id, localToken)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          // alert("Transaction Error");
          removeTokenLocalStorage();
          setIsUsserLogedin(false);
        });
    }
  }, []);

  return (
    <>
      {/* <ToastContainer /> */}
      <GlobalProps.Provider value={globalContextValue}>
        <div className="App">
          <>
            <NavBar />
            {console.log("App")}
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>

            <Footer />
          </>
        </div>
      </GlobalProps.Provider>
    </>
  );
}

export default App;
