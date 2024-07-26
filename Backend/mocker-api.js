const express = require("express");
const app = express();
const port = 3001;

// Possible status codes grouped by color categories
const successStatusCodes = [200];
const redirectionStatusCodes = [300, 301, 302, 303, 304, 307, 308];
const clientErrorStatusCodes = [400, 401, 403, 404];
const serverErrorStatusCodes = [500, 502, 503, 504];

// Combined status codes for random selection
const statusCodes = [
  ...successStatusCodes,
  ...redirectionStatusCodes,
  ...clientErrorStatusCodes,
  ...serverErrorStatusCodes,
];

function getRandomStatusCode(oldStatus) {
  let randomIndex;
  let newStatus;
  do {
    randomIndex = Math.floor(Math.random() * statusCodes.length);
    newStatus = statusCodes[randomIndex];
  } while (newStatus === oldStatus);
  return newStatus;
}

let status1 = getRandomStatusCode();
let status2 = getRandomStatusCode();
let status3 = getRandomStatusCode();

// Function to flip the statuses every 20 seconds
setInterval(() => {
  status1 = getRandomStatusCode();
  status2 = getRandomStatusCode();
  status3 = getRandomStatusCode();
  console.log(
    `Status1 flipped to: ${status1}, Status2 flipped to: ${status2}, Status3 flipped to: ${status3}`
  );
}, 20000);

app.get("/mock-status", (req, res) => {
  console.log(`mock-status called, status: ${status1}`);
  res.status(status1).send(`Status: ${status1}`);
});

app.get("/mock-status-2", (req, res) => {
  console.log(`mock-status-2 called, status: ${status2}`);
  res.status(status2).send(`Status: ${status2}`);
});

app.get("/mock-status-3", (req, res) => {
  console.log(`mock-status-3 called, status: ${status3}`);
  res.status(status3).send(`Status: ${status3}`);
});

app.listen(port, () => {
  console.log(`Mock API server running on http://localhost:${port}`);
});
