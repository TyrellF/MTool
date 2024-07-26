const axios = require("axios");
const fs = require("fs");
const { updateToken } = require("./updateToken");
require("dotenv").config();

const crypto = require("crypto");
const algorithm = process.env.ALGORITHM;
const secretKey = Buffer.from(process.env.ED_SECRET_KEY, "utf8"); // 32 bytes = 256 bits
const iv = Buffer.from(process.env.IV, "utf8");
let encryptedToken;

async function getToken() {
  var token;
  try {
    token = require("./token.json");
    if (JSON.stringify(token).length < 20) {
      token = false;
    } else {
      token = await decrypt(token.token);
      if (
        JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp >
        Date.now()
      ) {
        // console.log(token)
        console.log("token reused");
        return [token, false];
      } else {
        token = false;
      }
    }
  } catch (e) {
    token = false;
  }

  if (!token) {
    console.log("creating new token");
    token = await Login();
    if (!token) return false;
    return [token, true];
  }
}

async function Login() {
  try {
    const options = {
      method: "POST",
      url: "https://idp.app-framework.meltwater.io/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        rememberMe: true,
      },
    };
    let result = await axios.request(options);
    if (!result.data.success) return false;
    // console.log("Before Encrypting:", result.data.token);
    encryptedToken = await encrypt(result.data.token);
    // console.log("After Encrypting:", encryptedToken);
    updateToken(encryptedToken.content);
    return result.data.token;
  } catch (e) {
    console.log("failed to generate token");
    return false;
  }
}

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    content: encrypted,
  };
}
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
module.exports = { getToken };
