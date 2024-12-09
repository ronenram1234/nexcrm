import { FunctionComponent, useState } from "react";
import { CardRecFull } from "../interfaces/Card";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface CraeteCardProps {
  item: CardRecFull;
  ind: number;
}

//-
const CraeteCard: FunctionComponent<CraeteCardProps> = ({ item, ind }) => {
  const [address, setddress] = useState<string>(
    `${item.address.street} ${item.address.houseNumber}, ${item.address.city},  ${item.address.country}, ${item.address.zip}`
  ); //-

  return (
    <>
      <Col>
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={item.image.url}
            alt={item.image.alt}
            className="image"
          />
          <Card.Body className="card-body">
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>phone: {item.phone}</ListGroup.Item>

            <ListGroup.Item>Address: {address}</ListGroup.Item>
            <ListGroup.Item>Card Number: {item._id}</ListGroup.Item>
          </ListGroup>
          <Card.Body className="icons">
            <FontAwesomeIcon icon={faPenToSquare} />
            <FontAwesomeIcon icon={faPhone} />
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faTrash} />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CraeteCard;
