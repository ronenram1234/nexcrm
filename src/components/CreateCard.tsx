import { FunctionComponent, useContext, useEffect, useState } from "react";
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
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons"; // Regular heart icon

import { GlobalProps } from "../App";
import { setLikeDislike } from "../services/cardServices";
import { clearScreenDown } from "readline";

interface CreateCardProps {
  item: CardRecFull;
  ind: number;
  originScreen: string;
}

const CreateCard: FunctionComponent<CreateCardProps> = ({
  item,
  ind,
  originScreen,
}) => {
  const { currentUser, token, cardArray, setCardArray } =
    useContext(GlobalProps);
  const [address, setAddress] = useState<string>(
    `${item.address.street} ${item.address.houseNumber}, ${item.address.city},  ${item.address.country}, ${item.address.zip}`
  );

  const [imgError, setImgError] = useState<boolean>(false);
  const [isHeartSelected, setIsHeartSelected] = useState(
    item.likes?.includes(currentUser?._id || "")
  );

  useEffect(() => {
    setIsHeartSelected(item.likes?.includes(currentUser?._id || ""));
  }, [currentUser?._id, item.likes]);

  // Handle image error
  const handleImageError = () => {
    // console.log("Image failed to load for item ID:", item._id);
    setImgError(true);
  };

  const handleHeartClick = (id: string) => {
    // console.log("Token-", token);
    // console.log("User ID-", currentUser?._id);

    setLikeDislike(id, token)
      .then((res) => {
        // Update heart state based on likes
        setIsHeartSelected((prev) => !prev);

        // console.log("data.res -----", res.data);
        let dbRec: CardRecFull = res.data;
        // let cardAraycopy=cardArray
        console.log("likes -----", dbRec.likes);
        // cardArray?.map((rec, ind) => {
        //   if (item._id === rec._id ) {
        //     console.log(cardArray[ind].likes);
        //     if (cardAraycopy!==null)
        //         cardAraycopy[ind].likes = dbRec.likes;
        //     console.log(cardArray[ind].likes);
        const updatedCardArray = cardArray?.map((rec) => {
          if (item._id === rec._id) {
            return { ...rec, likes: dbRec.likes };
          }
          return rec;
        }) || [];
        setCardArray(updatedCardArray);

            
            // setCardArray(cardAraycopy)
          })
        

      
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <>
      {/* {console.log(item)} */}
      <Col key={ind}>
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={imgError ? "/path/to/fallback-image.jpg" : item.image.url}
            alt={item.image.alt}
            className="image"
            onError={handleImageError}
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
            <>
              <FontAwesomeIcon icon={faPhone} />

              {/* {console.log(isHeartSelected)} */}
              {isHeartSelected ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleHeartClick(item._id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faRegularHeart}
                  onClick={() => handleHeartClick(item._id)}
                />
              )}

              {(currentUser?.isAdmin ||
                (currentUser?.isBusiness && originScreen === "Mycards")) && (
                <>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <FontAwesomeIcon icon={faTrash} />
                </>
              )}
            </>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CreateCard;
