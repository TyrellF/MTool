const cron = require("node-cron");
const axios = require("axios");
const apiList = require("./apiList");
// In-memory store for API statuses
const apiStatuses = {};
// Function to broadcast updates to all SSE clients
const broadcastUpdate = (data) => {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

// const nswPrintPDFApiToken = process.env.NSW_PRINT_PDF_TOKEN;
const { getToken } = require("./getToken");
let authToken;
getToken()
  .then(([token]) => {
    // console.log(token);
    authToken = token;
  })
  .catch((error) => {
    console.error("Failed to get the token:", error);
  });

// Set the cron schedule
const schedule = "*/30 * * * * *"; // every 30 seconds
cron.schedule(schedule, async () => {
  const startTime = Date.now();
  let currentDate = new Date();
  let milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
  console.log(
    "\nCron Job started at",
    `${currentDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    })}:${milliseconds} hours IST`
  );
  for (const mainAPI of apiList) {
    const subcategoryStatus = {};
    for (const subAPI of mainAPI.subAPIs) {
      if (subAPI.url) {
        try {
          const axiosConfig = {
            timeout: 10000,
          };
          if (
            mainAPI.categoryname === "NSW Print PDF" ||
            mainAPI.categoryname === "MWTR Login API"
          ) {
            axiosConfig.headers = {
              Authorization: authToken,
            };
            if (subAPI.url.includes("healthCheck")) {
              axiosConfig.headers = {
                Authorization: `${process.env.HC_AUTH_TOKEN}`,
              };
            }
          } else if (subAPI.token) {
            axiosConfig.headers = {
              Authorization: subAPI.token,
            };
          } else if (subAPI.url.includes("healthCheck")) {
            axiosConfig.headers = {
              Authorization: `${process.env.HC_AUTH_TOKEN}`,
            };
          }
          const response = await axios.get(subAPI.url, axiosConfig);
          if (response.status === 200) {
            subcategoryStatus[
              subAPI.subcategoryname
            ] = `Operational : (Status Code: ${response.status})`;
            if (subAPI.url.includes("alarm")) {
              subcategoryStatus[subAPI.subcategoryname] = response.data;
            }
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
          if (error.response && error.response.status !== 200) {
            subcategoryStatus[subAPI.subcategoryname] =
              `Facing Downtime: (Status Code: ${error.response.status}) , ${error.response.data.message}` ||
              "No message";
          } else {
            subcategoryStatus[subAPI.subcategoryname] =
              "Downtime (Unknown Error)";
            console.log(
              subAPI.subcategoryname,
              "Unknown status",
              error.message || "No message"
            );
          }
        }
      }
      // console.log(subcategoryStatus);
    }
    // Update the in-memory store with the new statuses
    apiStatuses[mainAPI.categoryname] = subcategoryStatus;
    currentDate = new Date(); // Update the current date and time
    milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
    console.log(
      `Updated statuses for ${
        mainAPI.categoryname
      } at ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}:${milliseconds} hours IST`
    );
  }
  const endTime = Date.now();
  const elapsedTimeMs = endTime - startTime;
  const elapsedTimeSeconds = (elapsedTimeMs / 1000).toFixed(2);
  currentDate = new Date(); // Update the current date and time
  milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
  console.log(
    "Cron Job finished at",
    `${currentDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    })}:${milliseconds} hours IST`
  );
  console.log(
    `Total Time Taken: ${elapsedTimeSeconds} seconds (${elapsedTimeMs} ms).`
  );

  // Broadcast the updated statuses to all connected clients
  broadcastUpdate(apiStatuses);
});
module.exports = apiStatuses;
