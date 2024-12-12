import { FunctionComponent, useContext, useEffect } from "react";
import { GlobalProps } from "../App";

import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";

import CardsCarousel from "./CardsCarousel";
import { CardRecFull } from "../interfaces/Card";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  const { setCardArray, currentUser } = useContext(GlobalProps);

//   setCardArray([] as CardRecFull[]);

  useEffect(() => {
    async function getAllFavCardsFromAPI() {
      try {
  
        const res = await getAllCards();

        if (currentUser !== null && currentUser._id!==undefined) {

            const likeCards: CardRecFull[] = res.data.filter(
            (card: CardRecFull) => card.likes?.includes(currentUser._id)
          );
        // console.log(likeCards)

          setCardArray(likeCards);
        }
        else{
            errorMsg("Error -User not logged in. Please log in to see your favorite cards. ")
          }
      } catch (err: any) {
        console.log(err);
        if (err.response) {
          errorMsg(`Transaction Error - ${err.response}`);
        }
      }
    }

    getAllFavCardsFromAPI();
  }, [currentUser]);

  return (
    <>
      <CardsCarousel screen="FavCards" />
    </>
  );
};

export default FavCards;
