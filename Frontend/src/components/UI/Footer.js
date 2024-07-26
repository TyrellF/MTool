import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="white"
      className="text-center text-lg-left"
      style={{
        borderRadius: "35px",
        margin: "auto",
        width: "95%",
        marginRight: "5vh",
      }}
    >
      <div
        className="text-center p-3"
        style={{ fontSize: "13px", backgroundColor: "white" }}
      >
        &copy; {new Date().getFullYear()} Owned and maintained by{" "}
        <a
          className="text-dark"
          href="https://meltwater.atlassian.net/wiki/spaces/GS/pages/12407734273/Product+Support+-+Bangalore+Team+Raptors" target="noopener noreferrer"
        >
          Team Raptors.
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
