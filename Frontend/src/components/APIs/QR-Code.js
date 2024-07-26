import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../UI/Loader";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/joy/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Divider } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const QRCode = () => {
  const [apiStatus, setApiStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/QR%20Code%20API/status"
          // "http://mtool-env.eba-iaphq2wi.eu-west-1.elasticbeanstalk.com:3005/api/QR%20Code%20API/status"
        );
        setApiStatus(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApiStatus();
    const intervalId = setInterval(fetchApiStatus, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const navigation = useNavigate();

  const copyToClipboard = () => {
    const textToCopy = document.getElementById(
      "modal-modal-description"
    ).innerText;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy!");
      }
    );
  };

  return (
    <div className="apiContent">
      <h3 style={{ textAlign: "center", fontSize: "22px" }}>QR Code API</h3>
      <div className="text-center subApiCard">
        <div>
          <br />
          <table
            style={{ width: "100%", marginRight: "2vh", marginLeft: "1vh" }}
          >
            <tr>
              <td style={{ width: "700px" }}>
                <div>
                  <div>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="subApiListScrollET subApiCardDesignET">
                        <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                          API Status
                        </h3>
                        <div className="apiButton">
                          {Object.keys(apiStatus).map(
                            (subAPI) =>
                              !subAPI.startsWith("Code Check") &&
                              !subAPI.startsWith("Infrastructure Check") && (
                                <ListItem
                                  key={subAPI}
                                  className="apiButtonItem"
                                >
                                  <ListItemButton className="apiButton">
                                    <div>
                                      {/* <p>
                                    {subAPI} is currently{" "}
                                    {apiStatus[subAPI].startsWith("Operational")
                                      ? "working"
                                      : "not working"}
                                    .
                                  </p> */}
                                      <div className="apiButton">
                                        <Tooltip
                                          variant="outlined"
                                          title={`${
                                            apiStatus[subAPI].split(",")[0]
                                          }`}
                                          color={
                                            apiStatus[subAPI].startsWith(
                                              "Operational"
                                            )
                                              ? "success"
                                              : "danger"
                                          }
                                        >
                                          <Button
                                            className="statusButton"
                                            style={{
                                              width: "210px",
                                              backgroundColor: apiStatus[
                                                subAPI
                                              ].startsWith("Operational")
                                                ? "green"
                                                : "red",
                                            }}
                                          >
                                            {apiStatus[subAPI].startsWith(
                                              "Operational"
                                            ) ? (
                                              <>
                                                <i className="fa-regular fa-thumbs-up"></i>{" "}
                                                {subAPI}
                                              </>
                                            ) : (
                                              <>
                                                <i className="fa-regular fa-thumbs-down"></i>{" "}
                                                {subAPI}
                                              </>
                                            )}
                                          </Button>
                                        </Tooltip>
                                        <br />
                                        <Divider variant="middle" />
                                      </div>
                                    </div>
                                  </ListItemButton>
                                </ListItem>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td style={{ width: "", paddingLeft: "3vh" }}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td>
                      <div>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <div className="subApiListScrollETR subApiCardDesignESB">
                            <h3
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              Code Check
                            </h3>
                            {Object.keys(apiStatus).map(
                              (subAPI) =>
                                !subAPI.startsWith("Infrastructure Check") &&
                                subAPI.startsWith("Code Check") && (
                                  <ListItem
                                    key={subAPI}
                                    className="apiButtonItem"
                                  >
                                    <ListItemButton className="apiButton">
                                      <div className="apiButton">
                                        <Tooltip
                                          variant="outlined"
                                          title={
                                            apiStatus[subAPI].startsWith(
                                              "Operational"
                                            )
                                              ? `${
                                                  apiStatus[subAPI].split(
                                                    ","
                                                  )[0]
                                                }`
                                              : apiStatus[subAPI].includes(",")
                                              ? `Detected: ${
                                                  apiStatus[subAPI]
                                                    .split(",")[1]
                                                    .split(":")[0]
                                                }`
                                              : `Detected: ${apiStatus[subAPI]}`
                                          }
                                          color={
                                            apiStatus[subAPI].startsWith(
                                              "Operational"
                                            )
                                              ? "success"
                                              : "danger"
                                          }
                                        >
                                          {apiStatus[subAPI].startsWith(
                                            "Operational"
                                          ) ? (
                                            <Button
                                              className="statusButton"
                                              style={{
                                                width: "210px",
                                                backgroundColor: apiStatus[
                                                  subAPI
                                                ].startsWith("Operational")
                                                  ? "green"
                                                  : "red",
                                              }}
                                            >
                                              {apiStatus[subAPI].startsWith(
                                                "Operational"
                                              ) ? (
                                                <>
                                                  <i className="fa-regular fa-thumbs-up"></i>{" "}
                                                  Operational
                                                </>
                                              ) : (
                                                <>
                                                  <i className="fa-regular fa-thumbs-down"></i>{" "}
                                                  Downtime
                                                </>
                                              )}
                                            </Button>
                                          ) : (
                                            <div className="apiButton">
                                              <Button
                                                className="statusButton"
                                                style={{
                                                  width: "210px",
                                                  backgroundColor: apiStatus[
                                                    subAPI
                                                  ].startsWith("Operational")
                                                    ? "green"
                                                    : "red",
                                                }}
                                                onClick={handleOpen}
                                              >
                                                {apiStatus[subAPI].startsWith(
                                                  "Operational"
                                                ) ? (
                                                  <>
                                                    <i className="fa-regular fa-thumbs-up"></i>{" "}
                                                    Operational
                                                  </>
                                                ) : (
                                                  <>
                                                    <i className="fa-regular fa-thumbs-down"></i>{" "}
                                                    Downtime
                                                  </>
                                                )}
                                              </Button>
                                              <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                              >
                                                <Box sx={style}>
                                                  <Typography
                                                    id="modal-modal-title"
                                                    variant="h6"
                                                    component="h2"
                                                  >
                                                    Full Error
                                                  </Typography>
                                                  <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}
                                                  >
                                                    {
                                                      apiStatus[subAPI].split(
                                                        ","
                                                      )[1]
                                                    }
                                                  </Typography>
                                                  <Button
                                                    onClick={copyToClipboard}
                                                    style={{
                                                      padding: "5px 8px",
                                                      position: "absolute",
                                                      bottom: "10px",
                                                      right: "10px",
                                                      backgroundColor:
                                                        "transparent",
                                                      border: "solid",
                                                    }}
                                                  >
                                                    <img
                                                      src="/copy.png"
                                                      alt="Copy to Clipboard"
                                                      style={{
                                                        width: "18px",
                                                        height: "18px",
                                                      }}
                                                    />
                                                  </Button>
                                                </Box>
                                              </Modal>
                                            </div>
                                          )}
                                        </Tooltip>
                                        <br />
                                      </div>
                                    </ListItemButton>
                                  </ListItem>
                                )
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <div className="subApiListScrollETR subApiCardDesignESB">
                            <h3
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              Infrastructure Check
                            </h3>
                            {apiStatus["Infrastructure Check"] &&
                            apiStatus["Infrastructure Check"].length > 0 ? (
                              <div>
                                {apiStatus["Infrastructure Check"].map(
                                  (check) =>
                                    check.alarmName ===
                                    "Qr-Staging-Error-Alarm" ? (
                                      <ListItem
                                        key={check.alarmName}
                                        className="apiButtonItem"
                                      >
                                        <ListItemButton className="apiButton">
                                          <div className="apiButton">
                                            <Tooltip
                                              variant="outlined"
                                              title={`(${check.alarmName}) State: ${check.state}`}
                                              color={
                                                check.state === "OK"
                                                  ? "success"
                                                  : "danger"
                                              }
                                            >
                                              {check.state === "OK" ? (
                                                <Button
                                                  className="statusButton"
                                                  style={{
                                                    width: "210px",
                                                    backgroundColor:
                                                      check.state === "OK"
                                                        ? "green"
                                                        : "red",
                                                  }}
                                                >
                                                  <i className="fa-regular fa-thumbs-up"></i>{" "}
                                                  Operational
                                                </Button>
                                              ) : (
                                                <div className="apiButton">
                                                  <Button
                                                    className="statusButton"
                                                    style={{
                                                      width: "210px",
                                                      backgroundColor:
                                                        check.state === "OK"
                                                          ? "green"
                                                          : "red",
                                                    }}
                                                    onClick={handleOpen2}
                                                  >
                                                    <i className="fa-regular fa-thumbs-down"></i>{" "}
                                                    Downtime
                                                  </Button>
                                                  <Modal
                                                    open={open2}
                                                    onClose={handleClose2}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                  >
                                                    <Box sx={style}>
                                                      <Typography
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                      >
                                                        Full Error
                                                      </Typography>
                                                      <Typography
                                                        id="modal-modal-description"
                                                        sx={{ mt: 2 }}
                                                      >
                                                        {`${check.reason}`}
                                                      </Typography>
                                                      <Button
                                                        onClick={
                                                          copyToClipboard
                                                        }
                                                        style={{
                                                          padding: "5px 8px",
                                                          position: "absolute",
                                                          bottom: "10px",
                                                          right: "10px",
                                                          backgroundColor:
                                                            "transparent",
                                                          border: "solid",
                                                        }}
                                                      >
                                                        <img
                                                          src="/copy.png"
                                                          alt="Copy to Clipboard"
                                                          style={{
                                                            width: "18px",
                                                            height: "18px",
                                                          }}
                                                        />
                                                      </Button>
                                                    </Box>
                                                  </Modal>
                                                </div>
                                              )}
                                            </Tooltip>
                                            <br />
                                          </div>
                                        </ListItemButton>
                                      </ListItem>
                                    ) : null
                                )}
                              </div>
                            ) : (
                              <Tooltip
                                variant="outlined"
                                title={"Operational : (Status Code : 200)"}
                                color={"success"}
                              >
                                <Button
                                  className="statusButton"
                                  style={{
                                    width: "210px",
                                    backgroundColor: "green",
                                  }}
                                >
                                  <i className="fa-regular fa-thumbs-up"></i>{" "}
                                  Operational
                                </Button>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <br />
          <Button onClick={() => navigation("/")} className="genericButton">
            Back to Main Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
