import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { CardRecFull } from "../interfaces/Card";
import { useNavigate } from "react-router-dom";
import BussinessMap from "./BussinessMap";
import { ToastContainer } from "react-toastify";

interface CardDetailsProps {
  // id:string
  // card:CardRecFull;
}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the location object which contains the state
  const card = location.state?.card;
  const [address, setAddress] = useState<string>( `${card.address.street}, ${card.address.city},
    ${card.address.state || ""} ${card.address.zip}
    ${card.address.country}`);
  

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="business-card mt-3 ">
          <div className="row">
            <div className="card-image col-7">
              <img
                src={card.image.url}
                alt={card.image.alt}
                className="business-logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="card-content col-5">
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
                {card.address.street}, {card.address.city},{" "}
                {card.address.state || ""} {card.address.zip}{" "}
                {card.address.country}
              </p>
              {card.bizNumber && <p>Business Number: {card.bizNumber}</p>}

              

              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="btn btn-primary"
              >
                Return
              </button>
            </div>
          </div>
        </div>
        <>
        {console.log(address)}
            <BussinessMap address={address} />
            </>
      </div>
    </>
  );
};

export default CardDetails;
