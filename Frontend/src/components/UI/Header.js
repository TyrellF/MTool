import React from "react";
import "../../bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ boxShadow: "none" }}
      >
        <Container>
          <div>
            <i
              class="fa-brands fa-watchman-monitoring fa-2xl"
              style={{ color: "#5474ab" }}
            ></i>
            <Navbar.Brand
              className="navHeader"
              style={{
                fontSize: "15px",
                padding: "10px",
                fontWeight: "bolder",
              }}
              href="/"
            >
              Watchtower - Meltwater
            </Navbar.Brand>
          </div>
          {/* <Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto"> Use ml-auto to move elements to the right */}
          {/* <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link>Link</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Important APIs" id="basic-nav-dropdown">
                <LinkContainer to="/NSWPrintPdf">
                  <NavDropdown.Item>NSW Print PDF</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/DynamicDate">
                  <NavDropdown.Item>DynamicDate</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/QRCode">
                  <NavDropdown.Item>QR Code</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/APIForm">
                  Add/Delete APIs - WIP
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Nav> */}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
