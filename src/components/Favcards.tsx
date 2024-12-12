import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";

import CardsCarousel from "./CardsCarousel";
import { CardRecFull } from "../interfaces/Card";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  const { setCardArray, currentUser, cardArray } = useContext(GlobalProps);
  const [favCardAray, setFavCardAray] = useState<CardRecFull[] | null>([]);

  //   setCardArray([] as CardRecFull[]);

  useEffect(() => {
    if (cardArray !== null && cardArray.length > 0 && currentUser !== null) {
      setFavCardAray(
        cardArray.filter((item) => item.likes?.includes(currentUser._id))
      );
    }
    // console.log("cardarray changed");
  },[cardArray]);

//   console.log(favCardAray?.length)
//   console.log(cardArray?.length)
//   console.log(currentUser?._id)

  return (
    <>
      <CardsCarousel
        carouselCardArray={favCardAray || []}
        originScreen="FavCards"
      />
    </>
  );
};

export default FavCards;
