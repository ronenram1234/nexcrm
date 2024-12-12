import { FunctionComponent, useContext,  useState } from "react";
import { GlobalProps } from "../App";

import ModalLoginReg from "./ModalLoginReg";


import CreateCard from "./CreateCard";
import { Carousel, Row, Tab, Tabs } from "react-bootstrap";
import { Switch } from "@mui/material";
import { CardRecFull } from "../interfaces/Card";


interface CardsCarouselProps {
  carouselCardArray:CardRecFull[];
  originScreen:string
}

const CardsCarousel: FunctionComponent<CardsCarouselProps> = ({carouselCardArray,originScreen}) => {
  const {  isUserLogedin } =
    useContext(GlobalProps);
  const [activeTab, setActiveTab] = useState<string>("Tab 1");

  const chunkCards = (carouselCardArray: CardRecFull[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < carouselCardArray.length; i += chunkSize) {
      chunks.push(carouselCardArray.slice(i, i + chunkSize));
    }
    return chunks;
  };

  
// console.log("carsoule", carouselCardArray)
  const cardChunks = chunkCards(carouselCardArray || [], 10);

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
            <Carousel interval={null} className="custom-carousel" controls={false} >
           
            
              {chunk.map((item, ind) => (
                <Carousel.Item key={item._id || ind}>
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {chunk.map((card, cardIndex) => (
                      <CreateCard item={card} ind={cardIndex} originScreen={originScreen}  key={`${card._id}-${cardIndex}`}/>
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
