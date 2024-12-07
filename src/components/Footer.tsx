import { FunctionComponent } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="bg-dark text-light py-4">
          <Container>
            <Row>
              <Col md={6}>
                <p>&copy; 2024 MyApp. All rights reserved.</p>
              </Col>
              <Col md={6} className="text-md-end">
                <a href="#privacy" className="text-light">Privacy Policy</a> | 
                <a href="#terms" className="text-light"> Terms of Service</a>
              </Col>
            </Row>
          </Container>
        </footer>
      );
}
 
export default Footer;