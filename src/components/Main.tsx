import { FunctionComponent, useContext, useEffect } from "react";
import { GlobalProps } from "../App";

import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";

import CardsCarousel from "./CardsCarousel";

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const { setCardArray } = useContext(GlobalProps);

  useEffect(() => {
    async function getAllCardsFromAPI() {
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

    getAllCardsFromAPI();
  }, [setCardArray]);

  return <CardsCarousel screen="Main"/>;
};

export default Main;
