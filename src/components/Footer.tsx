import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
    faHeart,
  
} from "@fortawesome/free-solid-svg-icons";


import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
      <Row className="d-flex justify-content-center">
      <Col xs="auto">
        <FontAwesomeIcon
          icon={faCircleInfo}
          onClick={() => navigate(`/about`)}
          title="OPEN ABOUT"
          size="2x" 
        className="mx-2"
        />
      </Col>
      <Col xs="auto">
        <FontAwesomeIcon
          icon={faHeart}
          onClick={() => navigate(`/favcards`)}
          title="OPEN FAV CARDS"
          size="2x" 
        className="mx-2"
        />
      </Col>
      <Col xs="auto">
        <FontAwesomeIcon
          icon={faAddressCard}
          onClick={() => navigate(`/mycards`)}
          title="OPEN MY CARDS"
          size="2x" 
        className="mx-2"
        />
      </Col>
    </Row>
      </Container>
    </footer>
  );
};

export default Footer;
