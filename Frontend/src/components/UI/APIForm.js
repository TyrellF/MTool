import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../UI/Loader";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/joy/Tooltip";
import ListItem from "@mui/material/ListItem";
import { Divider } from "@mui/material";

const ApiStatus = ({ endpoint }) => {
  const [apiStatus, setApiStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const encodedEndpoint = encodeURIComponent(endpoint);

    const fetchApiStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/${encodedEndpoint}/status`
        );
        console.log(
          `Response from backend for ${endpoint} API:`,
          response.data
        );

        setApiStatus(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiStatus();
  }, [endpoint]);

  // Check if any sub-APIs contain "Downtime" in the status
  const hasDowntime = Object.keys(apiStatus).some((subAPI) =>
    apiStatus[subAPI].includes("Downtime")
  );

  return (
    <div>
      <Divider></Divider>
      <h3
        style={{
          textAlign: "center",
          fontSize: "20px",
        }}
      >{`${endpoint}`}</h3>
      <br />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="quickLookList">
            {hasDowntime ? (
              <>
                {Object.keys(apiStatus).map(
                  (subAPI) =>
                    // Display only sub-APIs containing "Downtime" in the status
                    apiStatus[subAPI].includes("Downtime") && (
                      <ListItem key={subAPI} className="apiButton">
                        <div>
                          {/* <div>
                            <p style={{ textAlign: "center" }}>
                              {subAPI} is currently{" "}
                              {apiStatus[subAPI].split(",")[0]}
                            </p>
                          </div> */}
                          <div style={{ textAlign: "center" }}>
                            <Tooltip
                              variant="outlined"
                              title={`${apiStatus[subAPI].split(",")[0]}`}
                              color="danger" // Red for Downtime
                            >
                              <Button
                                className="statusButtonNOK"
                                style={{
                                  backgroundColor: "red",
                                }}
                              >
                                <i className="fa-regular fa-thumbs-down"></i>{" "}
                                {subAPI}
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </ListItem>
                    )
                )}
              </>
            ) : (
              <div>
                <p>
                  All sub-APIs are working <br />
                  <Button
                    className="statusButtonOK"
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    <i className="fa-regular fa-thumbs-up"></i> Operational
                  </Button>
                </p>
              </div>
            )}
            <br />
            <Divider></Divider>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiStatus;
