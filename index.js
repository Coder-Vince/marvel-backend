// I.
// When starting a backend project with Node.js
// run npm init -y in the terminal it will create a package.json file as well

// II.
// Install the dependencies that are necessary to build the backend:
// Necessary dependencies are express, axios, md5, uid2 and formidable in most cases
// run command in the terminal:
// npm i express axios md5 uid2
// once installed it will create a folder node_modules

// III.
// Make the necessary imports

// NB: Gather APIs from the site and store them in a safe place (a dotenv file for example (.env))

// NOTES re API:
// Make and start a server
// API Public: see .env file create the dotenv module with the following command: npm install dotenv
// API Private:
// PORT=3100
// PUBLIC_KEY=votre_clé_public
// PRIVATE_KEY=votre_clé_privée
// Your authorized referrers:
// List any domains that can make calls to the Marvel Comics API using your API key here:
// developer.marvel.com
// add a new referrer
// Note: List the domain and path only - don't include "http" or other scheme designations. Only use the characters a-z, 0-9, ., _, -, and *.
// Read more about how to authorize referring domains in browser-based apps and web sites.
// Service Endpoint: http(s)://gateway.marvel.com/

// IV.
// Code the server and then start it running npx nodemon index.js in the Terminal

const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
// md5(ts+privateKey+publicKey)

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

// Create the route that will fetch the list of characters:
app.get("/characters", async (req, res) => {
  try {
    // Generate the ts (timestamp)
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?orderBy=name&limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create the route that will fetch the list of comics:
app.get("/comics", async (req, res) => {
  try {
    // Generate the ts (timestamp)
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// LOCAL RUN
// app.listen(process.env.PORT, () => {
//   console.log(`Server Started on port ${process.env.PORT}`);

// Heroku va nous fournir une variable process.env.PORT
if (process.env.PORT) {
  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
} else {
  app.listen(3200, () => {
    console.log("Server started");
  });
}
app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");
});
