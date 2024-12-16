import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import CardsCarousel from "./CardsCarousel";
import { CardRecFull } from "../interfaces/Card";
import { useNavigate } from "react-router-dom";

interface MycardsProps {
    
}
 
const MyCards: FunctionComponent<MycardsProps> = () => {

  const {  currentUser, cardArray } = useContext(GlobalProps);
  const [myCardArray, setMyCardArray] = useState<CardRecFull[] | null>([]);
  const navigate = useNavigate();

  //   setCardArray([] as CardRecFull[]);

  useEffect(() => {
    if (cardArray !== null && cardArray.length > 0 && currentUser !== null) {
      setMyCardArray(
        cardArray.filter((item) => (item.user_id ===currentUser._id))
      );
    }

  },[cardArray]);

    
    return ( <>
    <CardsCarousel
        carouselCardArray={myCardArray || []}
        originScreen="Mycards"
      />
      <button className="btn btn-primary" onClick={()=>navigate(`/neweditcard`,{ state: { action: "new" } })}>Add New Card</button>
    </> );
}
 
export default MyCards;