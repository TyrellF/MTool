import React from "react";
import { Carousel } from "react-bootstrap";
import ApiStatus from "./APIForm";
import "../../bootstrap.min.css";

const LandingPage = () => {
  const carouselItems = [
    { endpoint: "NSW Print PDF" },
    { endpoint: "DynamicDate API" },
    { endpoint: "QR Code API" },
    { endpoint: "Escalation Tool" },
    { endpoint: "Escalation Slackbot" },
    { endpoint: "MWTR Login API" },
    { endpoint: "Newsletter Mocker" },
    { endpoint: "MFeeds" },
    { endpoint: "MWFeeds" },
  ];

  return (
    <div className="apiContent">
      <div>
        <h3 style={{ textAlign: "center", fontSize: "22px" }}>Quick Look</h3>
        <div className="text-center subApiCard">
          <div className="quickLookCard">
            <Carousel
              style={{
                width: "100%",
                margin: "0 auto",
              }}
            >
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "450px",
                    }}
                  >
                    <ApiStatus endpoint={item.endpoint} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="quickLookCardFT">
            <span>
              <i
                className="fa-brands fa-watchman-monitoring fa-2xl fa-fade"
                style={{ marginRight: "10px", color: "#5474ab" }}
              ></i>
              {/* </span>
              <span> */}
              Watchtower - API Status Tool built using React.js + Node.js
            </span>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
