const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.EC2_PORT;

app.use(cors());
app.use(express.json());

const apiList = require("./apiList");

// const nswPrintPDFApiToken = process.env.NSW_PRINT_PDF_TOKEN;
const { getToken } = require("./getToken");
let nswPrintPDFApiToken;
getToken()
  .then(([token]) => {
    nswPrintPDFApiToken = token;
  })
  .catch((error) => {
    console.error("Failed to get the token:", error);
  });

// Require and initialize the cron job to update the statuses
const apiStatuses = require("./cronJob");

// Serve the status of each API from the in-memory store
for (const mainAPI of apiList) {
  app.get(
    `/api/${encodeURIComponent(mainAPI.categoryname)}/status`,
    async (req, res) => {
      const subcategoryStatus = apiStatuses[mainAPI.categoryname] || {};

      if (Object.keys(subcategoryStatus).length === 0) {
        // If no status is available in the in-memory store, perform the status check
        for (const subAPI of mainAPI.subAPIs) {
          try {
            const axiosConfig = {
              timeout: 10000,
            };

            if (mainAPI.categoryname === "NSW Print PDF") {
              axiosConfig.headers = {
                Authorization: nswPrintPDFApiToken,
              };
            } else if (subAPI.token) {
              axiosConfig.headers = {
                Authorization: subAPI.token,
              };
            }

            const response = await axios.get(subAPI.url, axiosConfig);

            if (response.status === 200) {
              subcategoryStatus[
                subAPI.subcategoryname
              ] = `Operational : (Status Code: ${response.status})`;
            } else if (String(response.status).startsWith("3")) {
              subcategoryStatus[
                subAPI.subcategoryname
              ] = `Redirection : (Status Code: ${response.status})`;
            } else {
              subcategoryStatus[
                subAPI.subcategoryname
              ] = `Downtime : (Status Code: ${response.status})`;
            }
          } catch (error) {
            if (error.response) {
              subcategoryStatus[
                subAPI.subcategoryname
              ] = `Facing Downtime: (Status Code: ${error.response.status})`;
            } else {
              subcategoryStatus[subAPI.subcategoryname] =
                "Downtime (Unknown Error)";
            }
          }
        }

        // Update the in-memory store with the new statuses
        apiStatuses[mainAPI.categoryname] = subcategoryStatus;
      }

      res.json(subcategoryStatus);
    }
  );
}
app.get("/", (req, res) => {
  res.send("Welcome to API Status Check");
});

// Create an endpoint to serve apiList data
app.get("/api/apiList", (req, res) => {
  res.json(apiList);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
