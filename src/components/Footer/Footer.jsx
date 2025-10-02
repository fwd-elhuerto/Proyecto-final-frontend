import React from "react";
import { Container, Row, Col } from "react-bootstrap";
/* import { FaWhatsapp } from "react-icons/fa"; */
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row className="text-center text-md-start">
          {/* Columna izquierda */}
          <Col md={6} className="mb-3">
            <h5 className="footer-title">Isleño</h5>
            <p className="footer-text">
              Conectamos viajeros con experiencias únicas de pymes locales.
            </p>
          </Col>

          {/* Columna derecha */}
          <Col
            md={6}
            className="d-flex justify-content-center justify-content-md-end align-items-center"
          >
            <a
              href="https://api.whatsapp.com/send?phone=50662071398&text=Hola!%20Me%20gustaría%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
             {/*  <FaWhatsapp className="whatsapp-icon" /> */}
              <span className="ms-2">Contáctanos</span>
            </a>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-3">
            <small className="footer-copy">
              © {new Date().getFullYear()} Isleño. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;