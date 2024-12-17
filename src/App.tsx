import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

// import { ToastContainer } from "react-bootstrap";
import { User } from "./interfaces/User";

// import { useSetCurrentUser } from "./services/useSetCurrentUser";
import {
  getTokenLocalStorage,
  getUserDetail,
  removeTokenLocalStorage,
  tokenToDecoode,
} from "./services/userServices";
import { Jwt } from "./interfaces/Jwt";
import { CardRecFull } from "./interfaces/Card";
import About from "./components/About";

import Sandbox from "./components/Sandbox";
import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import { errorMsg } from "./services/feedbackService";
import { getAllCards } from "./services/cardServices";
import CardDetails from "./components/CardDetails";

import NewEditCard from "./components/NewEditCard";
import { ToastContainer } from "react-toastify";

interface GlobalPropsType {
  isUserLogedin: boolean;
  setIsUsserLogedin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  cardArray: CardRecFull[] | null;
  setCardArray: React.Dispatch<React.SetStateAction<CardRecFull[] | null>>;

  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}
export const GlobalProps = createContext<GlobalPropsType>({
  isUserLogedin: false,
  setIsUsserLogedin: () => {},
  token: "",
  setToken: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  cardArray: null,
  setCardArray: () => {},

  isDarkMode: false,
  setIsDarkMode: () => {},
  searchString: "",
  setSearchString: () => {},
});

export async function getAllCardsFromAPI(
  setCardArray: React.Dispatch<React.SetStateAction<CardRecFull[] | null>>
) {
  try {
    const res = await getAllCards();

    setCardArray(res.data);
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      errorMsg(`Transaction Error - ${err.response}`);
    }
  }
}

function App() {
  const localToken = getTokenLocalStorage() || "";

  const [token, setToken] = useState(localToken);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cardArray, setCardArray] = useState<CardRecFull[] | null>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [isUserLogedin, setIsUsserLogedin] = useState(
    localToken === "" ? false : true
  );

  const globalContextValue = {
    isUserLogedin,
    setIsUsserLogedin,
    token,
    setToken,
    currentUser,
    setCurrentUser,
    cardArray,
    setCardArray,
    isDarkMode,
    setIsDarkMode,
    searchString,
    setSearchString,
  };

  // check if user alreadt login before
  // useSetCurrentUser();

  useEffect(() => {
    if (localToken !== "") {
      // setIsUsserLogedin(true);
      const jwtUser: Jwt = tokenToDecoode(localToken);
      getUserDetail(jwtUser._id, localToken)
        .then((res) => {
          // test of user admin/business/regular
          const userRec = { ...res.data, isAdmin: false, isBusiness: true };
          setCurrentUser(userRec);
          // setCurrentUser(res.data)
        })
        .catch((err) => {
          console.log(err);
          // alert("Transaction Error");
          removeTokenLocalStorage();
          setIsUsserLogedin(false);
        });
    }
  }, [localToken]);

  useEffect(() => {
    if (cardArray?.length === 0) {
      getAllCardsFromAPI(setCardArray);
    }
  }, [cardArray]);

  return (
    <>
      <ToastContainer />
      <GlobalProps.Provider value={globalContextValue}>
        <div className="App">
          <>
            <div className="container">
              <Router>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/favcards" element={<FavCards />} />
                  <Route path="/mycards" element={<MyCards />} />
                  <Route path="/sandbox" element={<Sandbox />} />
                  <Route path="/carddetails" element={<CardDetails />} />
                  <Route path="/neweditcard" element={<NewEditCard />} />

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
              </Router>
            </div>
          </>
        </div>
      </GlobalProps.Provider>
    </>
  );
}

export default App;
