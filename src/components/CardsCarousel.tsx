import { FunctionComponent, useContext,  useState } from "react";
import { GlobalProps } from "../App";

import ModalLoginReg from "./ModalLoginReg";


import CraeteCard from "./CraeteCard";
import { Carousel, Row, Tab, Tabs } from "react-bootstrap";


interface CardsCarouselProps {}

const CardsCarousel: FunctionComponent<CardsCarouselProps> = () => {
  const {  isUserLogedin, cardArray } =
    useContext(GlobalProps);
  const [activeTab, setActiveTab] = useState<string>("Tab 1");

  const chunkCards = (cards: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < cards.length; i += chunkSize) {
      chunks.push(cards.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const cardChunks = chunkCards(cardArray || [], 10);

  return (
    <div className="container mt-4">
      <Tabs
        id="card-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "Tab 1")}
        className="mb-3"
      >
        {cardChunks.map((chunk, index) => (
          <Tab
            eventKey={`Tab ${index + 1}`}
            title={`Tab ${index + 1}`}
            key={index}
          >
            <Carousel interval={null}>
              {chunk.map((item, ind) => (
                <Carousel.Item key={ind}>
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {chunk.map((card, cardIndex) => (
                      <CraeteCard item={card} ind={cardIndex} />
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

export default CardsCarousel;
