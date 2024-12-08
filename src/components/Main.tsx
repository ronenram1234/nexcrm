import { FunctionComponent, useContext, useEffect } from "react";
import { GlobalProps } from "../App";
// import { useNavigate } from "react-router-dom";
import ModalLoginReg from "./ModalLoginReg";
import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";
import { RouteRounded } from "@mui/icons-material";
import CraeteCard from "./CraeteCard";

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const { isDarkMode, isUserLogedin, cardArray, setCardArray } =
    useContext(GlobalProps);
  // const navigate = useNavigate();
  // console.log(token);

  async function getAllCardsFromAPI() {
    try {
      const res = await getAllCards();
      console.log(res.data[0]);
      console.log(res.data[1]);
      setCardArray(res.data);
      console.log(res);
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        errorMsg(`Transaction Error - ${err.response}`);
      }
    }
  }

  useEffect(() => {
    getAllCardsFromAPI();
  }, []);

  return (
    <>
      {/* Use Fragment to return the list of cards */}
      <>
        {cardArray?.map((item, ind) => {
          if (ind < 2) {
            
           return  <CraeteCard item={item} ind={ind}/>
            
          }
          return null;
        })}
      </>
      {/* <h1>main</h1> */}
      {!isUserLogedin && (<ModalLoginReg />)}
    </>
  );
};

export default Main;
