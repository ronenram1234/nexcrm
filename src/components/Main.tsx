import { FunctionComponent, useContext, useEffect } from "react";
import { getAllCardsFromAPI, GlobalProps } from "../App";

import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";

import CardsCarousel from "./CardsCarousel";

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const { setCardArray,cardArray } = useContext(GlobalProps);

  useEffect(() => {


    getAllCardsFromAPI(setCardArray);
  }, [setCardArray]);

  return <CardsCarousel carouselCardArray={cardArray  || []} originScreen="Main"/>;
};

export default Main;
