import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import ModalLoginReg from "./ModalLoginReg";
import { getAllCards } from "../services/cardServices";
import { errorMsg } from "../services/feedbackService";

import CraeteCard from "./CraeteCard";
import { Carousel, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const { isDarkMode, isUserLogedin, cardArray, setCardArray } =
    useContext(GlobalProps);
    const [activeTab, setActiveTab] = useState<string>("Tab 1");
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

   // Split cards into chunks for tabs
   const chunkCards = (cards: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < cards.length; i += chunkSize) {
      chunks.push(cards.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const cardChunks = chunkCards(cardArray || [], 10); // 15 cards per tab

  const location = useLocation(); // Hook to get location object
  console.log(location.pathname)

  return (
    <div className="container mt-4">
    <Tabs
      id="card-tabs"
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k || "Tab 1")}
      className="mb-3"
    >
      {cardChunks.map((chunk, index) => (
        <Tab eventKey={`Tab ${index + 1}`} title={`Tab ${index + 1}`} key={index}>
          <Carousel interval={null}>
            {chunk.map((item, ind) => (
              <Carousel.Item key={ind}>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {chunk.map((card, cardIndex) => (
                    <CraeteCard item={card} ind={cardIndex}  />
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Tab>
      ))}
    </Tabs>
    {!isUserLogedin && <ModalLoginReg />}
  </div>
  );
};

export default Main;
