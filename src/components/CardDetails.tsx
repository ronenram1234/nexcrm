
import { faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { CardRecFull } from "../interfaces/Card";




interface CardDetailsProps {
    // id:string
    // card:CardRecFull;
}
 
const CardDetails: FunctionComponent<CardDetailsProps> = () => {
  
    const location = useLocation();  // Get the location object which contains the state
    const card = location.state?.card;
   
    return (<>

<div className="business-card">
      <div className="card-image">
        <img src={card.image.url} alt={card.image.alt} className="business-logo" />
      </div>
      <div className="card-content">
        <h3>{card.title}</h3>
        {card.subtitle && <h5>{card.subtitle}</h5>}
        {card.description && <p>{card.description}</p>}
        <p>
          <FontAwesomeIcon icon={faPhone} /> {card.phone}
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> {card.email}
        </p>
        {card.web && (
          <p>
            <FontAwesomeIcon icon={faGlobe} />{" "}
            <a href={card.web} target="_blank" rel="noopener noreferrer">
              {card.web}
            </a>
          </p>
        )}
        <p>
          {card.address.street}, {card.address.city}, {card.address.state || ""}{" "}
          {card.address.zip} {card.address.country}
        </p>
        {card.bizNumber && <p>Business Number: {card.bizNumber}</p>}
      </div>
    </div>
   
    </>  );
}
 
export default CardDetails;