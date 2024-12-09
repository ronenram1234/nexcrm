import { FunctionComponent, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalProps } from "../App";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { currentUser } = useContext(GlobalProps);
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <>
          <Container>
            <Navbar.Brand href="#home">NEXCRM</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">ABOUT</Nav.Link>
              <Nav.Link href="#features">FavCards</Nav.Link>
              <Nav.Link href="#pricing">MY CARDS</Nav.Link>
              <Nav.Link href="#pricing">SANDBOX</Nav.Link>
            </Nav>
          </Container>

          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  onClick={() => {}}
                />
              </Col>
              {/* <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col> */}
            </Row>
          </Form>
          <i className="fa-solid fa-sun ms-5"></i>
          <i className="fa-solid fa-moon ms-3 mx-5"></i>
          <img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
            // src={currentUser?.image.url}
            className="img-fluid rounded-top"
            alt={currentUser?.image.alt}
            style={{ height: "20px" }}
          />
          {console.log(currentUser?.image.url)}
          
        
        </>
      </Navbar>
    </>
  );
};

export default NavBar;
